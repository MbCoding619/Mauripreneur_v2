using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using API.DTOs;
using API.Interfaces;
using API.DTOs.AutoDTO;
using AutoMapper;

namespace API.Controllers
{
   
    public class UserController : BaseApiController
    {
        private readonly IUserRepository _userRepository;
        private readonly IMapper _mapper;
        public UserController(IUserRepository userRepository, IMapper mapper)
        {
            _mapper = mapper;
            _userRepository = userRepository;
        }

     [HttpGet]
     [Authorize]
     //making code async to enable Scalability 
     // This will API to serve any HIT while quering database for a previous hit.
     //this is achieved by putting async in the method and Encapsulating the ActionResult in Task container
     //then putting await on the return
     // Also the ToList function has another method called ToListAsync which is an async function
     //It is recommended to use Async code.
   public async Task<ActionResult<IEnumerable<ATMemberDTO>>> GetUsers()
   {    
        var users = await _userRepository.GetUsersAsync();
        var userToReturn =  _mapper.Map<IEnumerable<ATMemberDTO>>(users);

         return Ok(userToReturn);
        
   }

    [AllowAnonymous]
    [HttpGet("{username}")]
        public async Task<ActionResult<ATMemberDTO>> GetUser( string username)
        {
             var user = await _userRepository.GetUserByUsernameAsync(username);

            return _mapper.Map<ATMemberDTO>(user);
                         
        }

     


    }  

}