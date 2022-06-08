using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Entities
{
    public class SubField
    {
        public int SubFieldId { get; set; } 

        public string Description { get; set; }

        public string subFieldStatus { get; set; }
        
        public int FieldId { get; set; }

        public Field Field { get; set; }

        public ICollection<Skills> Professional { get; set; }
        
    }
}