using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Entities
{
    public class Organization
    {
        public int Id { get; set; }
        
        public string OrgName { get; set; }

        public string Address { get; set; }

        public string Email { get; set; }

        public int Phone { get; set; }

        public string OrgRepresent_FName { get; set; }

        public string OrgRepresent_LName { get; set; }

        public  AppUser User { get; set; }
        public int AppUserId { get; set; }

        
    }
}