using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs.AutoDTO;
using API.Entities;
using API.Helpers;
using API.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class UserRepository : IUserRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        private readonly IFieldRepository _fieldRepository;
        private readonly IProfRepository _profRepository;
        public UserRepository(DataContext context, IMapper mapper , IFieldRepository fieldRepository,IProfRepository profRepository)
        {
            _profRepository = profRepository;
            _fieldRepository = fieldRepository;
            _mapper = mapper;
            _context = context;
        }

        public async Task<ATMemberDTO> GetMemberAsync(string username)
        {
            return await _context.Users
                            .Where(x => x.UserName == username)
                            .ProjectTo<ATMemberDTO>(_mapper.ConfigurationProvider)
                            .SingleAsync();

        }

        public async Task<PagedList<ATMemberDTO>> GetMembersAsync(UserParams userParams)
        {
                  
            var query = _context.Users.AsQueryable();
            if(userParams.AppUserRole == "PROFESSIONAL" && userParams.FieldId != 0)
            {   
                //Note when using include . it joins the tables
                // Further details on include can be accessed like ajson.
                //see u.Professional(Entity).FieldId(Attribute)
                query = query.Include(u => u.Professional);                                                         
                query = query.Where(u => u.Professional.FieldId == userParams.FieldId);                            
                
               // query = query.Where(u => u.UserName != userParams.currentUsername);
               // query = query.Where(u => u.AppUserRole == userParams.AppUserRole);
            }
                
            query = query.Where(u => u.UserName != userParams.currentUsername);
            query = query.Where(u => u.AppUserRole == userParams.AppUserRole);


            return await PagedList<ATMemberDTO>.CreateAsync(query.ProjectTo<ATMemberDTO>                                                                               (_mapper.ConfigurationProvider).AsNoTracking()
            ,userParams.PageNumber,userParams.PageSize);
            // check secton 98
        }

        public async Task<AppUser> GetUserByIdAsync(int id)
        {
            return await _context.Users.FindAsync(id);
        }

        public async Task<AppUser> GetUserByUsernameAsync(string username)
        {
            return await _context.Users.SingleOrDefaultAsync(x => x.UserName == username);
        }

        public async Task<IEnumerable<AppUser>> GetUsersAsync()
        {
            return await _context.Users.ToListAsync();
        }

        public async Task<bool> SaveAllAsync()
        {
            return await _context.SaveChangesAsync() > 0;
        }

    

        public void Update(AppUser user)
        {
            _context.Entry(user).State = EntityState.Modified;
        }
    }
}