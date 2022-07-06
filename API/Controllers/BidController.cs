using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.DTOs;
using API.DTOs.AutoDTO;
using API.DTOs.UpdateDTO;
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
        public BidController(DataContext context, IMapper mapper, IBidRepository bidRepository)
        {
            _context = context;
            _mapper = mapper;
            _bidRepository = bidRepository;

        }


        [HttpPost("showInterest")]

        public async Task<ActionResult<BidReponseDTO>> addBid(BidAddDTO bidAddDTO)
        {
            var user = await _context.Users.SingleOrDefaultAsync(b => b.UserName == bidAddDTO.username.ToLower());
            var bid = new Bid();

            if (user != null)
            {
                var prof = await _context.Professionals.SingleOrDefaultAsync(p => p.AppUserId == user.AppUserId);


                var bidCheck = await _context.Bid.FirstOrDefaultAsync(b => b.JobId == bidAddDTO.JobId && b.ProfessionalId == prof.Id);

                if (bidCheck == null)
                {
                    bid = new Bid
                    {

                        JobId = bidAddDTO.JobId,
                        ProfessionalId = prof.Id,
                        BidResponse = "INTERESTED",

                    };

                    _context.Bid.Add(bid);

                }
                else
                {
                    return BadRequest("Already Bid for the job");
                }


            }
            else
            {

                return BadRequest("Error Happened");
            }

            await _context.SaveChangesAsync();

            return new BidReponseDTO
            {
                Status = "Added"
            };

        }

        [HttpPut("addBidDetails")]
        public async Task<ActionResult<BidReponseDTO>> addBidDetails(BidAddDTO bidAddDTO)
        {
            var bid = await _bidRepository.GetBidByIdAsync(bidAddDTO.BidId);
            if(bid !=null)
            {
                bid.BidAmount = bidAddDTO.BidAmount;
                bid.Description = bidAddDTO.Description;
                bid.OtherDetails = bidAddDTO.OtherDetails;
                 _bidRepository.Update(bid);
                 return new BidReponseDTO
                 {
                    Status ="Details Added"
                 };
            }else
            {
                return BadRequest();
            }


        }

        [HttpGet("bidCheck/{jobId}/{username}")]
        public async Task<ActionResult<ActionStatusDTO>> bidCheck(int jobId, string username)
        {
            var user = await _context.Users.SingleOrDefaultAsync(u => u.UserName == username.ToLower());
            var prof = await _context.Professionals.SingleOrDefaultAsync(p => p.AppUserId == user.AppUserId);
            var bidCheck = await _context.Bid.FirstOrDefaultAsync(b => b.JobId == jobId && b.ProfessionalId == prof.Id);
            if (bidCheck == null)
            {
                return new ActionStatusDTO
                {
                    status = "Not"
                };
            }
            else
            {
                return new ActionStatusDTO
                {
                    status = "Bidded"
                };
            }
        }

        [HttpGet("byJidPid/{bidId}/{ProfId}")]

        public async Task<ActionResult<Bid>> getByJidPid(int bidId, int ProfId)
        {

            return await _bidRepository.GetBidByJobIdProfId(bidId, ProfId);
        }

        [HttpDelete("deleteBid/{bidId}")]

        public async Task<ActionResult> deleteBidById(int bidId)
        {
            var bid = await _bidRepository.GetBidByIdAsync(bidId);

            if (bid != null)
            {
                _bidRepository.Delete(bid);
                return Ok();
            }
            else
            {
                return BadRequest("Something Went Wrong");
            }
        }





        [HttpPut("acceptBid")]

        public async Task<ActionResult<ActionStatusDTO>> acceptBid(BidAcceptDTO bidAcceptDTO)
        {
            var user = await _context.Users.SingleOrDefaultAsync(u => u.UserName == bidAcceptDTO.username.ToLower());
            var bid = await _bidRepository.GetBidByIdAsync(bidAcceptDTO.bidId);
            var sme = await _context.Sme.SingleOrDefaultAsync(s => s.AppUserId == user.AppUserId);
            if (user != null )
            {
                if(bid.BidResponse !="INTERESTED")
                {
                    return new ActionStatusDTO{
                        status = "Already Accepted/Declined bid"
                    };
                }else
                {

                bid.BidResponse = "Accepted";
                bid.SmeId = sme.Id;
                _bidRepository.Update(bid);

                var bidlist = await _context.Bid.Where(bd => bd.JobId == bid.JobId && bd.BidResponse != "Accepted" ).ToListAsync();
                foreach(Bid bids in bidlist)
                {
                    bids.BidResponse = "DECLINED";
                    _bidRepository.Update(bids);
                }

                return new ActionStatusDTO{
                    status ="Bid Accepted"
                };
                }

            }
            else
            {

                return BadRequest("Something Went Wrong");
            }
        }

        [HttpPut("declineBid")]

        public async Task<ActionResult> declineBid(BidAcceptDTO bidAcceptDTO)
        {
            var user = await _context.Users.SingleOrDefaultAsync(u => u.UserName == bidAcceptDTO.username.ToLower());
            var bid = await _bidRepository.GetBidByIdAsync(bidAcceptDTO.bidId);
            var sme = await _context.Sme.SingleOrDefaultAsync(s => s.AppUserId == user.AppUserId);
            if (user != null )
            {
                if(bid.BidResponse !="INTERESTED")
                {
                    return Ok("Already Approve/Decline bid");
                }else
                {

                bid.BidResponse = "DECLINED";
                bid.SmeId = sme.Id;
                _bidRepository.Update(bid);
             

                return Ok("Bid Accepted");
                }

            }
            else
            {

                return BadRequest("Something Went Wrong");
            }
        }

        [HttpGet("{username}")]

        public async Task<ActionResult> queryBid(string username)
        {
            var user = await _context.Users.SingleOrDefaultAsync(u => u.UserName == username);
            var sme = await _context.Sme.SingleOrDefaultAsync(s => s.AppUserId == user.AppUserId);

            var bidToReturn = (from bd in _context.Bid
                               join jb in _context.Job on bd.JobId equals jb.Id
                               join pr in _context.Professionals on bd.ProfessionalId equals pr.Id
                               join sm in _context.Sme on jb.SmeId equals sm.Id
                               where sm.Id == sme.Id
                               select new
                               {
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
            var sme = await _context.Sme.SingleOrDefaultAsync(s => s.AppUserId == user.AppUserId);

            var bidToReturn = (from bd in _context.Bid
                               join jb in _context.Job on bd.JobId equals jb.Id
                               join pr in _context.Professionals on bd.ProfessionalId equals pr.Id
                               join sm in _context.Sme on jb.SmeId equals sm.Id
                               where (sm.Id == sme.Id && bd.BidResponse == "Accepted")
                               select new
                               {
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
            var prof = await _context.Professionals.SingleOrDefaultAsync(s => s.AppUserId == user.AppUserId);

            var bidToReturn = (from bd in _context.Bid
                               join jb in _context.Job on bd.JobId equals jb.Id
                               join pr in _context.Professionals on bd.ProfessionalId equals pr.Id
                               join sm in _context.Sme on jb.SmeId equals sm.Id
                               join us in _context.Users on sm.AppUserId equals us.AppUserId
                               where (pr.Id == prof.Id)
                               select new
                               {
                                   BidId = bd.Id,
                                   BidAmount = bd.BidAmount,
                                   description = bd.Description,
                                   otherDetails = bd.OtherDetails,
                                   JobId = jb.Id,
                                   JobTitle = jb.JobTitle,
                                   JobDescription = jb.Desc,
                                   Budget = jb.Budget,
                                   Name = sm.RepresentName,
                                   lName = sm.RepresentLName,
                                   phone = sm.RepresentPhone,
                                   compName = sm.CompName,
                                   social = sm.SocialLink,
                                   imagePath = us.imagePath

                               });


            return Ok(bidToReturn);

        }

        [HttpGet("getBidSent/{username}/{bidStatus}")]
        public async Task<ActionResult> queryBidSentByStatus(string username,string bidStatus)
        {
            var user = await _context.Users.SingleOrDefaultAsync(u => u.UserName == username);
            var prof = await _context.Professionals.SingleOrDefaultAsync(s => s.AppUserId == user.AppUserId);

            var bidToReturn = (from bd in _context.Bid
                               join jb in _context.Job on bd.JobId equals jb.Id
                               join pr in _context.Professionals on bd.ProfessionalId equals pr.Id
                               join sm in _context.Sme on jb.SmeId equals sm.Id
                               join us in _context.Users on sm.AppUserId equals us.AppUserId
                               where (pr.Id == prof.Id && bd.BidResponse == bidStatus)
                               select new
                               {
                                   BidId = bd.Id,
                                   BidAmount = bd.BidAmount,
                                   description = bd.Description,
                                   otherDetails = bd.OtherDetails,
                                   JobId = jb.Id,
                                   JobTitle = jb.JobTitle,
                                   JobDescription = jb.Desc,
                                   Budget = jb.Budget,
                                   Name = sm.RepresentName,
                                   lName = sm.RepresentLName,
                                   phone = sm.RepresentPhone,
                                   compName = sm.CompName,
                                   social = sm.SocialLink,
                                   imagePath = us.imagePath

                               });


            return Ok(bidToReturn);

        }


        [HttpPut("addBidNotes")]

        public async Task<ActionResult<ActionStatusDTO>> addBidNotes(AddNotesDTO addNotesDTO)
        {
            var bid = await _bidRepository.GetBidByIdAsync(addNotesDTO.Id);

            if (bid != null)
            {

                _mapper.Map(addNotesDTO, bid);
                _bidRepository.Update(bid);

                return new ActionStatusDTO
                {
                    status = "bidNotesAdded"
                };
            }
            else
            {
                return BadRequest("Something went wrong");
            }
        }



        [HttpPut("addBidScore")]

        public async Task<ActionResult<ActionStatusDTO>> addBidScore(BidScoreDTO bidScoreDTO)
        {
            var bid = await _bidRepository.GetBidByIdAsync(bidScoreDTO.bidId);
            if (bid != null)
            {
                bid.bidScore = bidScoreDTO.bidScore;
                _bidRepository.Update(bid);

                return new ActionStatusDTO
                {
                    status = "bidScoreAdded"
                };
            }
            else
            {
                return BadRequest();
            }
        }

        [HttpPost("addTimelines")]

        public async Task<ActionResult<ReponseDTO>> addTimeline(TimelineAddDTO timelineAddDTO)
        {
            var bid = await _bidRepository.GetBidByIdAsync(timelineAddDTO.BidId);

            if (bid != null)
            {
                var timeline = new Timeline
                {
                    Title = timelineAddDTO.Title,
                    Description = timelineAddDTO.Description,
                    Date = timelineAddDTO.Date,
                    BidId = timelineAddDTO.BidId
                };
                _context.Timeline.Add(timeline);
                await _context.SaveChangesAsync();

                return new ReponseDTO
                {
                    Response = "Timeline Added"
                };
            }
            else
            {
                return BadRequest();
            }
        }


        [HttpGet("getTimelines/{bidId}")]

        public async Task<ActionResult<IEnumerable<ATTimelineDTO>>> getTimeline(int bidId)
        {
            var bid = await _bidRepository.GetBidByIdAsync(bidId);
            if (bid != null)
            {
                var timelines = await _context.Timeline.Where(t => t.BidId == bidId).ToListAsync();

                var timelineToReturn = _mapper.Map<IEnumerable<ATTimelineDTO>>(timelines);

                return Ok(timelineToReturn);
            }
            else
            {
                return BadRequest();
            }
        }

        [HttpGet("getTimelineById/{timelineId}")]

        public async Task<ActionResult<ATTimelineDTO>> getTimelineById(int timelineId)
        {
            var timeline = await _context.Timeline.FindAsync(timelineId);
            if (timeline != null)
            {
                var timelineToReturn = _mapper.Map<ATTimelineDTO>(timeline);
                return Ok(timelineToReturn);
            }
            else
            {
                return BadRequest();
            }
        }


        [HttpPut("updateTimeline")]

        public async Task<ActionResult> updateTimeline(TimelineUpdateDTO timelineUpdateDTO)
        {
            var timeline = await _context.Timeline.FindAsync(timelineUpdateDTO.TimelineId);
            if (timeline != null)
            {
                _mapper.Map(timelineUpdateDTO, timeline);
                _context.Entry(timeline).State = EntityState.Modified;
                await _context.SaveChangesAsync();
                return Ok();
            }
            else
            {
                return BadRequest();
            }
        }

        [HttpDelete("deleteTimeline/{timelineId}")]

        public async Task<ActionResult> deleteTimeline(int timelineId)
        {
            var timeline = await _context.Timeline.FindAsync(timelineId);
            if (timeline != null)
            {
                _context.Timeline.Remove(timeline);
                await _context.SaveChangesAsync();
                return Ok();
            }
            else
            {
                return BadRequest();
            }
        }


        [HttpGet("getBidProfByJobId/{jobId}/{bidResponse}")]

        public IActionResult getBidProfBySmeId(int jobId, string bidResponse)
        {
            var query = _context.Bid
            .Join(
                _context.Job,
                bid => bid.JobId,
                job => job.Id,
                (bid, job) => new
                {
                    BidId = bid.Id,
                    BidAmount = bid.BidAmount,
                    BidDesc = bid.Description,
                    BidResponse = bid.BidResponse,
                    BidDate = bid.BidDate,
                    BidOtherDetails = bid.OtherDetails,
                    BidNotes = bid.bidNotes,
                    BidScore = bid.bidScore,
                    ProfId = bid.ProfessionalId,
                    JobId = job.Id,
                    JobTitle = job.JobTitle,
                    JobDescription = job.Desc,
                    SmeId = job.SmeId,
                    timeline = bid.Timeline,

                }
            ).Join(
                _context.Professionals,
                bid => bid.ProfId,
                prof => prof.Id,
                (bid, prof) => new
                {

                    BidId = bid.BidId,
                    BidAmount = bid.BidAmount,
                    BidDesc = bid.BidDesc,
                    BidResponse = bid.BidResponse,
                    BidDate = bid.BidDate,
                    BidOtherDetails = bid.BidOtherDetails,
                    BidNotes = bid.BidNotes,
                    BidScore = bid.BidScore,
                    ProfId = bid.ProfId,
                    JobId = bid.JobId,
                    JobTitle = bid.JobTitle,
                    JobDescription = bid.JobDescription,
                    SmeId = bid.SmeId,
                    timeline = bid.timeline,
                    ProfName = prof.FName,
                    ProfDesc = prof.BriefDesc,
                    ProfAppId = prof.AppUserId

                }
            ).Join(
                _context.Users,
                bid => bid.ProfAppId,
                appUser => appUser.AppUserId,
                (bid, appUser) => new
                {

                    BidId = bid.BidId,
                    BidAmount = bid.BidAmount,
                    BidDesc = bid.BidDesc,
                    BidResponse = bid.BidResponse,
                    BidDate = bid.BidDate,
                    BidOtherDetails = bid.BidOtherDetails,
                    BidNotes = bid.BidNotes,
                    BidScore = bid.BidScore,
                    ProfId = bid.ProfId,
                    JobId = bid.JobId,
                    JobTitle = bid.JobTitle,
                    JobDescription = bid.JobDescription,
                    SmeId = bid.SmeId,
                    timeline = bid.timeline,
                    ProfName = bid.ProfName,
                    ProfDesc = bid.ProfDesc,
                    ProfAppId = bid.ProfAppId,
                                //Below is implemented to get the ImagePath
                                //This Branch does not have the image Functionality
                                //implemented.
                    ProfPic = appUser.imagePath

                }
            )
            .Where(jb => jb.JobId == jobId)
            .Where(bd => bd.BidResponse == bidResponse)
            .ToList();

            return Ok(query);
        }

        [HttpGet("getBidProfByJobId/{jobId}")]

        public IActionResult getBidProfByJobId(int jobId)
        {
            var query = _context.Bid
            .Join(
                _context.Job,
                bid => bid.JobId,
                job => job.Id,
                (bid, job) => new
                {
                    BidId = bid.Id,
                    BidAmount = bid.BidAmount,
                    BidDesc = bid.Description,
                    BidResponse = bid.BidResponse,
                    BidDate = bid.BidDate,
                    BidOtherDetails = bid.OtherDetails,
                    BidNotes = bid.bidNotes,
                    BidScore = bid.bidScore,
                    ProfId = bid.ProfessionalId,
                    JobId = job.Id,
                    JobTitle = job.JobTitle,
                    JobDescription = job.Desc,
                    SmeId = job.SmeId,
                    timeline = bid.Timeline,

                }
            ).Join(
                _context.Professionals,
                bid => bid.ProfId,
                prof => prof.Id,
                (bid, prof) => new
                {

                    BidId = bid.BidId,
                    BidAmount = bid.BidAmount,
                    BidDesc = bid.BidDesc,
                    BidResponse = bid.BidResponse,
                    BidDate = bid.BidDate,
                    BidOtherDetails = bid.BidOtherDetails,
                    BidNotes = bid.BidNotes,
                    BidScore = bid.BidScore,
                    ProfId = bid.ProfId,
                    JobId = bid.JobId,
                    JobTitle = bid.JobTitle,
                    JobDescription = bid.JobDescription,
                    SmeId = bid.SmeId,
                    timeline = bid.timeline,
                    ProfName = prof.FName,
                    ProfDesc = prof.BriefDesc,
                    ProfAppId = prof.AppUserId

                }
            ).Join(
                _context.Users,
                bid => bid.ProfAppId,
                appUser => appUser.AppUserId,
                (bid, appUser) => new
                {

                    BidId = bid.BidId,
                    BidAmount = bid.BidAmount,
                    BidDesc = bid.BidDesc,
                    BidResponse = bid.BidResponse,
                    BidDate = bid.BidDate,
                    BidOtherDetails = bid.BidOtherDetails,
                    BidNotes = bid.BidNotes,
                    BidScore = bid.BidScore,
                    ProfId = bid.ProfId,
                    JobId = bid.JobId,
                    JobTitle = bid.JobTitle,
                    JobDescription = bid.JobDescription,
                    SmeId = bid.SmeId,
                    timeline = bid.timeline,
                    ProfName = bid.ProfName,
                    ProfDesc = bid.ProfDesc,
                    ProfAppId = bid.ProfAppId,
                                //Below is implemented to get the ImagePath
                                //This Branch does not have the image Functionality
                                //implemented.
                    ProfPic = appUser.imagePath

                }
            )
            .Where(jb => jb.JobId == jobId)            
            .ToList();

            return Ok(query);
        }

        [HttpGet("getJobBidProfMeetBySmeId/{jobId}/{bidResponse}")]

        public IActionResult getJobBidProfMeetBySmeId(int jobId, string bidResponse)
        {
            var query = _context.Job
                        .Join(
                            _context.Bid,
                            job => job.Id,
                            bid => bid.JobId,
                            (job, bid) => new
                            {
                                JobId = job.Id,
                                JobTitle = job.JobTitle,
                                JobDescription = job.Desc,
                                BidId = bid.Id,
                                BidAmount = bid.BidAmount,
                                BidDesc = bid.Description,
                                BidResponse = bid.BidResponse,
                                BidDate = bid.BidDate,
                                BidOtherDetails = bid.OtherDetails,
                                ProfId = bid.ProfessionalId,
                                SmeId = job.SmeId,
                                timeline = bid.Timeline
                            }
                        ).Join(
                            _context.Professionals,
                            bid => bid.ProfId,
                            prof => prof.Id,
                            (bid, prof) => new
                            {
                                JobId = bid.JobId,
                                JobTitle = bid.JobTitle,
                                JobDescription = bid.JobDescription,
                                BidId = bid.BidId,
                                BidAmount = bid.BidAmount,
                                BidDesc = bid.BidDesc,
                                BidResponse = bid.BidResponse,
                                BidDate = bid.BidDate,
                                BidOtherDetails = bid.BidOtherDetails,
                                ProfId = bid.ProfId,
                                SmeId = bid.SmeId,
                                timeline = bid.timeline,
                                ProfFName = prof.FName,
                                ProfLName = prof.LName,
                                ProfSocials = prof.LinkedInLink,
                                ProfAppId = prof.AppUserId
                            }
                        ).Join(
                            _context.Users,
                            prof => prof.ProfAppId,
                            appUser => appUser.AppUserId,
                            (prof, appUser) => new
                            {
                                JobId = prof.JobId,
                                JobTitle = prof.JobTitle,
                                JobDescription = prof.JobDescription,
                                BidId = prof.BidId,
                                BidAmount = prof.BidAmount,
                                BidDesc = prof.BidDesc,
                                BidResponse = prof.BidResponse,
                                BidDate = prof.BidDate,
                                BidOtherDetails = prof.BidOtherDetails,
                                ProfId = prof.ProfId,
                                SmeId = prof.SmeId,
                                timeline = prof.timeline,
                                ProfFName = prof.ProfFName,
                                ProfLName = prof.ProfLName,
                                ProfSocials = prof.ProfSocials,
                                ProfAppId = prof.ProfAppId,
                                ProfPic = appUser.imagePath
                            }
                        ).Where(jb => jb.JobId == jobId).Where(bd => bd.BidResponse == bidResponse).ToList();


            return Ok(query);
        }




    }
}