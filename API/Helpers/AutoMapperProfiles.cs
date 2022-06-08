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
            CreateMap<Sme,ATSmeDTO>();
            CreateMap<SmeUpdateDTO,Sme>();
            CreateMap<Professional,ATProfessionalDTO>();
            CreateMap<ProfUpdateDTO,Professional>();
            CreateMap<FieldUpdateDTO,Field>();
            CreateMap<Meeting,ATMeetingDTO>();
            CreateMap<Timeline,ATTimelineDTO>();
            CreateMap<TimelineUpdateDTO,Timeline>();
            CreateMap<SubField,ATSubFieldDTO>();
            CreateMap<SubFieldUpdateDTO,SubField>();
            CreateMap<Skills,ATSkillsDTO>();
            CreateMap<Experience,ATExperienceDTO>();
        }
    }
}