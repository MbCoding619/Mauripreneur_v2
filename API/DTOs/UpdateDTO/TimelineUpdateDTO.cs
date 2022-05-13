using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs.UpdateDTO
{
    public class TimelineUpdateDTO
    {

        public int TimelineId { get; set; }
        public string Title { get; set; }

        public string Description { get; set; }

        
        public DateTime Date { get; set; }
       

        
    }
}