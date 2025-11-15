import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  Param,
  ParseUUIDPipe,
  Post,
  Req,
} from '@nestjs/common';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiProperty,
  ApiTags,
} from '@nestjs/swagger';
import type { Request } from 'express';
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

  @ApiParam({
    name: 'managerId',
    description: 'To setup company payments user must be a manager',
  })
  @ApiBody({
    required: true,
    type: CreateStripeCompanyAccount,
  })
  @Post('create-onboarding-link/:managerId')
  async createStripeCompanyAccount(
    @Param('managerId', ParseUUIDPipe) managerId: string,
    @Body('companyId') companyId: string,
  ) {
    console.log(managerId, companyId);
    return await this.paymentService.createOnboardingLink(managerId, companyId);
  }

  @ApiOperation({
    summary: 'delete customer stripe account',
  })
  @Delete('client/:userId')
  async deleteCustomerStripeAccount(@Param('userId') userId: string) {
    return this.paymentService.deleteCustomerStripeAccount(userId);
  }

  @ApiOperation({
    summary: 'create customer stripe account',
  })
  @Post('client/:userId')
  async createStripeClientAccount(
    @Param('userId', ParseUUIDPipe) userId: string,
  ) {
    return await this.paymentService.createClientAccountLink(userId);
  }

  @ApiProperty({
    description: 'return status of stripe company account',
  })
  @Get('status/:companyId')
  async getStripeStatusAccount(
    @Param('companyId', ParseUUIDPipe) companyId: string,
  ) {
    console.log(`Requesting /status/${companyId}`);
    return this.paymentService.getStripeStatusAccount(companyId);
  }

  @Post('webhook')
  async handleStripeWebhook(
    @Headers('stripe-signature') signature: string,
    @Req() request: Request,
  ) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
    const rawBody: Buffer = await (request as any).rawBody;

    if (!rawBody) {
      throw new BadRequestException('');
    }
    return this.paymentService.handleWebhookEvent(signature, rawBody);
  }

  /** Para desenvolvimento */
  @Get('test-accounts')
  async deleteAllTestAccounts() {
    return this.paymentService.deleteAllTestAccounts();
  }
}
