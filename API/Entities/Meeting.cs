using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Entities
{
    public class Meeting
    {
        public int MeetId  { get; set; }

        public int MeetTitle { get; set; }        

        public int? SmeId { get; set; }
        
        public Sme Sme { get; set; }

        public int? ProfId { get; set; }

        public Professional Professional { get; set; }

        public int? StudId { get; set; }

        public Student Student { get; set; }

        public int? BidId { get; set; }

        public Bid Bid { get; set; }

        public int? VacId { get; set; }

        public Vacancy Vacancy { get; set; }


    }
}