using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.DTOs;
using API.DTOs.AutoDTO;
using API.DTOs.UpdateDTO;
using API.Entities;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class JobController : BaseApiController
    {
        private readonly DataContext _context;
        private readonly IJobRepository _jobRepository;
        
        private readonly IMapper _mapper;
        public JobController(DataContext context,IJobRepository jobRepository,IMapper mapper)
        {
            _jobRepository = jobRepository;
            _mapper = mapper;            
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

    [HttpGet("allJob")]

    public async Task<ActionResult<IEnumerable<ATJobDTO>>> GetJob(){

        var jobs = await _jobRepository.GetJobMAsync();
        
        var jobToReturn = _mapper.Map<IEnumerable<ATJobDTO>>(jobs);

        return Ok(jobToReturn);
    }

    [HttpGet("{smeId}")]

    public async  Task<ActionResult<IEnumerable<ATJobDTO>>> GetJobBySmeId(int smeId){
         var jobs = await _jobRepository.GetJobBySmeAsync(smeId);

         var jobToReturn = _mapper.Map<IEnumerable<ATJobDTO>>(jobs);

        return Ok(jobToReturn);

    }


    [HttpPut]

    public async Task<ActionResult> UpdateJob (JobUpdateDTO jobUpdateDTO)
    {   
        var job = await _jobRepository.GetJobByIdAsync(jobUpdateDTO.Id);
        if(job !=null){
            _mapper.Map(jobUpdateDTO, job); 

            _jobRepository.Update(job);
            return Ok("Wa DreC");
        }else{

            return BadRequest("Pa DreC");
        }
        

        
        
    }



    }
}