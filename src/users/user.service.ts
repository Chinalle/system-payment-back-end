import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) { }

  public getUsers(): Promise<UserEntity[]> {
    return this.userRepository.find({
      select: ['id', 'full_name', 'username', 'email'],
    });
  }
  async findByEmail(email: string): Promise<UserEntity | null> {
    return this.userRepository.findOneBy({ email: email });
  }
}
