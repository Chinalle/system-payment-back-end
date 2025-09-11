import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { UserService } from './user.service';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { UserEntity } from 'src/entities/user.entity';
import { UserDTO } from 'src/dtos/users/user.dto';
import { CreateUserDTO } from 'src/dtos/users/create-user.dto';
import { MailService } from 'src/mailer/mailer.service';

@ApiTags('User')
@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly mailSender: MailService,
  ) {}

  @Get('email')
  async emailSender(): Promise<void> {
    await this.mailSender.sendTestEmail('leonidasoliv25@gmail.com');
  }

  @Get()
  async findAll(): Promise<UserEntity[]> {
    return await this.userService.findAll();
  }

  @ApiCreatedResponse({
    type: UserDTO,
  })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createUserDto: CreateUserDTO): Promise<UserDTO> {
    return this.userService.create(createUserDto);
  }
}
