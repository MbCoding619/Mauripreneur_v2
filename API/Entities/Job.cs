using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Entities
{
    public class Job
    {
        public int JobId { get; set; } 

        public string Desc { get; set; } 

        public string  DescOther { get; set; } 

        public string Requirements { get; set; }   

        public string Timeframe { get; set; }  

        public int Budget { get; set; }

        public int FieldId { get; set; }

        public Field Field { get;  set; }

        public int Id { get; set; } 

        public Sme Sme { get; set; }

         public ICollection<Bid> Bid { get; set; }
    }
}