using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Entities
{
    public class Admin
    {
        public int AdminId { get; set; }
    
        public string username { get; set; }

        public string password { get; set; }

        public  AppUser User { get; set; }
        public int AppUserId { get; set; }
    }
}