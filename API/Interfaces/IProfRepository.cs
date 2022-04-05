using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Entities;

namespace API.Interfaces
{
    public interface IProfRepository
    {
        void Update(Professional professional);

        Task<IEnumerable<Professional>> GetProfAsync();

        Task<Professional> GetProfByAppId(int id);

        Task<Professional> GetProfById(int id);
        
    }
}