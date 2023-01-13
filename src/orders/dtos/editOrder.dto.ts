import { CreateOrderDto } from './createOrder.dto';
import { OmitType, PartialType } from '@nestjs/mapped-types';
export class EditOrderDto extends PartialType(CreateOrderDto) {}
