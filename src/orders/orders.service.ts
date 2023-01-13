import { Injectable } from '@nestjs/common';
import {
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common/exceptions';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateOrderDto, EditOrderDto } from './dtos';
import { Order } from './entities';
import { Customer } from 'src/customer/entities';
import { User } from 'src/user/entities';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    @InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async getOrders(): Promise<Order[]> {
    return await this.orderRepository.find({
      relations: {
        customer: true,
        user: true,
      },
      order: {
        id: 'ASC',
      },
    });
  }

  async getOrder(id: number) {
    const order = await this.orderRepository.findOne({
      where: {
        id: id,
      },
      relations: {
        customer: true,
        user: true,
      },
    });

    if (!order) throw new NotFoundException();

    return order;
  }

  async createOrder(dto: CreateOrderDto) {
    const users = await this.userRepository.find();

    if (users.length <= 0)
      throw new ForbiddenException(
        'operation prohibited, you have no users available.',
      );

    const customer = await this.customerRepository.create(dto.customer as any);
    await this.customerRepository.save(customer);

    const rand = Math.floor(Math.random() * users.length);
    const userSelect = users[rand];
    console.log(userSelect);

    const order = await this.orderRepository.create(dto as any);
    order['customer'] = customer;
    order['user'] = userSelect;

    const banco =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let aleatoria = '';
    const longitud = 10;
    for (let i = 0; i < longitud; i++) {
      aleatoria += banco.charAt(Math.floor(Math.random() * banco.length));
    }

    order['token'] = aleatoria;
    console.log(order);

    return await this.orderRepository.save(order);
  }

  async editOrder(id: number, dto: EditOrderDto) {
    const order = await this.getOrder(id);

    const editOrder = Object.assign(order, dto);
    return await this.orderRepository.save(editOrder);
  }

  async deleteOrder(id: number) {
    return await this.orderRepository.delete(id);
  }
}
