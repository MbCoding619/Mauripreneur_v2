using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs
{
    public class BidQueryDTO
    {
        public string JobTitle { get; set; }

        public int Budget { get; set; } 

        public int BidAmount { get; set; }

        public string BidReponse { get; set; }
    }
}