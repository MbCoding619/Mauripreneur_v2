using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs
{
    public class BidAddDTO
    {           
        public string username { get; set; }

        public int JobId { get; set; }  

        public string Description { get; set; }

        public int BidAmount { get; set; }

        public string OtherDetails { get; set; }

        public int BidId { get; set; }

             

        
    }
}