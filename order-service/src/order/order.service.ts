import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { SearchOrderDto } from './dto/search-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { OrderRepository } from './order.repository';
import axios from 'axios';
@Injectable()
export class OrderService {
  constructor(private repo_order: OrderRepository) {}

  async create(createOrderDto: CreateOrderDto) {
    // check room available => create
    const room = await axios({
      method: 'GET',
      url: `http://localhost:3002/room/${createOrderDto.room}`,
    });

    if (room.data.status) {
      // change status of room
      await axios({
        method: 'PATCH',
        url: `http://localhost:3002/room/${createOrderDto.room}`,
        data: {
          status: false,
        },
      });
      return await this.repo_order.save({ ...createOrderDto });
    } else {
      throw new HttpException('Room is not avalibale', HttpStatus.BAD_REQUEST);
    }
  }

  async findAll(params: SearchOrderDto) {
    const { customer, room, employee, end, start, status } = params;
    const query = this.repo_order.createQueryBuilder('order');

    if (end < start) {
      throw new HttpException('Input value invlid', HttpStatus.BAD_REQUEST);
    }
    if (status) {
      query.andWhere('order.status = :status', { status: status });
    }
    if (customer) {
      query.andWhere('order.customer = :customer', { customer: customer });
    }
    if (room) {
      query.andWhere('order.room = :room', { room: room });
    }
    if (employee) {
      query.andWhere('order.employee = :employee', { employee: employee });
    }

    if (start) {
      query.andWhere('order.start <= :start', { start: start });
    }

    if (end) {
      query.andWhere('order.end >= :end', { end: end });
    }

    const result = await query.getMany();

    return result;
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
