using System;
using System.Collections.Generic;

namespace API.DTOs.AutoDTO
{
    public class ATBidDTO
    
    {
        
        public int Id { get; set; }

       
        public DateTime BidDate { get; set; }
       

        public string BidResponse { get; set; }
        
        public string Description { get; set; }

        public string BidAmount { get; set; }

        public string OtherDetails { get; set; }

        public int JobId { get; set; }

        

        public int ProfessionalId { get; set; }        

      

        public ICollection<ATMeetingDTO> Meeting { get; set; }


    }
}