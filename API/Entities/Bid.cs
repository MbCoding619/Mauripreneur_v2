using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace API.Entities
{
    public class Bid
    {
        [Required]
        public int BidId { get; set; }

        [Column(TypeName="Date")]
        public DateTime BidDate { get; set; }

        public Bid(){
            this.BidDate = DateTime.UtcNow;
        }

        [Required]
        public string BidResponse { get; set; }

        public int JobId { get; set; }

        public Job Job { get; set; }

        public int Id { get; set; }

        public Professional Professional { get; set; }

        public ICollection<Quote> Quote { get; set; }

        public ICollection<Meeting> Meeting { get; set; }
    }
}