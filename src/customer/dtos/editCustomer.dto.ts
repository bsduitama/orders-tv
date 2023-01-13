import { PartialType } from '@nestjs/mapped-types';
import { CreateCustomerDto } from './createCustomer.dto';
export class EditCustomerDto extends PartialType(CreateCustomerDto) {}
