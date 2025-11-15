import { Injectable } from '@nestjs/common';
import { ChatbotRepository } from './chatbot.repository';
import { ChatbotDto } from './dto/chatbot.dto';

@Injectable()
export class ChatbotService {
  constructor(private readonly repo: ChatbotRepository) {}

  async handleUserQuestion(dto: ChatbotDto) {
    // Carrega base de conhecimento e prompt
    const context = await this.repo.getKnowledgeBase(dto.userType);
    const prompt = await this.repo.getPrompt();
    // Monta mensagem para IA
    const fullPrompt = `${prompt}\n\nCONTEXTO:\n---\n${context}\n---\n\nPERGUNTA DO USUÁRIO: ${dto.question}`;
    // Chama API Gemini e retorna resposta
    return await this.repo.askGemini(fullPrompt);
  }
}
