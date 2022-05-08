using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MailKit.Net.Smtp;
using MailKit.Security;
using MimeKit;

namespace API.EmailService
{
    public class EmailSender : IEmailSender
    {
        private readonly EmailConfiguration _emailConfiguration;
        public EmailSender(EmailConfiguration emailConfiguration)
        {
            _emailConfiguration = emailConfiguration;
        }

        public void SendEmail(Message message)
        {
            var emailMessage = CreateEmailMessageJob(message);

            Send(emailMessage);
        }

        private MimeMessage CreateEmailMessageJob(Message message)
        {
            var emailMessage = new MimeMessage();
            emailMessage.From.Add(new MailboxAddress(_emailConfiguration.From));
            emailMessage.To.AddRange(message.To);
            emailMessage.Subject = message.Subject;
            var htmlBody = "<body margin height='0'top margin='0'margin width='0' style='margin:0px;background-color:#f2f3f8;'left margin='0'><!--100% body table--><table cell spacing='0' border='0'cell padding='0' width='100%' bgcolor='#f2f3f8' style='@importurl(https://fonts.googleapis.com/css?family=Rubik:300,400,500,700|Open+Sans:300,400,600,700);font-family:'OpenSans',sans-serif;'><tr><td><table style='background-color:#f2f3f8;max-width:670px;argin:0auto;'width='100%'border='0'align='center'cellpadding='0'cellspacing='0'><tr><td style='height:80px;'>&nbsp;</td></tr><tr><td style='text-align:center;'><a href='https://rakeshmandal.com'title='logo'target='_blank'><img width='120px;height:80px;' src='https://res.cloudinary.com/mauripreneur/image/upload/v1649634583/mauri_bleu_zfvna2.png' title='logo'alt='logo'></a></td></tr><tr><td style='height:20px;'>&nbsp;</td></tr><tr><td><table width='95%'border='0'align='center'cellpadding='0'cellspacing='0'style='max-width:670px;background:#fff;border-radius:3px;text-align:center;-webkit-box-shadow:06px18px0rgba(0,0,0,.06);-moz-box-shadow:06px18px0rgba(0,0,0,.06);box-shadow:06px18px0rgba(0,0,0,.06);'><tr><td style='height:40px;'>&nbsp;</td></tr><tr><td style='padding:035px;'><h1 style='color:#1e1e2d;font-weight:500;margin:0;font-size:32px;font-family:'Rubik',sans-serif;'>Job posted Status</h1><p style='font-size:15px;color:#455056;margin:8px00;line-height:24px;'>The Job you posted on www.mauripreneur.com has been reviewed as follows:</strong>.</p><span style='display:inline-block;vertical-align:middle;margin:29px026px;order-bottom:1pxsolid#cecece;width:100px;'></span><p style='color:#455056;font-size:18px;line-height:20px;margin:0;font-weight:500;'><strong style='display:block;font-size:13px;margin:004px;color:rgba(0,0,0,.64);font-weight:normal;'>Job Title</strong>{0}<strong style='display:block;font-size:13px;margin:24px 04px 0;font-weight:normal;color:rgba(0,0,0,.64);'>Status</strong>{1}</p><a href='https://localhost:4200/' style='background:#20e277;text-decoration:none!important;display:inline-block;font-weight:500;margin-top:24px;color:#fff;text-transform:uppercase;font-size:14px;padding:10px24px;display:inline-block;border-radius:50px;'>Login to your Account</a></td></tr><tr><td style='height:40px;'>&nbsp;</td></tr></table></td></tr><tr><td style='height:20px;'>&nbsp;</td></tr><tr><td style='text-align:center;'><p style='font-size:14px;color:rgba(69,80,86,0.7411764705882353);line-height:18px;margin:000;'>&copy;<strong>www.mauripreneur.com</strong></p></td></tr><tr><t d style='height:80px;'>&nbsp;</td></tr></table></td></tr></table></body>";
            emailMessage.Body = new TextPart(MimeKit.Text.TextFormat.Html){Text = string.Format(htmlBody,message.Content,message.Content2)}; 

            return emailMessage;

        }

        private void Send(MimeMessage mailMessage)
        {
            using (var client = new SmtpClient())
            {
                try
                {
                    client.ServerCertificateValidationCallback = (s,c,h,e) => true;
                    client.Connect(_emailConfiguration.SmtpServer,_emailConfiguration.Port,SecureSocketOptions.Auto);
                    client.AuthenticationMechanisms.Remove("XOAUTH2");
                    client.Authenticate(_emailConfiguration.UserName,_emailConfiguration.Password);

                    client.Send(mailMessage);
                }
                catch
                {
                    throw;
                }
                finally
                {
                    client.Disconnect(true);
                    client.Dispose();

                }
            }
        }

    }
}