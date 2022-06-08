using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Entities;

namespace API.Interfaces
{
    public interface ISkillsRepository
    {
        void Update(Skills skills);
        
        Task<IEnumerable<Skills>> getSkillsById(int ProfId, int SubFieldId);
    }
}