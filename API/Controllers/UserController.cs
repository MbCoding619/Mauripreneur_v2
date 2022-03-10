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
        private readonly DataContext _context;
        public UserController(DataContext context)
        {
            _context = context;
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
         return await _context.Users.ToListAsync();
        
   }

    [AllowAnonymous]
    [HttpGet("{id}")]
        public async Task<ActionResult<AppUser>> GetUser( int id)
        {

            return await _context.Users.FindAsync(id);
             
            
        }

    [AllowAnonymous]
    [HttpGet("Test")]

     public async Task<ActionResult<String>> GetID( TestDTO TestDTO)
        {

            AppUser user = await _context.Users.SingleOrDefaultAsync(b => b.UserName == TestDTO.test.ToLower());
             
             return user.AppUserId.ToString();
            
        }


    }  

}