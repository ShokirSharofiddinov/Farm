import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { Admin } from '../admin/schemas/admin.schema';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendAdminConfirmation(admin: Admin): Promise<void> {
    console.log(admin)
    const url = `${process.env.API_HOST}/api/admin/activate/${admin.active_link}`;
    console.log(url);

    await this.mailerService.sendMail({
      to: admin.email,
      subject: 'Welcom to fermer service! Confirm your Email',
      template: './confirmation',
      context: {
        name: admin.email,
        url,
      },
    });
  }
}
