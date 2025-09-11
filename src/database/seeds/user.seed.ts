import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { Logger } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { genSalt, hash } from 'bcrypt';

@Injectable()
export class UserSeed implements OnModuleInit {
  private readonly logger = new Logger(UserSeed.name);
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async onModuleInit() {
    this.logger.log('Seed User has been initialized');
    const salt = await genSalt(6);
    const hashedPass = await hash('123456', salt);
    const count = await this.userRepository.count();
    if (count === 0) {
      await this.userRepository.save([
        {
          id: uuidv4(),
          fullName: 'Admin User',
          username: 'admin',
          email: 'admin@example.com',
          phone: '19999999999',
          password: hashedPass,
          cpf: '000.000.000-00',
          adress: 'Rua Admin, 1',
          role: 'admin',
          isActive: true,
        },
        {
          id: uuidv4(),
          fullName: 'Leonidas Oliveira',
          username: 'leonidas',
          email: 'leonidas@example.com',
          phone: '19999999999',
          password: hashedPass,
          cpf: '111.111.111-11',
          adress: 'Rua Leonidas, 10',
          role: 'user',
          isActive: true,
        },
      ]);
      console.log('✅ Users seeded with success!');
    } else {
      console.log('ℹ️ Users already exist, skipping seeding...');
    }
  }
}
