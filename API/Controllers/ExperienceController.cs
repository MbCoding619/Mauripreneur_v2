using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using API.Data;
using API.DTOs;
using API.DTOs.AutoDTO;
using API.Entities;
using API.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class ExperienceController : BaseApiController
    {
        
        private readonly DataContext _context;
        private readonly IExperienceRepository _repository;
        public ExperienceController(DataContext context, IExperienceRepository repository)
        {
            _repository = repository;
            _context = context;
            
        }


        [HttpPost("addExperience")]

        public async Task<ActionResult<ActionStatusDTO>> addExperience([FromForm]ATExperienceDTO experienceDTO)
        {
            try
            {   
                var dbPath = "";
                var file = Request.Form.Files[0];
                var folderName = Path.Combine("Resources","Documents");
                var pathToSave = Path.Combine(Directory.GetCurrentDirectory(),folderName);
               if(file.Length > 0)
               {
                   var fileName = ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName.Trim('"');
                   var fullPath = Path.Combine(pathToSave, fileName);
                    dbPath = Path.Combine(folderName, fileName);
                     using (var stream = new FileStream(fullPath, FileMode.Create))
                    {
                        file.CopyTo(stream);
                    }
               }

               var experience = new Experience
               {
                   JobTitle = experienceDTO.JobTitle,
                   yearsExperience =  experienceDTO.yearsExperience,
                   cvPath = dbPath,
                   ProfId = experienceDTO.ProfId
               };
               _context.Experience.Add(experience);

               await _context.SaveChangesAsync();

               return new ActionStatusDTO
               {
                   status ="Added"
               };
            }catch(Exception ex)
            {
                return BadRequest("Oops"+ ex);
            }

            
        }
    }
}