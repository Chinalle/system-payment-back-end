import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendTestEmail(to: string) {
    await this.mailerService.sendMail({
      to,
      subject: 'Teste Gmail',
      text: 'E-mail está funcionando ✅',
    });
  }

  async sendConfirmation(
    to: string,
    subject: string,
    name: string,
    actionUrl: string,
    isClient: boolean,
  ) {
    await this.mailerService.sendMail({
      to,
      subject,
      template: isClient
        ? 'client-confirmation'
        : 'service-provider-confirmation',
      context: {
        name: name,
        action_url: actionUrl,
      },
    });
  }
}
