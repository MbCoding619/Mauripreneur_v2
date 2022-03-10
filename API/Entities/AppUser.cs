using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations.Schema;


namespace API.Entities
{
    public class AppUser
    {

        
        
        public int AppUserId { get; set; }

        public string UserName { get; set; }

        //Creating Attributes PasswordHash & PasswordSalt of Byte Array
        public byte[] PasswordHash { get; set; }

        public byte[] PasswordSalt { get; set; }
        
        public  Sme Sme { get; set; }
        
        public Professional Professional { get; set; }       

    }
    
}