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
import { CreateOrderDto, EditOrderDto } from './dtos';
import { OrdersService } from './orders.service';

@Controller('orders')
export class OrdersController {
  constructor(private readonly orderService: OrdersService) {}

  @Get()
  async getOrders() {
    return await this.orderService.getOrders();
  }

  @Get(':orderId')
  async getOrder(@Param('orderId', ParseIntPipe) orderId: number) {
    return await this.orderService.getOrder(orderId);
  }

  @Post()
  createOrder(@Body() dto: CreateOrderDto) {
    return this.orderService.createOrder(dto);
  }

  @Put(':orderId')
  updateOrder(
    @Param('orderId', ParseIntPipe) id: number,
    @Body() dto: EditOrderDto,
  ) {
    return this.orderService.editOrder(id, dto);
  }

  @Delete(':orderId')
  async deleteOrder(@Param('orderId', ParseIntPipe) orderId: number) {
    return await this.orderService.deleteOrder(orderId);
  }
}
