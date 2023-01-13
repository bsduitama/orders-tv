import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customer } from 'src/customer/entities';
import { User } from 'src/user/entities';
import { CustomerModule } from '../customer/customer.module';
// import { CustomerService } from 'src/customer/customer.service';
import { Order } from './entities';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';

@Module({
  imports: [TypeOrmModule.forFeature([Order, Customer, User]), CustomerModule],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
