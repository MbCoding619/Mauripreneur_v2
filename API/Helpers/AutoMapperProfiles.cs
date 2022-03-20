using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs.AutoDTO;
using API.DTOs.UpdateDTO;
using API.Entities;
using AutoMapper;

namespace API.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<AppUser, ATMemberDTO>();
            CreateMap<Job, ATJobDTO>();  
            CreateMap<Bid ,ATBidDTO>();          
            CreateMap<JobUpdateDTO , Job>();
        }
    }
}