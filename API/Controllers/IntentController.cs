using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.DTOs;
using API.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class IntentController : BaseApiController
    {
        private readonly DataContext _context;

        public IntentController(DataContext context)
        {
            _context = context;

        }

        [HttpPost("showIntent")]
        public async Task<ActionResult<ActionStatusDTO>> showIntent(IntentDTO intentDTO)
        {   
            var user = await _context.Users.SingleOrDefaultAsync(u => u.UserName == intentDTO.username.ToLower());
            if(user !=null)
            {
                var prof = await _context.Professionals.SingleOrDefaultAsync(p => p.AppUserId == user.AppUserId);
                if(prof !=null)
                {
                
              
                    return new ActionStatusDTO{
                        status ="Added"
                    };
                }else{
                    return BadRequest();
                }
            }else{
                return BadRequest();
            }

            
        }
    }
}