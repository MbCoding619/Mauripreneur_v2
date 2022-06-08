using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.Helpers;
using API.Interfaces;
using API.Services;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace API.Extensions
{
    //when creating an extension class the method should be static
    public static class ApplicationsServiceExtensions
    {
        public static IServiceCollection AddApplicationServices(this IServiceCollection services, IConfiguration config)
        {   

            services.Configure<CloudinarySettings>(config.GetSection("CloudinarySettings"));
            //Services for the Token
            services.AddScoped<ITokenService, TokenService>();
            services.AddScoped<IPhotoService,PhotoService>();
            services.AddScoped<IUserRepository,UserRepository>();
            services.AddScoped<IJobRepository, JobRepository>();
            services.AddScoped<IBidRepository,BidRepository>();
            services.AddScoped<ISmeRepository,SmeRepository>();
            services.AddScoped<IProfRepository,ProfRepository>();
            services.AddScoped<IFieldRepository,FieldRepository>();
            services.AddScoped<IMeetingRepository,MeetingRepository>();
            services.AddScoped<ISubFieldRepository,SubFieldRepository>();
            services.AddScoped<ISkillsRepository,SkillsRepository>();
            services.AddScoped<IQualRepository,QualiRepository>();
            services.AddScoped<IExperienceRepository,ExperienceRepository>();
           

            
            //Iinitialising the dependency of Automapper in the App Service class
            services.AddAutoMapper(typeof(AutoMapperProfiles).Assembly);
                //See below format and understand.
            services.AddDbContext<DataContext>(options =>
            {
                options.UseSqlite(config.GetConnectionString("DefaultConnection"));

            });

            return services;
        }
    }
}