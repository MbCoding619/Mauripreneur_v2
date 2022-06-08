using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Entities;

namespace API.Interfaces
{
    public interface IQualRepository
    {
        void Update(Qualification qualification);

        Task<IEnumerable<Qualification>> GetQualifications();

        Task<IEnumerable<Qualification>> GetQualificationsByProfId(int profId);
    }
}