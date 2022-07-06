using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Entities.Query
{
    public class MemberQuery
    {
        public string UserName { get; set; }

        public string AppUserRole { get; set; }

        public string FName { get; set; }

        public string LinkedInLink { get; set; }

        public int FieldId { get; set; }

        public string Description { get; set; }
    }
}