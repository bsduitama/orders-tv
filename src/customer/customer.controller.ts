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
import { CustomerService } from './customer.service';
import { CreateCustomerDto, EditCustomerDto } from './dtos';

@Controller('customer')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Get()
  async getCustomers() {
    return await this.customerService.getCustomers();
  }

  @Get(':customerId')
  async getCustomer(@Param('customerId', ParseIntPipe) customerId: number) {
    return await this.customerService.getCustomer(customerId);
  }

  @Post()
  createCustomer(@Body() dto: CreateCustomerDto) {
    return this.customerService.createCustomer(dto);
  }

  @Put(':customerId')
  updateCustomer(
    @Param('customerId', ParseIntPipe) id: number,
    @Body() dto: EditCustomerDto,
  ) {
    return this.customerService.editCustomer(id, dto);
  }

  @Delete(':customerId')
  async deleteCustomer(@Param('customerId', ParseIntPipe) customerId: number) {
    return await this.customerService.deleteCustomer(customerId);
  }
}
