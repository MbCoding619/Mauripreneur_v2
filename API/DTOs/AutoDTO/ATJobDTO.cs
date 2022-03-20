using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs.AutoDTO
{
    public class ATJobDTO
    {
       public int Id { get; set; } 

        public string  JobTitle { get; set; } 

        public string Desc { get; set; } 
        

        public string Requirements { get; set; }   

        public string Timeframe { get; set; }  

        public int Budget { get; set; }

        public int FieldId { get; set; }

        

        public int SmeId { get; set; } 

        

         public ICollection<ATBidDTO> Bid { get; set; }
    }
}