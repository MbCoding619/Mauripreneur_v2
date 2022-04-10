using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using API.EmailService;

namespace API.Controllers
{
    public class EmailController : BaseApiController
    {
        private readonly IEmailSender _emailSender;
        public EmailController(IEmailSender emailSender)
        {
            _emailSender = emailSender;
        }

    public EmailDTO Get()
    {
        var message = new Message(new string[]{"beebeejaun.moossa@gmail.com"}, "Test Email", "This is the content of the test email","Password");
        _emailSender.SendEmail(message);

        return new EmailDTO
        {
            EmailStatus ="Email Sent"
        };
    }
   

    }
}