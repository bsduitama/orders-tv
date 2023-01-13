import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CustomerModule } from './customer/customer.module';
import { Customer } from './customer/entities';
import { Order } from './orders/entities';
import { OrdersModule } from './orders/orders.module';
import { User } from './user/entities';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '',
      database: 'orderstv',
      entities: [__dirname + './**/**/*.entity.{ts,js}', Order, Customer, User],
      synchronize: true,
      logging: true,
    }),
    CustomerModule,
    OrdersModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
