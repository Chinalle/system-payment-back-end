import { PartialType } from '@nestjs/swagger';
import { User } from 'src/entities/user.entity';

export class UpdateUserDto extends PartialType(User) {}
