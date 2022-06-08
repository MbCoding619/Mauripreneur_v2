using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.DTOs;
using API.DTOs.AutoDTO;
using API.Entities;
using API.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class QualificationController : BaseApiController
    {
        private readonly DataContext _context;
        private readonly IQualRepository _qualRepository;
        public QualificationController(DataContext context, IQualRepository qualRepository)
        {
            _qualRepository = qualRepository;
            _context = context;
        }

        [HttpPost("addQualification")]
        public async Task<ActionResult<ActionStatusDTO>> addQualification(ATQualDTO qualDTO)
        {
            var qualification = new Qualification 
            {
                institution = qualDTO.institution,
                title = qualDTO.title,
                yearEnding = qualDTO.yearEnding,
                ProfId = qualDTO.ProfId
            };

            _context.Qualification.Add(qualification);
           await _context.SaveChangesAsync();

           return new ActionStatusDTO
           {
               status ="Qualification Added"
           };
        }
    }
}