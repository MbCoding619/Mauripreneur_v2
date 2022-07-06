using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace API.Entities
{
    public class Intent
    {
        public int IntentId { get; set; }

        [Column(TypeName="Date")]
        public DateTime intentDate { get; set; }

        public Intent(){
            this.intentDate = DateTime.UtcNow;
        }

        public int ProfessionalId { get; set; }

        public Professional Professional { get; set; }

        public int JobId { get; set; }

        public Job Job { get; set; }
    }
}