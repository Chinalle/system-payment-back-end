import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import {
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiParam,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { UserDTO } from 'src/dtos/users/user.dto';
import { CreateUserDTO } from 'src/dtos/users/create-user.dto';
import { MailService } from 'src/mailer/mailer.service';
import { User } from 'src/entities/user.entity';
import { UpdateUserDto } from 'src/dtos/users/update-user.dto';
import { JwtRefreshGuard } from 'src/auth/jwt-refresh.guard';
import { UpdatePasswordDto } from 'src/dtos/users/update-password.dto';
import type { RequestWithRefreshUser } from 'src/dtos/auth/user-tokens.response.dto';

// TODO: Add Role validation to type client and company [provider: manager and collaborator]

@ApiTags('User')
@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly mailSender: MailService,
  ) {}

  // Teste de email
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
  //============================

  @ApiResponse({
    isArray: true,
    type: User,
  })
  @ApiBearerAuth()
  @Get() // Returns all users (isActive: true and false)
  async findAll(): Promise<User[]> {
    return await this.userService.findAll();
  }

  @ApiResponse({
    isArray: true,
    type: User,
  })
  @ApiBearerAuth()
  @Get('active')
  async findAllActiveUsers(): Promise<User[]> {
    return await this.userService.findAllActiveUsers();
  }

  @ApiCreatedResponse({
    type: UserDTO,
  })
  @ApiBearerAuth()
  @Post('create')
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createUserDto: CreateUserDTO): Promise<UserDTO> {
    console.log('User data: ', createUserDto);
    return this.userService.create(createUserDto);
  }

  @ApiCreatedResponse({
    type: UserDTO,
  })
  @ApiParam({ name: 'userId' })
  @ApiBody({ type: UpdateUserDto })
  @Patch(':userId')
  // @UseGuards(JwtRefreshGuard)
  @HttpCode(HttpStatus.OK)
  async update(
    @Param('userId', ParseUUIDPipe) userId: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User> {
    console.log(
      `requesting endpoint update user with id: ${userId}`,
      updateUserDto,
    );
    return await this.userService.update(userId, updateUserDto);
  }

  @ApiNoContentResponse()
  @ApiBearerAuth()
  @ApiUnauthorizedResponse({ description: 'Unauthorized user' })
  @ApiBody({ type: UpdatePasswordDto })
  @Patch('password/change')
  @UseGuards(JwtRefreshGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  async changePassword(
    @Request() req: RequestWithRefreshUser,
    @Body() updatePasswordDto: UpdatePasswordDto,
  ) {
    console.log(
      `requesting endpoint update user with id: ${req.user.sub}`,
      updatePasswordDto.password,
    );
    const userId = req.user.sub;
    /** TODO: Usuário LOGADO!
     * RF: Lógica de autorização: um usuário pode alterar a própria senha a qualquer momento
     * desde que esteja autenticado
     * **/
    return this.userService.forgotPassword(userId, updatePasswordDto.password);
  }

  @ApiOkResponse({ description: 'user accout is confirmed' })
  @ApiBody({
    required: true,
  })
  @Put('confirm/email')
  @HttpCode(HttpStatus.NO_CONTENT)
  async emailConfirm(@Body('email') email: string): Promise<void> {
    console.log('user email to confirm', email);
    await this.userService.emailConfirm(email);
  }

  @ApiOkResponse({ description: 'user is deactived' })
  @ApiBearerAuth()
  @ApiUnauthorizedResponse({ description: 'Unauthorized user' })
  @ApiParam({
    name: 'userId',
  })
  @Delete(':userId')
  @UseGuards(JwtRefreshGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  async softDelete(
    @Param('userId', ParseUUIDPipe) userId: string,
  ): Promise<void> {
    console.log('user soft delete', userId);
    await this.userService.softDelete(userId);
  }

  @ApiOkResponse({ description: 'user was deleted' })
  @ApiBearerAuth()
  @ApiUnauthorizedResponse({ description: 'Unauthorized user' })
  @ApiParam({
    name: 'userId',
  })
  @Delete('me/:userId')
  @UseGuards(JwtRefreshGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  async hardDelete(
    @Param('userId', ParseUUIDPipe) userId: string,
  ): Promise<void> {
    console.log('user hard delete', userId);
    await this.userService.hardDelete(userId);
  }
}
