using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.DTOs;
using API.DTOs.AutoDTO;
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
        public BidController(DataContext context, IMapper mapper, IBidRepository bidRepository )
        {
            _context = context;
            _mapper = mapper;
            _bidRepository = bidRepository;
            
        }


        [HttpPost("addBid")]

        public async Task<ActionResult<BidReponseDTO>> addBid( BidAddDTO bidAddDTO)
        {
             var user = await _context.Users.SingleOrDefaultAsync(b => b.UserName == bidAddDTO.username.ToLower());
             var bid = new Bid();

             if(user !=null)
             {
                 var prof = await _context.Professionals.SingleOrDefaultAsync( p => p.AppUserId == user.AppUserId);
                
                var bidCheck = await _context.Bid.FirstOrDefaultAsync(b => b.JobId == bidAddDTO.JobId && b.ProfessionalId == prof.Id);

                if(bidCheck == null)
                {
                    bid = new Bid {

                     JobId = bidAddDTO.JobId,
                     ProfessionalId = prof.Id,
                     BidResponse = "PENDING",
                     Description = bidAddDTO.Description,
                     OtherDetails = bidAddDTO.OtherDetails,
                     BidAmount = bidAddDTO.BidAmount

                 };

                 _context.Bid.Add(bid);
                }else
                {
                    return BadRequest("Already Bid for the job");
                }


             }else{

                 return BadRequest("Error Happened");
             }

             await _context.SaveChangesAsync();

             return new BidReponseDTO{
                BidId = bid.Id,
                 Status = "Added"
             };

        }

        [HttpGet("byJidPid/{bidId}/{ProfId}")]

        public async Task<ActionResult<Bid>> getByJidPid(int bidId, int ProfId)
        {

            return await _bidRepository.GetBidByJobIdProfId(bidId,ProfId);
        }

        [HttpDelete("deleteBid/{bidId}")]

        public async Task<ActionResult> deleteBidById(int bidId)
        {
            var bid = await _bidRepository.GetBidByIdAsync(bidId);

            if(bid != null)
            {
                _bidRepository.Delete(bid);
                return Ok("Bid Deleted");
            }else
            {
                return BadRequest("Something Went Wrong");
            }
        }

      

       

        [HttpPut("acceptBid")]

        public async Task<ActionResult> acceptBid(BidAcceptDTO bidAcceptDTO)
        {
            var user = await _context.Users.SingleOrDefaultAsync(u => u.UserName == bidAcceptDTO.username);
            var bid = await _bidRepository.GetBidByIdAsync(bidAcceptDTO.bidId);
            var sme = await _context.Sme.SingleOrDefaultAsync(s => s.AppUserId == user.AppUserId);
            if(user !=null && bid !=null && sme !=null)
            {
                bid.BidResponse = "Accepted";
                bid.SmeId = sme.Id;
                _bidRepository.Update(bid);
                return Ok("Bid Accepted");
            }else
            {
                
                return BadRequest("Something Went Wrong");
            }
        }

        [HttpGet("{username}")]

        public async Task<ActionResult> queryBid(string username)
        {
            var user = await _context.Users.SingleOrDefaultAsync(u => u.UserName == username);
            var sme = await _context.Sme.SingleOrDefaultAsync( s => s.AppUserId == user.AppUserId);

            var bidToReturn =  (from bd in _context.Bid
                                join jb in _context.Job on bd.JobId equals jb.Id
                                join pr in _context.Professionals on bd.ProfessionalId equals pr.Id
                                join sm in _context.Sme on jb.SmeId equals sm.Id
                                where sm.Id == sme.Id                               
                                select new {
                                    BidId = bd.Id,
                                    Description = bd.Description,
                                    JobTitle = jb.JobTitle,
                                    Budget = jb.Budget,
                                    BidAmount = bd.BidAmount,
                                    Name = pr.FName,
                                    Response = bd.BidResponse
                                });

               
            return Ok(bidToReturn);

        }

        [HttpGet("getBidAccepted/{username}")]
  public async Task<ActionResult> queryBidAccepted(string username)
        {
            var user = await _context.Users.SingleOrDefaultAsync(u => u.UserName == username);
            var sme = await _context.Sme.SingleOrDefaultAsync( s => s.AppUserId == user.AppUserId);

            var bidToReturn =  (from bd in _context.Bid
                                join jb in _context.Job on bd.JobId equals jb.Id
                                join pr in _context.Professionals on bd.ProfessionalId equals pr.Id
                                join sm in _context.Sme on jb.SmeId equals sm.Id
                                where (sm.Id == sme.Id && bd.BidResponse == "Accepted")                              
                                select new {
                                    BidId = bd.Id,
                                    Description = bd.Description,
                                    JobTitle = jb.JobTitle,
                                    Budget = jb.Budget,
                                    BidAmount = bd.BidAmount,
                                    Name = pr.FName,
                                    Response = bd.BidResponse,
                                    ProfId = pr.Id
                                });

               
            return Ok(bidToReturn);

        }

[HttpGet("getBidSent/{username}")]
  public async Task<ActionResult> queryBidSent(string username)
        {
            var user = await _context.Users.SingleOrDefaultAsync(u => u.UserName == username);
            var prof = await _context.Professionals.SingleOrDefaultAsync( s => s.AppUserId == user.AppUserId);

            var bidToReturn =  (from bd in _context.Bid
                                join jb in _context.Job on bd.JobId equals jb.Id
                                join pr in _context.Professionals on bd.ProfessionalId equals pr.Id                                
                                where (pr.Id == prof.Id)                              
                                select new {
                                    BidId = bd.Id,
                                    Description = bd.Description,
                                    JobTitle = jb.JobTitle,
                                    Budget = jb.Budget,
                                    BidAmount = bd.BidAmount,
                                    Name = pr.FName,
                                    Response = bd.BidResponse,
                                    ProfId = pr.Id
                                });

               
            return Ok(bidToReturn);

        }

    [HttpPost("addTimelines")]

    public async Task<ActionResult<ReponseDTO>> addTimeline(TimelineAddDTO timelineAddDTO)
    {
        var bid = await _bidRepository.GetBidByIdAsync(timelineAddDTO.BidId);

        if(bid !=null)
        {
            var timeline = new Timeline
            {
                Title = timelineAddDTO.Title,
                Description =timelineAddDTO.Description,
                Date = timelineAddDTO.Date,
                BidId = timelineAddDTO.BidId
            };
            _context.Timeline.Add(timeline);
            await _context.SaveChangesAsync();

            return new ReponseDTO{
                Response = "Timeline Added"
            };
        }else
        {
            return BadRequest();
        }
    }


    [HttpGet("getTimelines/{bidId}")]

    public async Task<ActionResult<IEnumerable<ATTimelineDTO>>> getTimeline(int bidId)
    {
        var bid = await _bidRepository.GetBidByIdAsync(bidId);
        if(bid !=null)
        {
            var timelines = await _context.Timeline.Where(t => t.BidId == bidId).ToListAsync();

            var timelineToReturn = _mapper.Map<IEnumerable<ATTimelineDTO>>(timelines);

            return Ok(timelineToReturn);
        }else
        {
            return BadRequest();
        }
    }

    [HttpDelete("deleteTimeline/{timelineId}")]

    public async Task<ActionResult> deleteTimeline(int timelineId)
    {
        var timeline = await _context.Timeline.FindAsync(timelineId);
        if(timeline !=null)
        {
            _context.Timeline.Remove(timeline);
            await _context.SaveChangesAsync();
            return Ok("Deleted");
        }else
        {
            return BadRequest();
        }
    }


       [HttpGet("getBidProfBySmeId/{smeId}")]

        public  IActionResult getBidProfBySmeId(int smeId)
        {
            var query = _context.Bid
                        .Join(
                            _context.Job,
                            bid => bid.JobId,
                            job => job.Id,
                            (bid,job) => new 
                            {
                                BidId = bid.Id,
                                ProfId = bid.ProfessionalId,
                                JobId = job.Id,
                                SmeId = job.SmeId,
                                timeline = bid.Timeline
                            }
                        ).Join(
                            _context.Professionals,
                            bidProf => bidProf.ProfId,
                            prof => prof.Id,
                            (bidProf,prof)=> new {

                                BidId = bidProf.BidId,
                                JobID = bidProf.JobId,
                                SmeId = bidProf.SmeId,
                                ProfName = prof.FName ,
                                timeline = bidProf.timeline                              
                            }
                        ).Where( s => s.SmeId == smeId).ToList();

            return Ok(query);
        }



        
    }
}