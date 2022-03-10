using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Entities
{
    public class Field
    {
        public int FieldId { get; set; }

        public string Description { get; set; }

        public ICollection<Professional> Professional { get; set; }
    }
}