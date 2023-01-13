import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { CreateUserDto, EditUserDto } from './dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getUsers() {
    return await this.userService.getUsers();
  }

  @Get(':userId')
  async getUser(@Param('userId', ParseIntPipe) userId: number) {
    return await this.userService.getUser(userId);
  }

  @Post()
  createUser(@Body() dto: CreateUserDto) {
    return this.userService.createUser(dto);
  }

  @Put(':userId')
  updateUser(
    @Param('userId', ParseIntPipe) id: number,
    @Body() dto: EditUserDto,
  ) {
    return this.userService.editUser(id, dto);
  }

  @Delete(':userId')
  async deleteUser(@Param('userId', ParseIntPipe) userId: number) {
    return await this.userService.deleteUser(userId);
  }
}
