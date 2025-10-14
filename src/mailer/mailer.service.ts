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
    try {
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
    } catch (error) {
      throw new Error(String(error));
    }
  }

  async sendPasswordResetToken(to: string, name: string, actionUrl: string) {
    try {
      await this.mailerService.sendMail({
        to,
        subject: 'Troca de senha',
        template: 'password-reset',
        context: {
          name: name,
          action_url: actionUrl,
        },
      });
    } catch (error) {
      throw new Error(String(error));
    }
  }
}
