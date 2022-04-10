using System;

namespace API.DTOs.AutoDTO
{
    public class ATMeetingDTO
    {
        
        public int MeetId  { get; set; }

        public string MeetTitle { get; set; }  

        public string meetingDetails { get; set; }      

        public int? SmeId { get; set; }
        
        public DateTime startDate { get; set; }
        
        public DateTime endDate { get; set; }    
        
        public int? ProfId { get; set; }        

        public int? StudId { get; set; }        

        public int? BidId { get; set; }
        

        public int? VacId { get; set; }

       
    }
}