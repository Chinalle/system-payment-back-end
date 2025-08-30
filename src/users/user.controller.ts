import { Controller, Get } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiTags } from '@nestjs/swagger';
// import { AppService } from './app.service';

@ApiTags('user')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getUsers() {
    const users = await this.userService.getUsers();
    return {
      message: 'Users retrieved succesfully',
      users,
    };
  }
}
