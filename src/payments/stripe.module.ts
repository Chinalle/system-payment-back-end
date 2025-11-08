import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Stripe from 'stripe';

const stripeProvider = {
  provide: 'STRIPE_CLIENT',
  inject: [ConfigService],
  useFactory: (configService: ConfigService) => {
    return new Stripe(configService.get('STRIPE_SECRET_KEY')!);
  },
};

@Module({
  providers: [stripeProvider],
  exports: ['STRIPE_CLIENT'],
})
export class StripeModule {}
