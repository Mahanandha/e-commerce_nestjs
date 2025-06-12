// mailer.controller.ts
import { Controller, Post, Body } from '@nestjs/common';
import { MailerService } from './mailer.service';
import { SendMailDto } from './dto/send-mail.dto';

@Controller('mail')
export class MailerController {
  constructor(private readonly mailerService: MailerService) {}

  @Post('send')
  async sendEmail(@Body() body: SendMailDto) {
    return this.mailerService.sendMailWithAttachments(
      body.to,
      body.subject,
      body.html,
      body.attachments || [],
    );
  }
}
