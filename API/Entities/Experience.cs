using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Entities
{
    public class Experience
    {
        public int ExperienceId { get; set; }
        
        public string JobTitle { get; set; }

        public string yearsExperience { get; set; }

        public string CompName { get; set; }

        public string cvPath { get; set; }

        public int ProfId { get; set; }

        public Professional Professional { get; set; }
    }
}