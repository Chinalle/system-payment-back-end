import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { CompanyMemberDto } from 'src/dtos/company/company-member.dto';
import { CreateCompanyMemberDto } from 'src/dtos/company/create-company-member.dto';
import type { CompanyMember } from 'src/entities/company-member.entity';
import { CompanyMemberService } from './members.service';

@ApiTags('Company Members')
@Controller('company-members')
export class CompanyMembersController {
  constructor(private readonly companyMemberService: CompanyMemberService) {}

  @ApiBody({
    type: CreateCompanyMemberDto,
  })
  @ApiCreatedResponse({
    type: CompanyMemberDto,
  })
  @Post()
  async create(
    @Body() createCompanyMemberDto: CreateCompanyMemberDto,
  ): Promise<CompanyMember> {
    return this.companyMemberService.create(createCompanyMemberDto);
  }

  @ApiOperation({
    summary: 'List all members of a company',
    description:
      'Returns an array of all users associated with a specific company, based on the company ID.',
  })
  @ApiParam({
    name: 'companyId',
    type: String,
    description: '',
    example: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
  })
  @ApiOkResponse({
    type: CompanyMemberDto,
    isArray: true,
    description: 'A list of company members was returned successfully.',
    schema: {
      example: [
        {
          id: 'f1b2c3d4-e5f6-g7h8-i9j0-k1l2m3n4o5p6',
          userId: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
          companyId: 'b0eebc99-9c0b-4ef8-bb6d-6bb9bd380a12',
          providerRole: 'MANAGER',
          createdAt: '2025-10-15T23:55:00.000Z',
        },
        {
          id: 'f1b2c3d4-e5f6-g7h8-i9j0-k1l2m3n4o5p6',
          userId: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
          companyId: 'b0eebc99-9c0b-4ef8-bb6d-6bb9bd380a12',
          providerRole: 'COLLABORATOR',
          createdAt: '2025-10-15T23:55:00.000Z',
        },
      ],
    },
  })
  @Get('by-company/:companyId')
  async findAllCompanyMembers(
    @Param('companyId', ParseUUIDPipe) companyId: string,
  ): Promise<CompanyMember[]> {
    return await this.companyMemberService.findAllCompanyMembers(companyId);
  }

  @ApiParam({
    name: 'userId',
    type: String,
    description: '',
    example: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
  })
  @ApiOkResponse({
    type: CompanyMemberDto,
    description: 'return a company member object',
    example: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
  })
  @Get('member/:userId')
  async findCompanyMember(
    @Param('userId', ParseUUIDPipe) userId: string,
    @Param('companyId', ParseUUIDPipe) companyId: string,
  ): Promise<CompanyMember> {
    return await this.companyMemberService.findCompanyMember(userId, companyId);
  }
}
