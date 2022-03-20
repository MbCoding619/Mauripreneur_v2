using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Entities;
using API.Interfaces;
using AutoMapper;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class BidRepository : IBidRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        public BidRepository(DataContext context , IMapper mapper)
        {
            _mapper = mapper;
            _context = context;
        }

        public async Task<IEnumerable<Bid>> GetBidAsync()
        {
            return await _context.Bid.ToListAsync();
        }

        public async Task<Bid> GetBidByIdAsync(int id)
        {
            return await _context.Bid.FindAsync(id);
        }

        public Task<IEnumerable<Bid>> GetBidByJobIdAsync(int jobId)
        {
            throw new NotImplementedException();
        }

        public Task<IEnumerable<Bid>> GetBidByProfIdAsync(int profId)
        {
            throw new NotImplementedException();
        }

        public Task<bool> SaveAllAsync()
        {
            throw new NotImplementedException();
        }

        public void Update(Bid bid)
        {
            _context.Entry(bid).State = EntityState.Modified;
        }
    }
}