using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.DTOs;
using API.EmailService;
using API.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class AdminController : BaseApiController
    {
        private readonly DataContext _context; 
        private readonly IEmailSender _emailSender;
        public AdminController(DataContext context, IEmailSender emailSender)
        {
            _context = context;
            _emailSender = emailSender;
        }

        [HttpPost("addAdmin")]

        public async Task<ActionResult> addAdmin(AdminAddDTO adminAddDTO)
        {
            var user = await _context.Users.SingleOrDefaultAsync(u => u.UserName == adminAddDTO.username.ToLower());

            if(user !=null)
            {
                user.AppUserRole = "ADMIN";
                var admin = new Admin
                {
                    AppUserId = user.AppUserId,
                    FName = adminAddDTO.FName,
                    LName = adminAddDTO.LName   
                };
                _context.Admin.Add(admin);

                await _context.SaveChangesAsync();
                return Ok("Admin Added!");
            }else
            {
                return BadRequest("Something Went Wrong");
            }
        }

        [HttpPut("deactivateUser/{appUserId}")]

        public async Task<ActionResult> deactivateUser(int appUserId)
        {
            var user = await _context.Users.FindAsync(appUserId);
            if(user !=null)
            {
                if(!user.accountStatus.Equals("INACTIVE"))
                {
                    user.accountStatus = "INACTIVE";
                    await _context.SaveChangesAsync();

                    
                    return Ok("User: "+user.UserName+" account Deactivated");
                }
                else
                {
                    return BadRequest("User Account already deactivated");
                }
            }
            else
            {
                return BadRequest("User not found or you don't have permission!");
            }
        }

        [HttpPut("activateUser/{appUserId}")]
        public async Task<ActionResult> activateUser(int appUserId)
        {
            var user = await _context.Users.FindAsync(appUserId);
            if(user !=null)
            {
                if(!user.accountStatus.Equals("ACTIVE"))
                {
                    user.accountStatus = "ACTIVE";
                    await _context.SaveChangesAsync();
                    return Ok("User: "+user.UserName +" account Activated!");
                }
                else
                {
                    return BadRequest("User Account already activated!");
                }
            }
            else
            {
                return BadRequest("User not found or you don't have permission");
            }
        }

        [HttpPut("approveJob/{id}")]
        public async Task<ActionResult<ActionStatusDTO>> approveJob(int id)
        {
            var job = await _context.Job.SingleOrDefaultAsync(jb => jb.Id == id);            
            if(job !=null)
            {
                var sme = await _context.Sme.SingleOrDefaultAsync(s => s.Id == job.SmeId);
                if(job.jobStatus == "PENDING")
                {
                    job.jobStatus = "APPROVED";
                    await _context.SaveChangesAsync();
                     var message = new Message(new string[]{sme.Email}, "Job Status", job.JobTitle,"APPROVED");
                     _emailSender.SendEmail(message);
                    return new ActionStatusDTO
                    {
                        status ="Job Approved"
                    };
                }else if(job.jobStatus == "APPROVED")
                {
                    return new ActionStatusDTO
                    {
                        status = "Job Already Approved"
                    };
                }else
                {
                    return new ActionStatusDTO
                    {
                        status ="Something Went Wrong"
                    };
                }
            }else
            {
               return new ActionStatusDTO
               {
                    status ="No Job Found"
               }; 
            }
            
        }


        [HttpPut("declineJob/{id}")]
        public async Task<ActionResult<ActionStatusDTO>> declineJob(int id)
        {
            var job = await _context.Job.SingleOrDefaultAsync(jb => jb.Id == id);            
            if(job !=null)
            {
                var sme = await _context.Sme.SingleOrDefaultAsync(s => s.Id == job.SmeId);
                if(job.jobStatus == "PENDING")
                {
                    job.jobStatus = "DECLINED";
                    await _context.SaveChangesAsync();
                     var message = new Message(new string[]{sme.Email}, "Job Status", job.JobTitle,"DECLINED");
                     _emailSender.SendEmail(message);
                    return new ActionStatusDTO
                    {
                        status ="Job Declined"
                    };
                }else if(job.jobStatus == "DECLINED")
                {
                    return new ActionStatusDTO
                    {
                        status = "Job Already Declined"
                    };
                }else
                {
                    return new ActionStatusDTO
                    {
                        status ="Something Went Wrong"
                    };
                }
            }else
            {
               return new ActionStatusDTO
               {
                    status ="No Job Found"
               }; 
            }
            
        }

    }
}