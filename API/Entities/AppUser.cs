using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Entities
{
    public class AppUser
    {
        public int Id { get; set; }

        public string UserName { get; set; }

        //Creating Attributes PasswordHash & PasswordSalt of Byte Array
        public byte[] PasswordHash { get; set; }

        public byte[] PasswordSalt { get; set; }

       
    }
    
}