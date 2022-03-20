using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Entities;

namespace API.Interfaces
{
    public interface IBidRepository
    {
        void Update(Bid bid);

        Task<bool> SaveAllAsync();
        Task<IEnumerable<Bid>> GetBidAsync();

        Task<Bid> GetBidByIdAsync(int id);

        Task<IEnumerable<Bid>> GetBidByProfIdAsync(int profId);

        Task<IEnumerable<Bid>> GetBidByJobIdAsync(int jobId);
    }
}