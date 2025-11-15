import { Injectable } from '@nestjs/common';
import * as fs from 'fs/promises';
import { join } from 'path';

@Injectable()
export class ChatbotRepository {
  private readonly root = process.cwd();

  async getKnowledgeBase(userType: string): Promise<string> {
    const fileMap: Record<string, string> = {
      guest: join(this.root, 'knowledge_base_guest.txt'),
      client: join(this.root, 'knowledge_base_client.txt'),
      provider: join(this.root, 'knowledge_base_provider.txt'),
    };
    const file = fileMap[userType] || fileMap.guest;
    return fs.readFile(file, 'utf-8');
  }

  async getPrompt(): Promise<string> {
    return fs.readFile(join(this.root, 'prompt.txt'), 'utf-8');
  }

  async askGemini(fullPrompt: string): Promise<{ answer: string }> {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error('GEMINI_API_KEY não configurada no ambiente');
    }

    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro-latest:generateContent?key=${apiKey}`;
    const payload = {
      contents: [
        {
          role: 'user',
          parts: [{ text: fullPrompt }],
        },
      ],
    };

    try {
      const resp = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!resp.ok) {
        const errText = await resp.text().catch(() => '');
        throw new Error(`Gemini HTTP ${resp.status}: ${errText}`);
      }

      type GeminiResponse = {
        candidates?: Array<{
          content?: {
            parts?: Array<{ text?: string }>;
          };
        }>;
      };

      const data = (await resp.json()) as GeminiResponse | undefined;

      const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
      const answer =
        (typeof text === 'string' && text.trim()) ||
        'Desculpe, não encontrei resposta. Fale com nosso suporte!';

      return { answer };
    } catch (e) {
      console.error('Gemini API error:', e);
      return {
        answer:
          'No momento não consegui responder. Por favor, tente novamente ou fale com nosso suporte!',
      };
    }
  }
}
