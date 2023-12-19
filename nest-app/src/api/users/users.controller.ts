import { Body, Controller, Param, Post, Delete, Get } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUser } from './dto/create-user.dto';
import { LoginUser } from './dto/login-user.dto';
import { ILoginData } from './login.model';
import { IUser } from './user.model';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get()
  findAll(): IUser[] {
    return this.userService.findAll();
  }

  @Post()
  create(@Body() createUser: CreateUser): string {
    return this.userService.create(createUser);
  }

  @Post('/login')
  login(@Body() loginUser: LoginUser) {
    return this.userService.login(loginUser);
  }

  @Delete(':id')
  delete(@Param('id') id: string): void {
    this.userService.delete(id);
  }
}
