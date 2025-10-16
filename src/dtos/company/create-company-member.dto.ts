import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { RoleProvider } from 'src/entities/enum';

export class CreateCompanyMemberDto {
  @ApiProperty({
    type: String,
    example: '56f8878e-bd50-4264-bfd2-c6b3fc5406cf',
  })
  @IsNotEmpty()
  @IsString()
  @IsUUID()
  companyId: string;

  @ApiProperty({
    type: String,
    example: '56f8878e-bd50-4264-bfd2-c6b3fc5406cf',
  })
  @IsNotEmpty()
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
}
