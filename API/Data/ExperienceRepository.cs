using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Entities;
using API.Interfaces;
using AutoMapper;

namespace API.Data
{
    public class ExperienceRepository : IExperienceRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        public ExperienceRepository(DataContext context,IMapper mapper)
        {
            _mapper = mapper;
            _context = context;
        }

        public Task<IEnumerable<Experience>> GetExperienceByProfId(int profId)
        {
            throw new NotImplementedException();
        }

        public Task<IEnumerable<Experience>> GetExperiences()
        {
            throw new NotImplementedException();
        }

        public void Update(Experience experience)
        {
            throw new NotImplementedException();
        }
    }
}