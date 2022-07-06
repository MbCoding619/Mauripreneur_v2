    using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.DTOs;
using API.DTOs.AutoDTO;
using API.Entities;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class MeetingController : BaseApiController
    {
        private readonly DataContext _context;
        private readonly IMeetingRepository _meetingRepository;
        private readonly IMapper _mapper;
        public MeetingController(DataContext context, IMeetingRepository meetingRepository, IMapper mapper)
        {
            _mapper = mapper;
            _meetingRepository = meetingRepository;
            _context = context;
        }

        [HttpPost("createMeeting")]

        public async Task<ActionResult<MeetAddResponseDTO>> createMeetingSme(MeetingAddDTO meetingAddDTO)
        {
            var user = await _context.Users.SingleOrDefaultAsync(u => u.UserName == meetingAddDTO.username.ToLower());

            if(user !=null){
                if(user.AppUserRole =="SME")
                {
                 var sme = await _context.Sme.SingleOrDefaultAsync(s => s.AppUserId == user.AppUserId);

                var meeting = new Meeting{

                    MeetTitle = meetingAddDTO.MeetTitle,
                    SmeId = sme.Id,
                    BidId = meetingAddDTO.BidId,
                    meetingDetails = meetingAddDTO.meetingDetails,                    
                    ProfId = meetingAddDTO.ProfId,
                    startDate = Convert.ToDateTime(meetingAddDTO.startDate),
                    endDate = Convert.ToDateTime(meetingAddDTO.endDate)

                };

                _context.Meeting.Add(meeting);
                }
                else if(user.AppUserRole =="PROFESSIONAL")
                {
                    var prof = await _context.Professionals.SingleOrDefaultAsync(p => p.AppUserId == user.AppUserId);

                    var meeting = new Meeting{

                        MeetTitle = meetingAddDTO.MeetTitle,
                        SmeId = meetingAddDTO.SmeId,
                        BidId = meetingAddDTO.BidId,
                        meetingDetails = meetingAddDTO.meetingDetails,
                        ProfId = prof.Id,
                        startDate = Convert.ToDateTime(meetingAddDTO.startDate),
                        endDate = Convert.ToDateTime(meetingAddDTO.endDate)
                        
                    };
                 _context.Meeting.Add(meeting); 
                }else{
                    return BadRequest("User not found");
                }
            }else
            {
                return BadRequest("Meeting not Set!");
            }

            await _context.SaveChangesAsync();
            return new MeetAddResponseDTO{
                status = " Meeting Scheduled"
            };
        }

        [HttpGet("meetingByProf/{username}")]
        public async Task<ActionResult<IEnumerable<ATMeetingDTO>>> GetMeetingByProf(string username)
        {
            var meeting = await _meetingRepository.GetMeetingByProf(username);

            var meetingToReturn = _mapper.Map<IEnumerable<ATMeetingDTO>>(meeting);

            return Ok(meetingToReturn);
        }

        [HttpGet("meetingByProfByBid/{profId}/{bidId}")]
        public async Task<ActionResult<IEnumerable<ATMeetingDTO>>> meetingBypROFByBid(int profId,int bidId)
        {
            var meeting = await _meetingRepository.GetMeetingByProfByBidId(profId,bidId);

            var meetingToReturn = _mapper.Map<IEnumerable<ATMeetingDTO>>(meeting);

            return Ok(meetingToReturn);
        }

        [HttpGet("meetingBySme/{username}")]
        public async Task<ActionResult<IEnumerable<ATMeetingDTO>>> GetMeetingBySme(string username)
        {
            var meeting = await _meetingRepository.GetMeetingBySme(username);

            var meetingToReturn = _mapper.Map<IEnumerable<ATMeetingDTO>>(meeting);

            return Ok(meetingToReturn);
        }

        [HttpGet("meetingBySmeByBid/{smeId}/{bidId}")]
        public async Task<ActionResult<IEnumerable<ATMeetingDTO>>> meetingBySmeByBid(int smeId,int bidId)
        {
            var meeting = await _meetingRepository.GetMeetingBySmeByBid(smeId,bidId);

            var meetingToReturn = _mapper.Map<IEnumerable<ATMeetingDTO>>(meeting);

            return Ok(meetingToReturn);
        }

    }
}