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
using API.Helpers;
using Microsoft.AspNetCore.Http;
using API.Extensions;
using System.Security.Claims;

namespace API.Controllers
{
   
    public class UserController : BaseApiController
    {
        private readonly IUserRepository _userRepository;
        private readonly IMapper _mapper;
        public DataContext _context;
        public UserController(DataContext context,IUserRepository userRepository, IMapper mapper)
        {
            _context = context;
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
   public async Task<ActionResult<IEnumerable<ATMemberDTO>>> GetUsers([FromQuery]UserParams userParams)
   {    
        //var username = User.FindFirst(ClaimTypes.Name)?.Value;
        var user = await _userRepository.GetUserByUsernameAsync(User.GetUsername());
        userParams.currentUsername = user.UserName;

        if(string.IsNullOrEmpty(userParams.AppUserRole)){
           //USe Switch case here to enable three wayy if. SME : PROFESSIONAL : STUDENT
            userParams.AppUserRole = user.AppUserRole == "SME" ? "PROFESSIONAL" : "SME";
            //userParams.AppUserRole = user.AppUserRole == "STUDENT" ? "SME" : "STUDENT";
        } 

        var users = await _userRepository.GetMembersAsync(userParams);
       // var userToReturn =  _mapper.Map<IEnumerable<ATMemberDTO>>(users);
        Response.AddPaginationHeader(users.CurrentPage,users.PageSize,users.TotalCount,users.TotalPages);
         return Ok(users);
        
   }

    [AllowAnonymous]
    [HttpGet("testUserQuery")]
        public async Task<ActionResult> GetUser()
        {
            var test =  (from us in _context.Users
                                join prof in _context.Professionals on us.AppUserId equals prof.Id
                                join f in _context.Fields on prof.FieldId equals f.FieldId                                
                                where (f.FieldId == 1)                                                          
                                select new {
                                    us.AppUserId,
                                    us.AppUserRole,
                                    prof.FName,
                                    f.Description
                                }).AsQueryable();

                var toReturn = await test.Where(us => us.AppUserId ==1).ToListAsync();                

               return Ok(toReturn);  
            
                         
        }


    [HttpGet("getUserRoleId/{appUserId}")]

    public async Task<ActionResult> getUserRoleId(int appUserId)
    {
        var user = await _context.Users.FindAsync(appUserId);

        if(user.AppUserRole =="SME"){
            var sme = await _context.Sme.SingleOrDefaultAsync(sme => sme.AppUserId == user.AppUserId);
            return Ok(sme.Id);

        }else if(user.AppUserRole == "PROFESSIONAL"){
            var prof = await _context.Professionals.SingleOrDefaultAsync(prof => prof.AppUserId == user.AppUserId);
            return Ok(prof.Id);

        }else if(user.AppUserRole == "STUDENT"){
            var stud = await _context.Students.SingleOrDefaultAsync(stud => stud.AppUserId == user.AppUserId);
            return Ok(stud.Id);
        }else{
            return BadRequest("No user found");
        }
    }

     


    }  

}