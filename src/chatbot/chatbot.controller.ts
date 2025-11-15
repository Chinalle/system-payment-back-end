import { Controller, Post, Body } from '@nestjs/common';
import { ChatbotService } from './chatbot.service';
import { ApiTags, ApiBody } from '@nestjs/swagger';
import { ChatbotDto } from './dto/chatbot.dto';

@ApiTags('chatbot')
@Controller('chatbot')
export class ChatbotController {
  constructor(private readonly chatbotService: ChatbotService) {}

  @Post()
  @ApiBody({ type: ChatbotDto })
  async askBot(@Body() body: ChatbotDto) {
    return await this.chatbotService.handleUserQuestion(body);
  }
}
