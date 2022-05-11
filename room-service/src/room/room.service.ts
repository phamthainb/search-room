import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { QueryBuilder } from 'typeorm';
import { CreateRoomDto } from './dto/create-room.dto';
import { SearchRoomDto } from './dto/search-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { RoomRepository } from './room.repository';

@Injectable()
export class RoomService {
  constructor(private repo_room: RoomRepository) {}

  async create(createRoomDto: CreateRoomDto) {
    return await this.repo_room.save({ ...createRoomDto });
  }

  async findAll(params: SearchRoomDto) {
    const { name, desc, maxPrice, minPrice, status, type, startTime, endTime } =
      params;
    const query = this.repo_room.createQueryBuilder('room');

    if (minPrice > maxPrice || endTime < startTime) {
      throw new HttpException('Input not valid', HttpStatus.BAD_REQUEST);
    }

    if (name) {
      query.andWhere('room.name like :name', { name: `%${name}%` });
    }

    if (desc) {
      query.andWhere('room.desc like :desc', { desc: `%${desc}%` });
    }

    if (status) {
      query.andWhere('room.status = :status', { status: `${status}` });
    }

    if (type) {
      query.andWhere('room.type = :type', { type: `${type}` });
    }

    if (minPrice) {
      query.andWhere('room.price >= :minPrice', { minPrice: `${minPrice}` });
    }

    if (maxPrice) {
      query.andWhere('room.price <= :maxPrice', { maxPrice: `${maxPrice}` });
    }

    // startTime, endTime => find all room don't have Order btw time

    const result = await query.getMany();

    return result;
  }

  async findOne(id: number) {
    return await this.repo_room.findOne(id);
  }

  async update(id: number, updateRoomDto: UpdateRoomDto) {
    const r = await this.repo_room.findOne(id);
    return await this.repo_room.save({ ...r, ...updateRoomDto });
  }

  async remove(id: number) {
    return await this.repo_room.delete(id);
  }
}
