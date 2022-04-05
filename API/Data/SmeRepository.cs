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
    public class SmeRepository : ISmeRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        public SmeRepository(DataContext context, IMapper mapper)
        {
            _mapper = mapper;
            _context = context;
        }

        public async Task<IEnumerable<Sme>> GetSmeAsync()
        {
            return await _context.Sme.ToListAsync();
        }

        public async Task<Sme> GetSmeByAppId(int id)
        {
            return await _context.Sme.SingleOrDefaultAsync(s => s.AppUserId == id);
        }

        public async Task<Sme> GetSmeById(int id)
        {
            return await _context.Sme.FindAsync(id);
        }

        public void Update(Sme sme)
        {
            _context.Entry(sme).State = EntityState.Modified;
            _context.SaveChangesAsync();
        }
    }
}