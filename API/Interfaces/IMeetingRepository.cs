using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Entities;

namespace API.Interfaces
{
    public interface IMeetingRepository
    {
        void Update(Meeting meeting);

        Task<IEnumerable<Meeting>> GetMeetingByProf(string username);

        Task<IEnumerable<Meeting>> GetMeetingBySme(string username);
        Task<IEnumerable<Meeting>> GetMeetingBySmeByBid(int smeId, int bidId);

        Task<IEnumerable<Meeting>> GetMeetingByProfByBidId(int profId , int bidId);
    }
}