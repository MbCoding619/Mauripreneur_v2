using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Entities;
using API.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class SubFieldRepository : ISubFieldRepository
    {
        private readonly DataContext _context;
        public SubFieldRepository(DataContext context)
        {
            _context = context;
        }

        public async Task<SubField> getSubFieldByIdAsync(int id)
        {
            return await _context.SubField.FindAsync(id);
        }

        public void Update(SubField SubField)
        {
            _context.Entry(SubField).State = EntityState.Modified;
            _context.SaveChanges();
        }
    }
}