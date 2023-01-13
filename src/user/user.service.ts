import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto, EditUserDto } from './dto';
import { User } from './entities';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async getUsers(): Promise<User[]> {
    return await this.userRepository.find({
      order: {
        id: 'ASC',
      },
      relations: {
        orders: true,
      },
    });
  }

  async getUser(id: number) {
    const user = await this.userRepository.findOne({
      where: {
        id: id,
      },
      relations: {
        orders: true,
      },
    });

    if (!user) throw new NotFoundException();

    return user;
  }

  async createUser(dto: CreateUserDto) {
    const user = await this.userRepository.create(dto as any);
    return await this.userRepository.save(user);
  }

  async editUser(id: number, dto: EditUserDto) {
    const user = await this.getUser(id);

    const editUser = Object.assign(user, dto);
    return await this.userRepository.save(editUser);
  }

  async deleteUser(id: number) {
    return await this.userRepository.delete(id);
  }
}
