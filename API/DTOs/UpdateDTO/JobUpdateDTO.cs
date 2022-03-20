using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs.UpdateDTO
{
    public class JobUpdateDTO
    {
         public int Id { get; set; } 
         public string  JobTitle { get; set; } 

         public string Desc { get; set; }        

        public string Requirements { get; set; }   

        public string Timeframe { get; set; }  

        public int Budget { get; set; }

        public int FieldId { get; set; }
    }
}