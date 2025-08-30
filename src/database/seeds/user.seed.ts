import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { Logger } from '@nestjs/common';

@Injectable()
export class UserSeed implements OnModuleInit {
  private readonly logger = new Logger(UserSeed.name);
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async onModuleInit() {
    this.logger.log('Seed User has been initialized');
    const count = await this.userRepository.count();
    if (count === 0) {
      await this.userRepository.save([
        {
          full_name: 'Admin User',
          username: 'admin',
          email: 'admin@example.com',
        },
        {
          full_name: 'Leonidas Oliveira',
          username: 'leonidas',
          email: 'leonidas@example.com',
        },
      ]);
      console.log('✅ Users seeded with success!');
    } else {
      console.log('ℹ️ Users already exist, skipping seeding...');
    }
  }
}
