using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.DTOs.AutoDTO;
using API.DTOs.UpdateDTO;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{   
    public class SmeController : BaseApiController
    {
        private readonly DataContext _context;      
        private readonly IMapper _mapper;
        private readonly ISmeRepository _smeRepository;
        public SmeController(DataContext context , ISmeRepository smeRepository , IMapper mapper)
        {
            _smeRepository = smeRepository;
            _mapper = mapper;            
            _context = context;
        }

        [HttpGet("allSme")]

        public async Task<ActionResult<IEnumerable<ATSmeDTO>>> GetAllSme()
        {
            var smes = await _smeRepository.GetSmeAsync();

            var smeToReturn = _mapper.Map<IEnumerable<ATSmeDTO>>(smes);

            return Ok(smeToReturn);
        }

        [Authorize]
        [HttpGet("{username}")]
        public async Task<ActionResult<ATSmeDTO>> GetSmeByUsername(string username)
        {
            var user = await _context.Users.SingleOrDefaultAsync(u => u.UserName == username.ToLower());

            if(user !=null)
            {
                var sme = await _smeRepository.GetSmeByAppId(user.AppUserId);

                var smeToReturn = _mapper.Map<ATSmeDTO>(sme);
                return Ok(smeToReturn);
            }
            else{
                return BadRequest("No Sme Found with this username");
            }
        }

        
        [HttpPut("editSme")] 

        public async Task<ActionResult> UpdateSme(SmeUpdateDTO smeUpdateDTO)
        {
            var sme = await _smeRepository.GetSmeById(smeUpdateDTO.Id);

            if(sme !=null )
            {
                _mapper.Map(smeUpdateDTO,sme);
                _smeRepository.Update(sme);

                return Ok();
            }
            else
            {
                return BadRequest("Something went wrong");
            }
        }
    }
}