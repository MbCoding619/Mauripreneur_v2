using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.DTOs;
using API.DTOs.AutoDTO;
using API.Entities;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class SkillsController : BaseApiController
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        private readonly ISkillsRepository _skillsRepository;
        public SkillsController(DataContext context, IMapper mapper, ISkillsRepository skillsRepository)
        {
            _skillsRepository = skillsRepository;
            _mapper = mapper;
            _context = context;
        }

        [HttpPost("addSkill")]
        public async Task<ActionResult<ActionStatusDTO>> addSkill(ATSkillsDTO skillsDTO)
        {
            var prof = await _context.Professionals.FindAsync(skillsDTO.ProfId);
            if(prof !=null)
            {
                var newskill = new Skills{
                    ProfId = skillsDTO.ProfId,
                    SubFieldId = skillsDTO.SubFieldId,
                    Proficiency = skillsDTO.Proficiency
                };
                
                _context.Skills.Add(newskill);            
                
                await _context.SaveChangesAsync();
                 return new ActionStatusDTO{
                    status = "Skills added"
                };
            }else
            {
                return Unauthorized("Prof Not Found");
            }


                          
            
        }

    
    }
}