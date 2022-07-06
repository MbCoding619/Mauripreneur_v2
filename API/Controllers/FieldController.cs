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
        private readonly ISubFieldRepository _subFieldRepository;
        private readonly IProfRepository _profRepository;
        
        public FieldController(DataContext context, IMapper mapper, IFieldRepository repository, ISubFieldRepository subFieldRepository, IProfRepository profRepository)
        {
            _profRepository = profRepository;
            _subFieldRepository = subFieldRepository;
            _repository = repository;
            _mapper = mapper;            
            _context = context;
        }

        [HttpGet("fields")]

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


        [HttpGet("subFields")]
        public ActionResult<IEnumerable<SubField>> getSubFields()
        {
                var subFields = _context.SubField.ToList();

                return subFields;
        }

        [HttpGet("subFieldsByFieldId/{id}")]
        public ActionResult<IEnumerable<SubField>> getSubFieldsByFieldId(int id)
        {
            var subFields = _context.SubField.Where(sb => sb.FieldId == id).ToList();            
            return subFields;
        }


        [HttpPost("addSubField")]

        public async Task<ActionResult<ActionStatusDTO>> addSubField(SubFieldAddDTO subFieldAddDTO)
        {
            if(!(await SubFieldExists(subFieldAddDTO.Description)))
            {
                var field = await _repository.GetFieldByIdAsync(subFieldAddDTO.FieldId);
                if(field !=null)
                {
                 var newSubField = new SubField
                    {   
                    Description = subFieldAddDTO.Description,
                    subFieldStatus = "PENDING",
                    FieldId = field.FieldId
                    };
                     _context.SubField.Add(newSubField);
                }else
                {
                     return BadRequest("Corresponding Field Doesn't exist");
                }

            }else
            {
                return BadRequest("SubField Already Exists");
            }

          

            await _context.SaveChangesAsync();

            return new ActionStatusDTO
            {
                status = "SubField Added"
            };
        }

     [HttpPut("editSubField")]

        public  async Task<ActionResult<ActionStatusDTO>> UpdateSubField(SubFieldUpdateDTO subFieldUpdateDTO)
        {       
           var subField = await _subFieldRepository.getSubFieldByIdAsync(subFieldUpdateDTO.SubFieldId);
            if(subField !=null )
            {
                _mapper.Map(subFieldUpdateDTO,subField);
                _subFieldRepository.Update(subField);

                return new ActionStatusDTO {
                    status ="Updated"
                };
            }
            else{
                return BadRequest("Something went wrong");
            }


        }


     [HttpPut("addFieldIdToProf")]
     public async Task<ActionResult<ActionStatusDTO>> addFieldIdToProf(AddFieldIdToProfDTO addFieldIdToProfDTO)
     {
        var prof = await _context.Professionals.FindAsync(addFieldIdToProfDTO.ProfessionaId);
        if(prof !=null)
        {
            prof.FieldId = addFieldIdToProfDTO.FieldId;
            _profRepository.Update(prof);

            return new ActionStatusDTO{
                status ="fieldId added"
            };
        }else
        {
            return BadRequest("Prof not Found");
        }
     }   


    



    public async Task<bool>FieldExists( string description){

        return await _context.Fields.AnyAsync( f => f.Description.ToLower() == description.ToLower());
    }

    public async Task<bool>SubFieldExists(string description){

        return await _context.SubField.AnyAsync(sbf => sbf.Description.ToLower() == description.ToLower());
    }

    
        
    }
}