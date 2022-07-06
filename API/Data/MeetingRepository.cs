using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Entities;
using API.Interfaces;
using AutoMapper;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class MeetingRepository : IMeetingRepository
    {
         private readonly DataContext _context;
        private readonly IMapper _mapper;
        public MeetingRepository(DataContext context, IMapper mapper)
        {
            _mapper = mapper;
            _context = context;
        }

        public async Task<IEnumerable<Meeting>> GetMeetingByProf(string username)
        {   
            var user = await _context.Users.SingleOrDefaultAsync(u => u.UserName == username.ToLower());
            var prof = await _context.Professionals.SingleOrDefaultAsync(p => p.AppUserId == user.AppUserId);

            var meeting = await _context.Meeting.Where(m => m.ProfId == prof.Id).ToListAsync();

            return meeting;
        }

        public async Task<IEnumerable<Meeting>> GetMeetingByProfByBidId(int profId, int bidId)
        {
            var meetings = await _context.Meeting.Where(m => m.ProfId == profId && m.BidId == bidId).ToListAsync();

            return meetings;
        }

        public async Task<IEnumerable<Meeting>> GetMeetingBySme(string username)
        {
            var user = await _context.Users.SingleOrDefaultAsync(u => u.UserName == username.ToLower());

            var sme = await _context.Sme.SingleOrDefaultAsync(s => s.AppUserId == user.AppUserId);

            var meeting = await _context.Meeting.Where( m => m.SmeId == sme.Id).ToListAsync();

            return meeting;
        }

        public async Task<IEnumerable<Meeting>> GetMeetingBySmeByBid(int smeId, int bidId)
        {
            
            var meeting = await _context.Meeting.Where( m => m.SmeId == smeId && m.BidId ==bidId).ToListAsync();

            return meeting;
        }

        public void Update(Meeting meeting)
        {
            throw new NotImplementedException();
        }
    }
}