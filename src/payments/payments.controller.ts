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

  @ApiOperation({
    summary: 'Create Stripe Onboarding Link for Company Account',
  })
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

  @ApiOperation({
    summary: 'create customer payment intent',
    description:
      'retorna o client secret do setup intent para o frontend criar o formulário seguro do stripe',
  })
  @ApiParam({
    name: 'customerStripeId',
    description: 'Stripe Customer ID',
  })
  @Post('create-payment-intent/:customerStripeId')
  async createCustomerPaymentIntent(
    @Param('customerStripeId') customerStripeId: string,
  ) {
    return await this.paymentService.createCustomerPaymentIntent(
      customerStripeId,
    );
  }

  @ApiOperation({
    summary: 'list all customer payments methods',
  })
  @ApiParam({
    name: 'customerStripeId',
    description: 'Stripe Customer ID',
  })
  @Get('payment-methods/:customerStripeId')
  async listCustomerPaymentMethods(
    @Param('customerStripeId') customerStripeId: string,
  ) {
    return await this.paymentService.listCustomerPaymentMethods(
      customerStripeId,
    );
  }

  @ApiOperation({
    summary: 'get stripe customer account status',
  })
  @ApiParam({
    name: 'customerStripeId',
    description: 'Stripe Customer ID',
  })
  @Get('client-status/:customerStripeId')
  async getCustumerStripeStatus(
    @Param('customerStripeId') customerStripeId: string,
  ) {
    return this.paymentService.getCustumerStripeStatus(customerStripeId);
  }

  @ApiOperation({
    summary: 'get stripe company account status',
  })
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

  @ApiOperation({
    summary: 'Handle Stripe Webhook Events',
  })
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
  @ApiOperation({
    summary: 'Delete all test Stripe accounts (Development only)',
  })
  @Get('test-accounts')
  async deleteAllTestAccounts() {
    if (process.env.NODE_ENV !== 'development') {
      throw new BadRequestException(
        'This endpoint is only available in development mode.',
      );
    }
    return this.paymentService.deleteAllTestAccounts();
  }
}
