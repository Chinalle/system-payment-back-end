import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UserService } from './user.service';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { UserDTO } from 'src/dtos/users/user.dto';
import { CreateUserDTO } from 'src/dtos/users/create-user.dto';
import { MailService } from 'src/mailer/mailer.service';
import type { User } from 'src/entities/user.entity';

@ApiTags('User')
@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly mailSender: MailService,
  ) {}

  @Get('email')
  async emailSender(): Promise<void> {
    const to: string = 'leonidasoliv25@gmail.com';
    await this.mailSender.sendConfirmation(
      to,
      'testando template de confirmação',
      'Leonidas Oliveira',
      `https://api.backend/v1/confirm/{uuid}}`,
      false,
    );
  }

  @Get()
  async findAll(): Promise<User[]> {
    return await this.userService.findAll();
  }

  @ApiCreatedResponse({
    type: UserDTO,
  })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createUserDto: CreateUserDTO): Promise<UserDTO> {
    console.log('User data: ', createUserDto);
    return this.userService.create(createUserDto);
  }

  @ApiOkResponse()
  @ApiBody({
    required: true,
  })
  @Put('confirm-user')
  @HttpCode(HttpStatus.OK)
  async emailConfirm(@Body('email') email: string): Promise<void> {
    console.log('user email to confirm', email);
    await this.userService.emailConfirm(email);
  }

  @ApiOkResponse()
  @ApiParam({
    name: 'userId',
  })
  @Put('soft-delete')
  @HttpCode(HttpStatus.OK)
  async softDelete(@Param('userId') userId: string): Promise<void> {
    console.log('user soft delete', userId);
    await this.userService.softDelete(userId);
  }
}
