using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Entities;

namespace API.DTOs.AutoDTO
{
    public class ATSmeDTO
    {
        
        public int Id { get; set; }       

        public string CompName { get; set; }

        public string Address { get; set; }

        public string Email { get; set; }

        public string RepresentName { get; set; }

        public string RepresentLName { get; set; }

        public int RepresentPhone { get; set; }

        public string SocialLink { get; set; }

        public string compDescription { get; set; }

        public string imagePath { get; set; }
        
        
        public int AppUserId { get; set; }

        public ICollection<Vacancy> Vacancy { get; set; }

        public ICollection<Job> Job { get; set; }

        public ICollection<Meeting> Meeting { get; set; }

        public ICollection<Bid> Bid { get; set; }
    }
}