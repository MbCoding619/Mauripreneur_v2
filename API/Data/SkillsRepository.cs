using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Entities;
using API.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class SkillsRepository : ISkillsRepository
    {
        private readonly DataContext _context;
        
        public SkillsRepository(DataContext context)
        {
            
            _context = context;
        }

        public Task<IEnumerable<Skills>> getSkillsById(int ProfId, int SubFieldId)
        {
            throw new NotImplementedException();
        }

        public void Update(Skills skills)
        {
            throw new NotImplementedException();
        }
    }
}