using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Entities
{
    public class Vacancy
    {
        public int VacId { get; set; }

        public string VacTitle { get; set; }

        public string Description { get; set; }

        public string Requirements { get; set; }  

        public int SmeId { get; set; } 

        public Sme Sme { get; set; }

        public ICollection<Application> Students { get; set; }

        public ICollection<Meeting> Meeting { get; set; }
    }
}