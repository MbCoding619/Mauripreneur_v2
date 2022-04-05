using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Entities;

namespace API.Interfaces
{
    public interface ISmeRepository
    {
        void Update(Sme sme);

        Task<IEnumerable<Sme>> GetSmeAsync();

        Task<Sme> GetSmeByAppId(int id);

        Task<Sme> GetSmeById(int id);
    }
}