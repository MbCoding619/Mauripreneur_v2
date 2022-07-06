using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using API.DTOs.AutoDTO;
using API.DTOs.UpdateDTO;
using API.Entities;
using API.Entities.Query;
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
            CreateMap<BidUpdateDTO,Bid>();
            CreateMap<AddNotesDTO,Bid>();         
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
            CreateMap<MemberQuery,ATMemberQueryDTO>()
                    .ForMember(dest => dest.UserName, opt => opt.MapFrom(src => new MemberQuery{UserName = src.UserName}))
                    .ForMember(dest => dest.AppUserRole, opt => opt.MapFrom(src => new MemberQuery{AppUserRole = src.AppUserRole}))
                    .ForMember(dest => dest.FName, opt => opt.MapFrom(src => new MemberQuery{FName = src.FName}))
                    .ForMember(dest => dest.LinkedInLink, opt => opt.MapFrom(src => new MemberQuery{LinkedInLink = src.LinkedInLink}))                    .ForMember(dest => dest.FieldId, opt => opt.MapFrom(src => new MemberQuery{FieldId = src.FieldId}))                    .ForMember(dest => dest.Description, opt => opt.MapFrom(src => new MemberQuery{Description = src.Description}));
        }
    }
}