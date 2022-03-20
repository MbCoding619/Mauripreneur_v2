using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs.AutoDTO;
using API.Entities;

namespace API.Interfaces
{
    public interface IJobRepository
    {
        void Update(Job job);

        Task<bool> SaveAllAsync();

        Task<IEnumerable<Job>> GetJobMAsync();

        Task<Job> GetJobByIdAsync(int id);

        Task<IEnumerable<Job>> GetJobBySmeAsync(int id);

        Task<IEnumerable<ATJobDTO>> GetJobsAsync();

        Task<ATJobDTO> GetJobAsync(int id);
    }
}