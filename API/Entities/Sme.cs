using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using  System.ComponentModel.DataAnnotations.Schema;


namespace API.Entities
{
    public class Sme
    {
      
        public int Id { get; set; }       

        public string CompName { get; set; }

        public string Address { get; set; }

        public string Email { get; set; }

        public string RepresentName { get; set; }

        public string RepresentLName { get; set; }

        public int RepresentPhone { get; set; }

        public string SocialLink { get; set; }

        
        public  AppUser User { get; set; }
        public int AppUserId { get; set; }

        public ICollection<Vacancy> Vacancy { get; set; }

        public ICollection<Job> Job { get; set; }

        public ICollection<Meeting> Meeting { get; set; }


    }
}