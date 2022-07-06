using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Helpers
{
    public class JobParams
    {
        public int FieldId  { get; set; }

        public int SmeId { get; set; }

        public int Budget { get; set; }

        public int Status { get; set; }

        public string currentUsername { get; set; }

        private const int MaxPageSize = 50;
        public int PageNumber { get; set; } = 1;

        private int _pageSize = 10;

        public int PageSize
        {
            get => _pageSize;
            set => _pageSize =(value > MaxPageSize) ? MaxPageSize : value;
        }
    }
}