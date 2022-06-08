using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;

namespace API.Entities
{
    public class Skills
    {   
        [Required]
        public int ProfId { get; set; }

        public Professional Professional { get; set; }

        public int SubFieldId { get; set; }

        public SubField SubField { get; set; }

        public string Proficiency { get; set; }
    }
}