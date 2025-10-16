import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDateString, IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { UserDTO } from '../users/user.dto';
import { Company } from './company.dto';
import { RoleProvider } from 'src/entities/enum';

export class CompanyMemberDto {
  @ApiProperty({
    type: String,
    example: '',
  })
  @IsNotEmpty()
  @IsString()
  @IsUUID()
  id: string;

  @ApiProperty({
    type: String,
    description: 'fk user id',
    example: '56f8878e-bd50-4264-bfd2-c6b3fc5406cf',
  })
  @IsNotEmpty()
  @IsString()
  @IsUUID()
  companyId: string;

  @ApiProperty({
    type: String,
    description: 'fk user id',
    example: '56f8878e-bd50-4264-bfd2-c6b3fc5406cf',
  })
  @IsString()
  @IsUUID()
  userId: string;

  @ApiProperty({
    name: 'RoleProvider',
    enum: RoleProvider,
    examples: [RoleProvider.MANAGER, RoleProvider.COLLABORATOR],
  })
  @IsNotEmpty()
  providerRole: RoleProvider;

  @ApiProperty({
    type: UserDTO,
    required: false,
    description: 'relation user',
  })
  @Type(() => UserDTO)
  user: UserDTO[] | null;

  @ApiProperty({
    type: Company,
    required: false,
    description: 'company',
  })
  @Type(() => UserDTO)
  company: Company[] | null;

  @ApiProperty({
    example: '2024-01-15T10:30:00Z',
    description: 'Creation date',
  })
  @IsDateString()
  createdAt: Date;

  @ApiProperty({
    example: '2024-01-15T10:30:00Z',
    description: 'Update date',
  })
  @IsDateString()
  updatedAt: Date;
}
