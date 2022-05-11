import { Injectable } from '@nestjs/common';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { RoomRepository } from './room.repository';

@Injectable()
export class RoomService {
  constructor(private repo_room: RoomRepository) {}

  async create(createRoomDto: CreateRoomDto) {
    return await this.repo_room.save({ ...createRoomDto });
  }

  async findAll() {
    return await this.repo_room.find();
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
