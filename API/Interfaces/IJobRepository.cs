using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs.AutoDTO;
using API.Entities;
using API.Helpers;

namespace API.Interfaces
{
    public interface IJobRepository
    {
        void Update(Job job);

        Task<bool> SaveAllAsync();

        Task<IEnumerable<Job>> GetJobMAsync();
        Task<PagedList<ATJobDTO>> GetAllJobAsync(JobParams jobparams);

        Task<Job> GetJobByIdAsync(int id);

        Task<IEnumerable<Job>> GetJobBySmeAsync(int id);

        Task<IEnumerable<Job>> GetJobBySmeByStatusAsync(int id,string jobStatus);

        Task<IEnumerable<ATJobDTO>> GetJobsAsync();

        Task<ATJobDTO> GetJobAsync(int id);
    }
}