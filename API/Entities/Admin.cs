using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Entities
{
    public class Admin
    {
        public int AdminId { get; set; }
    
        public string FName { get; set; }

        public string LName { get; set; }

        
        public  AppUser User { get; set; }
        public int AppUserId { get; set; }
    }
}