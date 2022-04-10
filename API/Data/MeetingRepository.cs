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

        public void Update(Meeting meeting)
        {
            throw new NotImplementedException();
        }
    }
}