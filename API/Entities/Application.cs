using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;

namespace API.Entities
{
    public class Application
    {   
        [Required]
        public int StudId { get; set; }

        public Student Student { get; set; }

        public int VacId { get; set; }

        public Vacancy Vacancy { get; set; }
    }
}