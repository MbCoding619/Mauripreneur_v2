using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.DTOs;
using API.Entities;
using API.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class JobController : BaseApiController
    {
        private readonly DataContext _context;
        public JobController(DataContext context)
        {
            _context = context;
        }



    [HttpPost("addJob")]

    public async Task<ActionResult<JobDTO>> addJob(JobAddDTO jobAddDTO){

        var user = await _context.Users.SingleOrDefaultAsync(b => b.UserName == jobAddDTO.username.ToLower());
        
            if( user != null){
                var sme = await _context.Sme.SingleOrDefaultAsync( s => s.AppUserId == user.AppUserId);
                 var job = new Job {
            

              JobTitle = jobAddDTO.JobTitle,
              Desc = jobAddDTO.Desc,
              Requirements = jobAddDTO.Requirements,
              FieldId = jobAddDTO.FieldId,
              Timeframe = jobAddDTO.Timeframe,
              Budget = jobAddDTO.Budget,
              SmeId = sme.Id

          } ;

        _context.Job.Add(job);  
        }else {

            return BadRequest("Please Relog");

        }
         
        await _context.SaveChangesAsync();

        return new JobDTO{

            Status = "Job Added"
        };

    

    }



    }
}