using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.DTOs.AutoDTO;
using API.DTOs.UpdateDTO;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class ProfController : BaseApiController
    {
        private readonly DataContext _context;
        private readonly IProfRepository _profRepository;
        private readonly IMapper _mapper;
        public ProfController(DataContext context , IProfRepository profRepository, IMapper mapper)
        {
            _mapper = mapper;
            _profRepository = profRepository;
            _context = context;
        }

        [HttpGet("allProf")]

        public async Task<ActionResult<IEnumerable<ATProfessionalDTO>>> GetAllProf()
        {
            var profs = await _profRepository.GetProfAsync();

            var profToReturn = _mapper.Map<IEnumerable<ATProfessionalDTO>>(profs);

            return Ok(profToReturn);
        }

        [HttpGet("last4Prof")]
        public  IActionResult getLastProf()
        {
            var query = _context.Professionals.
                        Join(
                            _context.Users,
                            prof => prof.AppUserId,
                            appUser => appUser.AppUserId,
                            (prof,appUser) => new{
                                profId = prof.Id,
                                fName = prof.FName,
                                lName = prof.LName,
                                field = prof.Field,
                                imagePath = appUser.imagePath
                            }
                        ).ToList().OrderByDescending(x => x.profId).Take(4);

            return Ok(query);
        }

        [HttpGet("{username}")]

        public async Task<ActionResult<ATProfessionalDTO>> GetProfByUsername(string username)
        {
            var user = await _context.Users.SingleOrDefaultAsync(u => u.UserName == username.ToLower());

            if(user !=null)
            {
                var prof = await _profRepository.GetProfByAppId(user.AppUserId);

                var profToReturn = _mapper.Map<ATProfessionalDTO>(prof);

                return Ok(profToReturn);
            }
            else
            {
                return BadRequest("No Professional found with this username");
            }
        }

        [HttpPut("editProf")]
        
        public async Task<ActionResult> UpdateProf(ProfUpdateDTO profUpdateDTO)
        {
            var prof = await _profRepository.GetProfById(profUpdateDTO.Id);

            if(prof !=null)
            {
                _mapper.Map(profUpdateDTO,prof);
                _profRepository.Update(prof);

                return Ok();
            }
            else
            {
                return BadRequest("Something Went wrong!");
            }
        }

    }
}