import { Controller, Get, Post, Body, Param, Put, Delete, Query} from '@nestjs/common';
import { UserService } from './users.service';
import { UserDTO } from './userDto/users.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async createUser(@Body() userDto: UserDTO): Promise<UserDTO> {
    const createdUser = await this.userService.createUser(userDto);
    return createdUser;
  }

  @Get(':id')
  async getUser(@Param('id') id: string): Promise<UserDTO> {
    const user = await this.userService.getUser(id);
    return user;
  }

  @Get()
  async getAllUsers(
    @Query('page') page: number,
    @Query('limit') limit: number,
    @Query('email') email?: string,
  ): Promise<UserDTO[]> {
    const users = await this.userService.getAllUsers(page, limit, email);
    return users;
  }


  @Put(':id')
  async updateUser(@Param('id') id: string, @Body() userDto: UserDTO): Promise<UserDTO> {
    const updatedUser = await this.userService.updateUser(id, userDto);
    return updatedUser;
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string): Promise<void> {
    await this.userService.deleteUser(id);
  }
}