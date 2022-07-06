using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs.AutoDTO;
using API.Entities;
using API.Helpers;
using API.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class JobRepository : IJobRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        public JobRepository(DataContext context, IMapper mapper)
        {
            _mapper = mapper;
            _context = context;
        }

        public async Task<PagedList<ATJobDTO>> GetAllJobAsync(JobParams jobParams)
        {
            var query = _context.Job.AsQueryable();
            query = query.Where(jb => jb.FieldId == jobParams.FieldId);

            return await PagedList<ATJobDTO>.CreateAsync(
                query.ProjectTo<ATJobDTO>(_mapper.ConfigurationProvider).AsNoTracking(),
                jobParams.PageNumber,jobParams.PageSize
            );            
        }

        public Task<ATJobDTO> GetJobAsync(int id)
        {
            throw new NotImplementedException();
        }

        public async Task<Job> GetJobByIdAsync(int id)
        {
            return await _context.Job.FindAsync(id);
        }

        public async Task<IEnumerable<Job>> GetJobBySmeAsync(int id)
        {
            return await _context.Job.Where( jb => jb.SmeId == id && jb.jobStatus =="APPROVED").Include(jb => jb.Bid).ToListAsync();
        }

        public async Task<IEnumerable<Job>> GetJobBySmeByStatusAsync(int id, string jobStatus)
        {
           return await _context.Job.Where(jb => jb.SmeId == id && jb.jobStatus == jobStatus).Include(jb => jb.Bid).ToListAsync();
        }

        public async Task<IEnumerable<Job>> GetJobMAsync()
        {
            return await _context.Job.ToListAsync();
        }

        public Task<IEnumerable<ATJobDTO>> GetJobsAsync()
        {
            throw new NotImplementedException();
        }

        public async Task<bool> SaveAllAsync()
        {
             return await _context.SaveChangesAsync() > 0;
        }

        public void Update(Job job)
        {
            _context.Entry(job).State = EntityState.Modified;
            _context.SaveChangesAsync();
        }
    }
}