using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs.UpdateDTO
{
    public class SubFieldUpdateDTO
    {   
      public int SubFieldId { get; set; } 

        public string Description { get; set; }

        public string subFieldStatus { get; set; }
        
    }
}