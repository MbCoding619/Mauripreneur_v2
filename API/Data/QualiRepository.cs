using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Entities;
using API.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class QualiRepository : IQualRepository
    {
        private readonly DataContext _context;
        public QualiRepository(DataContext context )
        {
            _context = context;
        }

        public async Task<IEnumerable<Qualification>> GetQualifications()
        {
            return await _context.Qualification.ToListAsync();
        }

        public async Task<IEnumerable<Qualification>> GetQualificationsByProfId(int profId)
        {
            return await _context.Qualification.Where(ql => ql.ProfId == profId).ToListAsync();
        }

        public void Update(Qualification qualification)
        {
            _context.Entry(qualification).State = EntityState.Modified;
            _context.SaveChangesAsync();
        }
    }
}