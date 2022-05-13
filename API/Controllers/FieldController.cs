using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Security.Cryptography;
using System.Text;
using API.Data;
using API.DTOs;
using API.DTOs.UpdateDTO;
using API.Entities;
using API.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using AutoMapper;

namespace API.Controllers
{
    public class FieldController : BaseApiController
    {
         private readonly DataContext _context;
        private readonly IMapper _mapper;
        private readonly IFieldRepository _repository;
        
        public FieldController(DataContext context, IMapper mapper, IFieldRepository repository  )
        {
            _repository = repository;
            _mapper = mapper;
            
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

                    Description = fieldAddDTO.Description,
                    fieldStatus = fieldAddDTO.fieldStatus
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


        //Below Code doesnt work. 
        //Need to get on the logic behind put
        [HttpPut("editField")]

        public  async Task<ActionResult<ActionStatusDTO>> UpdateField(FieldUpdateDTO fieldUpateDTO)
        {       
            var field = await _repository.GetFieldByIdAsync(fieldUpateDTO.FieldId);
            if(field !=null )
            {
                _mapper.Map(fieldUpateDTO,field);
                _repository.Update(field);

                return new ActionStatusDTO {
                    status ="Updated"
                };
            }
            else{
                return BadRequest("Something went wrong");
            }


        }



    public async Task<bool>FieldExists( string description){

        return await _context.Fields.AnyAsync( f => f.Description.ToLower() == description.ToLower());
    }

    
        
    }
}