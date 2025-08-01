import { Module } from '@nestjs/common';
import { PaystackService } from './paystack.service';
import { PaystackController } from './paystack.controller';

@Module({
  controllers: [PaystackController],
  providers: [PaystackService],
  exports:[PaystackService]
})
export class PaystackModule {}
