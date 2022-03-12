using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Security.Cryptography;
using System.Text;
using API.Data;
using API.DTOs;
using API.Entities;
using API.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class FieldController : BaseApiController
    {
         private readonly DataContext _context;
        
        public FieldController(DataContext context  )
        {
            
            _context = context;
        }

        [HttpGet]

        public ActionResult<IEnumerable<Field>> GetField(){

            var field = _context.Fields.ToList();

            return field;
        }

        [HttpPost("addField")]

        public async Task<ActionResult<FieldDTO>> addField(FieldAddDTO fieldAddDTO){

           
            if(!(await FieldExists(fieldAddDTO.Description))){

                var newField = new Field {

                    Description = fieldAddDTO.Description
                };

                _context.Fields.Add(newField);
            }else{

                //This will result a bad request status 400
                return BadRequest("Field Already Exists!");
            };

            await _context.SaveChangesAsync();

            return new FieldDTO{

                 Description = fieldAddDTO.Description

            };
        }

    public async Task<bool>FieldExists( string description){

        return await _context.Fields.AnyAsync( f => f.Description.ToLower() == description.ToLower());
    }

   
        
    }
}