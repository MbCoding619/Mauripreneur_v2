using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs.UpdateDTO
{
    public class SmeUpdateDTO
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
    }
}