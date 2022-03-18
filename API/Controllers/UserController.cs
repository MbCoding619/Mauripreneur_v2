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

namespace API.Controllers
{
   
    public class UserController : BaseApiController
    {
        private readonly IUserRepository _userRepository;
        public UserController(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

     [HttpGet]
     [AllowAnonymous]
     //making code async to enable Scalability 
     // This will API to serve any HIT while quering database for a previous hit.
     //this is achieved by putting async in the method and Encapsulating the ActionResult in Task container
     //then putting await on the return
     // Also the ToList function has another method called ToListAsync which is an async function
     //It is recommended to use Async code.
   public async Task<ActionResult<IEnumerable<AppUser>>> GetUsers()
   {
         return Ok(await _userRepository.GetUsersAsync());
        
   }

    [AllowAnonymous]
    [HttpGet("{username}")]
        public async Task<ActionResult<AppUser>> GetUser( string username)
        {

            return await _userRepository.GetUserByUsernameAsync(username);
                         
        }


    }  

}