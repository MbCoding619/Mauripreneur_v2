using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace API.Entities
{
    public class Job
    {
        [Required]
        public int Id { get; set; } 

        public string  JobTitle { get; set; } 

        public string Desc { get; set; } 
        

        public string Requirements { get; set; }   

        public string Timeframe { get; set; }  

        public int Budget { get; set; }

        public int FieldId { get; set; }

        public Field Field { get;  set; }

        public int SmeId { get; set; } 

        public Sme Sme { get; set; }

         public ICollection<Bid> Bid { get; set; }
    }
}