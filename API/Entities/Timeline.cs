using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace API.Entities
{
    public class Timeline
    {
        public int TimelineId { get; set; }

        public string Title { get; set; }

        public string Description { get; set; }

        [Column(TypeName="Date")]
        public DateTime Date { get; set; }

        public int BidId { get; set; }

        public Bid Bid { get; set; }

        
    }
}