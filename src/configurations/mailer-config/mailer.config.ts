import { MailerOptions, MailerOptionsFactory } from "@nestjs-modules/mailer";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

@Injectable()
class MailerConfigService implements MailerOptionsFactory{

  constructor(
    private readonly configService: ConfigService
  ){}

  createMailerOptions(): MailerOptions | Promise<MailerOptions> {
    return {
      transport: {
        service: this.configService.get('MAILER_SERVICE'),
        host: this.configService.get('MAILER_HOST'),
        auth: {
          user: this.configService.get('MAILER_USER'),
          pass: this.configService.get('MAILER_PASS')
        }
      }
    }
  }

}

export default MailerConfigService