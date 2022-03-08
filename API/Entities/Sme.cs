using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Entities
{
    public class Sme
    {
        
        public int Id { get; set; }

        public string UserName { get; set; }

        public byte[] PasswordHash { get; set; }

        public byte[] PasswordSalt { get; set; }

        public string CompName { get; set; }

        public string Address { get; set; }

        public string Email { get; set; }

        public string RepresentName { get; set; }

        public int RepresentPhone { get; set; }
    }
}