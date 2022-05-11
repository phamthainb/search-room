import { Injectable } from '@nestjs/common';
import { CustomerRepository } from './customer.repository';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';

@Injectable()
export class CustomerService {
  constructor(private repo_customer: CustomerRepository) {}

  async create(createCustomerDto: CreateCustomerDto) {
    return await this.repo_customer.save({ ...createCustomerDto });
  }

  async findAll() {
    return await this.repo_customer.find();
  }

  async findOne(id: number) {
    return await this.repo_customer.findOne(id);
  }

  async update(id: number, updateCustomerDto: UpdateCustomerDto) {
    const c = this.repo_customer.findOne(id);
    return await this.repo_customer.save({ ...c, ...updateCustomerDto });
  }

  async remove(id: number) {
    return await this.repo_customer.softDelete(id);
  }
}
