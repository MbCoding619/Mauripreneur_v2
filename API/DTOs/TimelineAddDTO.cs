using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs
{
    public class TimelineAddDTO
    {
        public string Title { get; set; }

        public string Description { get; set; }

        public DateTime Date { get; set; }

        public int BidId { get; set; }
    }
}