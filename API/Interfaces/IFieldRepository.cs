using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Entities;

namespace API.Interfaces
{
    public interface IFieldRepository
    {
        void Update(Field field);

        Task<Field> GetFieldByIdAsync(int id);

        Task<Field> GetFieldByDescription(string description);
    }


}