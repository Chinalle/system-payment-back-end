import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { genSalt, hash } from 'bcrypt';
import { Role } from 'src/entities/enum';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UserSeed {
  private readonly logger = new Logger(UserSeed.name);
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async runSeed() {
    this.logger.log('Seed User has been initialized');
    const salt = await genSalt(6);
    const hashedPass = await hash('123456', salt);
    const count = await this.userRepository.count();
    if (count === 0) {
      await this.userRepository.save([
        {
          id: uuidv4(),
          fullName: 'Leonidas de Oliveira',
          email: 'devtechtarget@gmail.com',
          passwordHash: hashedPass,
          phone: '19999999999',
          cpf: '11111111111',
          birthDate: new Date('1999-06-25'),
          role: Role.PROVIDER,
          isActive: true,
          isConfirmed: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: uuidv4(),
          fullName: 'Octavio Chinalle',
          email: 'octaviot@gmail.com',
          passwordHash: hashedPass,
          phone: '19945464688',
          cpf: '22222222222',
          birthDate: new Date('2003-12-27'),
          role: Role.ADMIN,
          isActive: true,
          isConfirmed: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: uuidv4(),
          fullName: 'Octavio Chinalle',
          email: 'octaviot@gmail.com',
          passwordHash: hashedPass,
          phone: '19945464688',
          cpf: '22222222222',
          birthDate: new Date('2003-12-27'),
          role: Role.ADMIN,
          isActive: true,
          isConfirmed: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ]);
      console.log('✅ Users seeded with success!');
    } else {
      console.log('ℹ️ Users already exist, skipping seeding...');
    }
  }
}
