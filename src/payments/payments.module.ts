import { Module } from '@nestjs/common';
import { CompanyModule } from 'src/companies/company.module';
import { UserModule } from 'src/users/user.module';
import { PaymentsController } from './payments.controller';
import { PaymentsService } from './payments.service';
import { StripeModule } from './stripe.module';

@Module({
  imports: [CompanyModule, UserModule, StripeModule],
  exports: [PaymentsService],
  controllers: [PaymentsController],
  providers: [PaymentsService],
})
export class PaymentsModule {}
