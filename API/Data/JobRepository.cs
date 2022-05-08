using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs.AutoDTO;
using API.Entities;
using API.Interfaces;
using AutoMapper;
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

        public async Task<IEnumerable<Job>> GetAllJobAsync()
        {
            return await _context.Job.ToListAsync();
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

        public async Task<IEnumerable<Job>> GetJobMAsync()
        {
            return await _context.Job.Where(jb => jb.jobStatus == "APPROVED").ToListAsync();
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