using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MimeKit;

namespace API.EmailService
{
    public class Message
    {
        public List<MailboxAddress> To { get; set; }
        public string Subject { get; set; }

        public string Content { get; set; }

        public string Content2 {get; set;}


        public Message(IEnumerable<string> to , string subject, string content, string content2)
        {
             To = new List<MailboxAddress>();
             To.AddRange(to.Select(x => new MailboxAddress(x)));
             Subject = subject;
             Content = content;
             Content2 = content2;


        }
            

        
    }
}