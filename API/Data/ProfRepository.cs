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
    public class ProfRepository : IProfRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        public ProfRepository(DataContext context, IMapper mapper)
        {
            _mapper = mapper;
            _context = context;
        }

        public async Task<IEnumerable<Professional>> GetProfAsync()
        {
            return await _context.Professionals.ToListAsync();
        }

        public async Task<Professional> GetProfByAppId(int id)
        {
            return await _context.Professionals.SingleOrDefaultAsync(pr => pr.AppUserId == id);
        }

        public async Task<Professional> GetProfById(int id)
        {
            return await _context.Professionals.FindAsync(id);
        }

        public void Update(Professional professional)
        {
            _context.Entry(professional).State = EntityState.Modified;
            _context.SaveChangesAsync();
        }
    }
}