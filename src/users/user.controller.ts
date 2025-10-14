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
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import {
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
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

// TODO: Add Role validation to type client and company [provider: manager and collaborator]

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

  @ApiResponse({
    isArray: true,
    type: User,
  })
  @ApiBearerAuth()
  @Get()
  async findAll(): Promise<User[]> {
    return await this.userService.findAll();
  }

  @ApiCreatedResponse({
    type: UserDTO,
  })
  @ApiBearerAuth()
  @Post()
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
  @Post(':userId')
  @UseGuards(JwtRefreshGuard)
  @HttpCode(HttpStatus.CREATED)
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

  @ApiOkResponse({ description: 'password was successfully changed' })
  @ApiBearerAuth()
  @ApiUnauthorizedResponse({ description: 'Unauthorized user' })
  @ApiParam({ name: 'userId', type: String })
  @ApiBody({ type: UpdatePasswordDto })
  @Patch(':userId')
  @UseGuards(JwtRefreshGuard)
  @HttpCode(HttpStatus.CREATED)
  async forgotPassword(
    @Param('userId', ParseUUIDPipe) userId: string,
    @Body() updatePasswordDto: UpdatePasswordDto,
  ) {
    console.log(
      `requesting endpoint update user with id: ${userId}`,
      updatePasswordDto.password,
    );
    /** TODO: Revisar
     * RF: Lógica de autorização: um usuário só pode alterar a própria senha,
     * a menos que seja um admin.
     * **/
    return this.userService.forgotPassword(userId, updatePasswordDto.password);
  }

  @ApiOkResponse({ description: 'user accout is confirmed' })
  @ApiBearerAuth()
  @ApiUnauthorizedResponse({ description: 'Unauthorized user' })
  @ApiBody({
    required: true,
  })
  @Put('confirm-user')
  @HttpCode(HttpStatus.OK)
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
  @Put(':userId')
  @UseGuards(JwtRefreshGuard)
  @HttpCode(HttpStatus.OK)
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
  @Delete(':userId')
  @UseGuards(JwtRefreshGuard)
  @HttpCode(HttpStatus.OK)
  async hardDelete(
    @Param('userId', ParseUUIDPipe) userId: string,
  ): Promise<void> {
    console.log('user hard delete', userId);
    await this.userService.hardDelete(userId);
  }
}
