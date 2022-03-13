using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using API.Data;
using API.DTOs;
using API.Entities;
using API.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class AccountController : BaseApiController
    {
        private readonly DataContext _context;
        private readonly ITokenService _tokenService;
        public AccountController(DataContext context , ITokenService tokenService  )
        {
            _tokenService = tokenService;
            _context = context;
        }

        [HttpPost("register")]
        public async Task<ActionResult<UserDTO>> Register(RegisterDTO registerDto)
        {
            if(await UserExists(registerDto.Username))
            {
                //This will result a bad request status 400
                return BadRequest("Username is Taken");
            }

            // Using means when we finish a specific class it will dispose of it
            // As the HMAC class using an IDispose interface. 'Using' ensures that
            using var hmac = new HMACSHA512();
            
            var user = new AppUser
            {
                UserName = registerDto.Username.ToLower(),
                PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(registerDto.Password)),
                PasswordSalt = hmac.Key
            };
                //The below code track the entity using the ORM(Entity Framework) and add the given data but does not save it in the table
            _context.Users.Add(user);
            //This part call the database and saves it to the User table
            await _context.SaveChangesAsync();

             return new UserDTO
             {
                 Username = user.UserName,
                 Token = _tokenService.CreateToken(user),
                  AppUserRole = user.AppUserRole
             };   
        }
        

        [HttpPost("login")]

        public async Task<ActionResult<UserDTO>> Login(LoginDTO loginDto)
        {

            var user = await _context.Users.SingleOrDefaultAsync(x => x.UserName == loginDto.Username.ToLower());

            if(user == null)
            {
                return Unauthorized("Invalid Username");
            }

            using var hmac = new HMACSHA512(user.PasswordSalt);
            var computedHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(loginDto.Password));

            for(int i =0;i< computedHash.Length;i++)
            {
                if(computedHash[i] != user.PasswordHash[i]) return Unauthorized("Invalid Password");
            }
             return new UserDTO
             {
                 Username = user.UserName,
                 Token = _tokenService.CreateToken(user),
                 AppUserRole = user.AppUserRole
             };
            
        }

        private async Task<bool>UserExists(string username)
        {
            // Returning an await
            //AnyAsync needs another library ->Microsoft.EntityFrameworkCore;
            //Use lambda expression to compare UserName to parameter username
            return await _context.Users.AnyAsync(x => x.UserName == username.ToLower());
        }

                


         [HttpPost("registerSme")]

           public async Task<ActionResult<SmeDTO>> RegisterSme(RegisterSmeDTO registerSmeDto)
        {
            var user = await _context.Users.SingleOrDefaultAsync(b => b.UserName == registerSmeDto.Username.ToLower());

            if(await UserExists(registerSmeDto.Username))
            {

            user.AppUserRole ="SME";
        
                        
            var sme = new Sme
            {
                
                CompName = registerSmeDto.CompName,
                Address = registerSmeDto.Address,
                Email = registerSmeDto.Email,
                RepresentName = registerSmeDto.RepresentName,
                RepresentLName = registerSmeDto.RepresentLName,
                RepresentPhone = registerSmeDto.RepresentPhone,
                AppUserId = user.AppUserId
                               
                
            };

              //The below code track the entity using the ORM(Entity Framework) and add the given data but does not save it in the table
            _context.Sme.Add(sme);
               
            }else{

                //This will result a bad request status 400
                return BadRequest("Username is Taken or Not Found");
            }

          
              
            //This part call the database and saves it to the User table
            await _context.SaveChangesAsync();

            // Need to add condition where if User doesn't exist or Taken return Null in SMEDTO
            return new SmeDTO{

                AppUserId = user.AppUserId
            };
                         
        }

        [HttpPost("registerProf")]

           public async Task<ActionResult<ProfessionalDTO>> RegisterProf(RegisterProfDTO registerProfDTO)
        {
            var user = await _context.Users.SingleOrDefaultAsync(b => b.UserName == registerProfDTO.Username.ToLower());

            if(await UserExists(registerProfDTO.Username))
            {
             user.AppUserRole ="PROFESSIONAL";

            var professional = new Professional
            {
                FName = registerProfDTO.FName,
                LName = registerProfDTO.LName,
                IDNum = registerProfDTO.IDNum,
                Address = registerProfDTO.Address,
                Phone = registerProfDTO.Phone,
                Email = registerProfDTO.Email,
                Qual1 = registerProfDTO.Qual1,
                Qual2 = registerProfDTO.Qual2,
                Qual3 = registerProfDTO.Qual3,
                QualOther = registerProfDTO.QualOther,
                BriefDesc = registerProfDTO.BriefDesc,
                Portfolio = registerProfDTO.Portfolio,
                EmploymentStatus = registerProfDTO.EmploymentStatus,
                FieldId = registerProfDTO.FieldId,
                AppUserId = user.AppUserId

            };

              //The below code track the entity using the ORM(Entity Framework) and add the given data but does not save it in the table
            _context.Professionals.Add(professional);
               
            }else{

                //This will result a bad request status 400
                return BadRequest("Username is Taken or Not Found");
            }

          
              
            //This part call the database and saves it to the User table
            await _context.SaveChangesAsync();

            // Need to add condition where if User doesn't exist or Taken return Null in SMEDTO
            return new ProfessionalDTO{

                AppUserId = user.AppUserId
            };
                         
        }

         [HttpPost("registerStud")]

           public async Task<ActionResult<StudentDTO>> RegisterStud(RegisterStudDTO registerStudDTO)
        {
            var user = await _context.Users.SingleOrDefaultAsync(b => b.UserName == registerStudDTO.Username.ToLower());

            if(await UserExists(registerStudDTO.Username))
            {

            user.AppUserRole ="STUDENT";       
                        
            var student = new Student
            {
                FName = registerStudDTO.FName,
                LName = registerStudDTO.LName,
                Phone = registerStudDTO.Phone,
                Address = registerStudDTO.Address,
                email = registerStudDTO.email,
                Uni = registerStudDTO.Uni,
                Course = registerStudDTO.Course,
                Course_level = registerStudDTO.Course_level,
                Course_startDate = registerStudDTO.Course_startDate,
                Course_endDate = registerStudDTO.Course_endDate,
                briefDescription = registerStudDTO.briefDescription,
                FieldId = registerStudDTO.FieldId,
                AppUserId = user.AppUserId
            };

              //The below code track the entity using the ORM(Entity Framework) and add the given data but does not save it in the table
            _context.Students.Add(student);
               
            }else{

                //This will result a bad request status 400
                return BadRequest("Username is Taken or Not Found");
            }

          
              
            //This part call the database and saves it to the User table
            await _context.SaveChangesAsync();

            // Need to add condition where if User doesn't exist or Taken return Null in SMEDTO
            return new StudentDTO{

                AppUserId = user.AppUserId
            };
                         
        }


        
        [HttpPost("registerOrg")]

           public async Task<ActionResult<OrganizationDTO>> RegisterOrg(RegisterOrgDTO registerOrgDTO)
        {
            var user = await _context.Users.SingleOrDefaultAsync(b => b.UserName == registerOrgDTO.Username.ToLower());

            if(await UserExists(registerOrgDTO.Username))
            {
                
            user.AppUserRole ="ORGANIZATION";

            var organization = new Organization
            {
                OrgName = registerOrgDTO.OrgName,
                Address = registerOrgDTO.Address,
                Email = registerOrgDTO.Email,
                Phone = registerOrgDTO.Phone,
                OrgRepresent_FName = registerOrgDTO.OrgRepresent_FName,
                OrgRepresent_LName = registerOrgDTO.OrgRepresent_LName,
                AppUserId = user.AppUserId

            };

              //The below code track the entity using the ORM(Entity Framework) and add the given data but does not save it in the table
            _context.Organizations.Add(organization);
               
            }else{

                //This will result a bad request status 400
                return BadRequest("Username is Taken or Not Found");
            }

          
              
            //This part call the database and saves it to the User table
            await _context.SaveChangesAsync();

            // Need to add condition where if User doesn't exist or Taken return Null in SMEDTO
            return new OrganizationDTO{

                AppUserId = user.AppUserId
            };
                         
        }

        

    }
}