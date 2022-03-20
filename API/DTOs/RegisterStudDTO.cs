using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace API.DTOs
{
    public class RegisterStudDTO
    {
        [Required]
        public String Username { get; set; }

        public string FName { get; set; }

        public string LName { get; set; }

        public int Phone { get; set; }

        public string Address { get; set; }

        public string email { get; set; }

        public string Uni { get; set; }

        public string Course { get; set; } 

        public string Course_level { get; set; }   

        public string LinkedInLink { get; set; }  
        public string briefDescription { get; set; }

        public int FieldId { get; set; }

    }
}