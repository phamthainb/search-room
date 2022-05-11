import {
  Inject,
  Injectable,
  Scope,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { EmployeeRepository } from './employee.repository';
import { SECRET_KEY } from 'src/app.module';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';

@Injectable({ scope: Scope.REQUEST })
export class EmployeeService {
  constructor(
    private readonly employeeRepo: EmployeeRepository,
    @Inject(REQUEST) private readonly request: Request,
  ) {}

  async create(createEmployeeDto: CreateEmployeeDto) {
    const hashPasword = await bcrypt.hash(createEmployeeDto.password, 12);
    await this.employeeRepo.save({
      ...createEmployeeDto,
      password: hashPasword,
    });
    return createEmployeeDto;
  }

  async findAll() {
    return await this.employeeRepo.find();
  }

  async findOne(id: number) {
    return await this.employeeRepo.findOne({ where: { id } });
  }

  async update(id: number, updateEmployeeDto: UpdateEmployeeDto) {
    const current = await this.findOne(id);
    return await this.employeeRepo.save({ ...current, ...updateEmployeeDto });
  }

  async remove(id: number) {
    return await this.employeeRepo.delete({ id });
  }

  async comparePassword(password: string, hashPassword) {
    return bcrypt.compare(password, hashPassword);
  }

  async generateToken(id: number) {
    return await jwt.sign(id + '', SECRET_KEY);
  }

  async login(username: string, password: string) {
    const current = await this.employeeRepo.findOne({ where: { username } });
    if (current) {
      if (this.comparePassword(password, current.password)) {
        return await this.generateToken(current.id);
      }
    }
    throw new UnauthorizedException();
  }

  async validate() {
    const token = this.request.headers.authorization.split(' ')[1];
    const id = jwt.verify(token, SECRET_KEY);
    const current = this.findOne(+id);
    if (current) {
      return current;
    }
    throw new UnauthorizedException();
  }
}
