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
        public int Id { get; set; }

        [Column(TypeName="Date")]
        public DateTime BidDate { get; set; }

        public Bid(){
            this.BidDate = DateTime.UtcNow;
        }

        [Required]
        public string BidResponse { get; set; }

        public string Description { get; set; }

        public int BidAmount { get; set; }
        public string OtherDetails { get; set; }

        public int JobId { get; set; }

        public Job Job { get; set; }

        public int ProfessionalId { get; set; }
        

        public Professional Professional { get; set; }  

        public int? SmeId { get; set; }

        public Sme Sme { get; set; }    

        public ICollection<Meeting> Meeting { get; set; }
    }
}