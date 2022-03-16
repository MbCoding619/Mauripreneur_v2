using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;


namespace API.Entities
{
    public class Quote
    {
        [Required]
        public int QuoteId { get; set; }

        public string Description { get; set; }

        public string tentHours { get; set; }

        public int BidId { get; set; }  
        
        public Bid Bid { get; set; }
    }
}