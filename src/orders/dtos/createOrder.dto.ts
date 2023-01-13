import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsDate,
  IsDateString,
  IsEnum,
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator';
import { CreateCustomerDto } from 'src/customer/dtos';
import { Customer } from 'src/customer/entities';
import { OrderStatus } from '../enums';

export class CreateOrderDto {
  @ApiProperty()
  @IsNumber()
  number: number;

  @ApiProperty()
  @ValidateNested()
  @Type(() => CreateCustomerDto)
  customer: Customer;

  @ApiProperty({ description: 'Enum OrderStatus [open, close]' })
  @IsEnum(OrderStatus)
  status: OrderStatus;
}
