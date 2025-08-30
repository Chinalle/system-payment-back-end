import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/entities/user.entity';
import { UserSeed } from './user.seed';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  providers: [UserSeed],
})
export class SeedModule {}
