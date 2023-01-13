import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCustomerDto, EditCustomerDto } from './dtos';
import { Customer } from './entities';

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>,
  ) {}

  async getCustomers(): Promise<Customer[]> {
    return await this.customerRepository.find({
      order: {
        id: 'ASC',
      },
    });
  }

  async getCustomer(id: number) {
    const customer = await this.customerRepository.findOne({
      where: {
        id: id,
      },
    });

    if (!customer) throw new NotFoundException();

    return customer;
  }

  async createCustomer(dto: CreateCustomerDto) {
    const customer = await this.customerRepository.create(dto as any);
    return await this.customerRepository.save(customer);
  }

  async editCustomer(id: number, dto: EditCustomerDto) {
    const customer = await this.getCustomer(id);

    const editCustomer = Object.assign(customer, dto);
    return await this.customerRepository.save(editCustomer);
  }

  async deleteCustomer(id: number) {
    return await this.customerRepository.delete(id);
  }
}