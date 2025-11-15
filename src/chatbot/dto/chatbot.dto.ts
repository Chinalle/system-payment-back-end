import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsIn } from 'class-validator';

export class ChatbotDto {
  @ApiProperty({ example: 'Como agendo um serviço?' })
  @IsString()
  question: string;

  @ApiProperty({ example: 'guest', enum: ['guest', 'client', 'provider'] })
  @IsIn(['guest', 'client', 'provider'])
  userType: string;
}
