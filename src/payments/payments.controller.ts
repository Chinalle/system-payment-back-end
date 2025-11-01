import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiProperty, ApiTags } from '@nestjs/swagger';
import { PaymentsService } from './payments.service';

class CreateStripeCompanyAccount {
  @ApiProperty({
    name: 'companyId',
  })
  companyId: string;
}

@ApiTags('Payments')
@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentService: PaymentsService) {}

  @ApiBody({
    required: true,
    type: CreateStripeCompanyAccount,
  })
  @Post('create-onboarding-link')
  async createStripeCompanyAccount(@Body('companyId') companyId: string) {
    return await this.paymentService.createOnboardingLink(companyId);
  }
}
