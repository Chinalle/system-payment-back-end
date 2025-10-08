import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { UserSeed } from './user.seed';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UserSeed],
})
export class SeedModule {}
