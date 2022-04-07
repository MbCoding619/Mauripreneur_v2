using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Entities;
using API.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class FieldRepository : IFieldRepository
    {
        private readonly DataContext _context;
        public FieldRepository(DataContext context)
        {
            _context = context;
        }

        public async Task<Field> GetFieldByIdAsync(int id)
        {
            return await _context.Fields.FindAsync(id);
        }

        public void Update(Field field)
        {
            _context.Entry(field).State = EntityState.Modified;
            _context.SaveChanges(); 
        }
    }
}