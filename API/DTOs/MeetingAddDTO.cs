using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs
{
    public class MeetingAddDTO
    {

        public string username { get; set; }
        
        public string MeetTitle { get; set; }       

        public int? SmeId { get; set; }        
        public DateTime startDate { get; set; }        
        public DateTime endDate { get; set; }        
       
        public int? ProfId { get; set; }        

        public int? StudId { get; set; }        

        public int? BidId { get; set; }       

        public int? VacId { get; set; }

    }
}