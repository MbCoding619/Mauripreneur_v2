using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.DTOs;
using API.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class MeetingController : BaseApiController
    {
        private readonly DataContext _context;
        public MeetingController(DataContext context)
        {
            _context = context;
        }

        [HttpPost("createMeeting")]

        public async Task<ActionResult<MeetAddResponseDTO>> createMeetingSme(MeetingAddDTO meetingAddDTO)
        {
            var user = await _context.Users.SingleOrDefaultAsync(u => u.UserName == meetingAddDTO.username.ToLower());

            if(user !=null){
                var sme = await _context.Sme.SingleOrDefaultAsync(s => s.AppUserId == user.AppUserId);

                var meeting = new Meeting{

                    MeetTitle = meetingAddDTO.MeetTitle,
                    SmeId = sme.Id,
                    BidId = meetingAddDTO.BidId,
                    ProfId = meetingAddDTO.ProfId,
                    startDate = Convert.ToDateTime(meetingAddDTO.startDate),
                    endDate = Convert.ToDateTime(meetingAddDTO.endDate)

                };

                _context.Meeting.Add(meeting);
            }else
            {
                return BadRequest("Meeting not Set!");
            }

            await _context.SaveChangesAsync();
            return new MeetAddResponseDTO{
                status = " Meeting Scheduled"
            };
        }
    }
}