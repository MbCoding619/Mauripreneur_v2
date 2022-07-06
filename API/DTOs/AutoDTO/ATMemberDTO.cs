using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Entities;

namespace API.DTOs.AutoDTO
{
    public class ATMemberDTO
    {
        public int AppUserId { get; set; }

        public string UserName { get; set; }

        //Creating Attributes PasswordHash & PasswordSalt of Byte Array
        //public byte[] PasswordHash { get; set; }

        //public byte[] PasswordSalt { get; set; }

        public string AppUserRole { get; set; } 

         public string accountStatus { get; set; }
        public string imagePath { get; set; }
        public string Token { get; set; } 

        //public string fieldDesc { get; set; }
        
        public Field Field { get; set; }        

        public Professional Professional { get; set; }
        
    }
}