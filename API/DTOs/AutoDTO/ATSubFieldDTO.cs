using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Entities;

namespace API.DTOs.AutoDTO
{
    public class ATSubFieldDTO
    {
        public int SubFieldId { get; set; } 

        public string Description { get; set; }

        public string subFieldStatus { get; set; }
        
        public int FieldId { get; set; }
        

        public ICollection<Skills> Professional { get; set; }
    }
}