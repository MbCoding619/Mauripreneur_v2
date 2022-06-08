using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Entities
{
    public class Qualification
    {
        public int QualificationId { get; set; }

        public string institution { get; set; }
        
        public string title { get; set; }

        public int yearEnding { get; set; }

        public int ProfId { get; set; }

        public Professional Professional { get; set; }
    }
}