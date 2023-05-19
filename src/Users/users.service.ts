import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDTO } from './userDto/users.dto';
import { User } from './schema/users.model';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  async createUser(userDto: UserDTO): Promise<UserDTO> {
    const newUser = new this.userModel(userDto);
    const createdUser = await newUser.save();
    return createdUser.toObject();
  }

  async getUser(id: string): Promise<UserDTO> {
    const user = await this.userModel.findById(id).exec();
    return user ? user.toObject() : null;
  }

  async getAllUsers(page: number, limit: number, email?: string): Promise<UserDTO[]> {
    const skip = (page - 1) * limit;
  
    const filter: any = {};
    if (email) {
      filter.email = email;
    }
  
    const users = await this.userModel
      .find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .exec();
  
    return users.map(user => user.toObject());
  }

  async updateUser(id: string, userDto: UserDTO): Promise<UserDTO> {
    const updatedUser = await this.userModel
      .findByIdAndUpdate(id, userDto, { new: true })
      .exec();
    return updatedUser ? updatedUser.toObject() : null;
  }

  async deleteUser(id: string): Promise<void> {
    await this.userModel.findByIdAndRemove(id).exec();
  }
}