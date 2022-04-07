using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs.UpdateDTO
{
    public class FieldUpdateDTO
    {
        public int FieldId { get; set; }

        public string Description { get; set; }

        public string fieldStatus { get; set; }
    }
}