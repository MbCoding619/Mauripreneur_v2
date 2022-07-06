using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs.UpdateDTO
{
    public class BidUpdateDTO
    {
        public int Id { get; set; }   
         
        public string BidResponse { get; set; }

        public string Description { get; set; }

        public int BidAmount { get; set; }
        public string OtherDetails { get; set; }

        public int bidScore { get; set; }

        public string bidNotes { get; set; }

           

    }
}