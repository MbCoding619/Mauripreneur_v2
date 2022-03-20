using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.DTOs;
using API.Entities;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class BidController : BaseApiController
    {
        private readonly IBidRepository _bidRepository;
        private readonly IMapper _mapper;
        private readonly DataContext _context;
        public BidController(DataContext context, IMapper mapper )
        {
            _context = context;
            _mapper = mapper;
            
        }


        [HttpPost("addBid")]

        public async Task<ActionResult<BidReponseDTO>> addBid( BidAddDTO bidAddDTO)
        {
             var user = await _context.Users.SingleOrDefaultAsync(b => b.UserName == bidAddDTO.username.ToLower());

             if(user !=null)
             {
                 var prof = await _context.Professionals.SingleOrDefaultAsync( p => p.AppUserId == user.AppUserId);

                 var bid = new Bid {

                     JobId = bidAddDTO.JobId,
                     ProfessionalId = prof.Id,
                     BidResponse = "PENDING",
                     Description = bidAddDTO.Description,
                     OtherDetails = bidAddDTO.OtherDetails,
                     BidAmount = bidAddDTO.BidAmount

                 };

                 _context.Bid.Add(bid);
             }else{

                 return BadRequest("Error Happened");
             }

             await _context.SaveChangesAsync();

             return new BidReponseDTO{

                 Status = "Added"
             };

        }


        

        
    }
}