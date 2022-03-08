using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs
{
    public class RegisterSmeDTO
    {
        [Required]
        public string Username { get; set; }

        [Required]
        public string Password { get; set; }

         public string CompName { get; set; }

        public string Address { get; set; }

        public string Email { get; set; }

        public string RepresentName { get; set; }

        public int RepresentPhone { get; set; }

    }
}