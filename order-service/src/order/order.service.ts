import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { OrderRepository } from './order.repository';

@Injectable()
export class OrderService {
  constructor(private repo_order: OrderRepository) {}

  async create(createOrderDto: CreateOrderDto) {
    return await this.repo_order.save({ ...createOrderDto });
  }

  async findAll() {
    return await this.repo_order.find({ order: { create_at: 'DESC' } });
  }

  async findOne(id: number) {
    return await this.repo_order.findOne(id);
  }

  async update(id: number, updateOrderDto: UpdateOrderDto) {
    const o = this.repo_order.findOne(id);
    return await this.repo_order.save({ ...o, ...updateOrderDto });
  }

  async remove(id: number) {
    return await this.repo_order.delete(id);
  }

  async findByRoom(room: number) {
    return this.repo_order.find({
      where: { room: room },
      order: { create_at: 'DESC' },
    });
  }
}
