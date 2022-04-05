using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Entities;

namespace API.DTOs.AutoDTO
{
    public class ATProfessionalDTO
    {
        public int Id { get; set; }

        public string FName { get; set; }

        public string LName { get; set; }

        public string IDNum { get; set; }

        public string Address { get; set; }

        public int Phone { get; set; }

        public string Email { get; set; }

        public string EducationInstition { get; set; }

        public string Qual1 { get; set; }


        public string Qual2 { get; set; }

        public string LinkedInLink { get; set; }

        public string BriefDesc { get; set; }

        public string EmploymentHistory { get; set; }

        public string EmploymentStatus { get; set; }

        
       
        public int AppUserId { get; set; }

        public int FieldId { get; set; }

       

        public ICollection<Bid> Bid { get; set; }

        public ICollection<Meeting> Meeting { get; set; }
    }
}