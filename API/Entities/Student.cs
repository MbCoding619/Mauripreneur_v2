using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations.Schema;

namespace API.Entities
{
    public class Student
    {
        public int Id { get; set; }
        
        public string FName { get; set; }

        public string LName { get; set; }

        public int Phone { get; set; }

        public string Address { get; set; }

        public string email { get; set; }

        public string Uni { get; set; }

        public string Course { get; set; } 

        public string Course_level { get; set; }    

        [Column(TypeName="Date")]
        public DateTime Course_startDate { get; set; }

        [Column(TypeName ="Date")]
        public DateTime Course_endDate { get; set; }

        public string briefDescription { get; set; }

        public  AppUser User { get; set; }
        public int AppUserId { get; set; }

        public int FieldId { get; set; }

        public Field Field { get;  set; }

        public ICollection<Meeting> Meeting { get; set; }

        public ICollection<Application> Vacancy { get; set; }
    }
}