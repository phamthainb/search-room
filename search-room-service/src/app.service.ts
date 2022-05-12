import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import axios from 'axios';
import { Request } from 'express';
import { service } from './main';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  async login(req: Request) {
    try {
      const res = await axios({
        method: 'POST',
        url: `${service.employee.url}/employee/login`,
        data: req.body,
        headers: {
          authorization: req.headers['authorization'] || '',
        },
      });
      return res.data;
    } catch (error) {
      throw new HttpException('Input value invalid', HttpStatus.BAD_REQUEST);
    }
  }

  async check_auth(req: Request) {
    try {
      const res = await axios({
        method: 'POST',
        url: `${service.employee.url}/employee/auth`,
        headers: {
          authorization: req.headers['authorization'] || '',
        },
      });
      return res.data;
    } catch (error) {
      throw new HttpException('Input value invalid', HttpStatus.BAD_REQUEST);
    }
  }

  async search_room(req: Request) {
    try {
      await this.check_auth(req);

      const res = await axios({
        method: 'GET',
        url: `${service.room.url}/room`,
        params: { ...req.query },
        headers: {
          authorization: req.headers['authorization'] || '',
        },
      });
      return res.data;
    } catch (error) {
      throw new HttpException('Input value invalid', HttpStatus.BAD_REQUEST);
    }
  }

  async room(req: Request) {
    try {
      await this.check_auth(req);

      const res = await axios({
        method: 'GET',
        url: `${service.room.url}/room/${req.params['id']}`,
        params: { ...req.query },
        headers: {
          authorization: req.headers['authorization'] || '',
        },
      });
      return res.data;
    } catch (error) {
      throw new HttpException('Input value invalid', HttpStatus.BAD_REQUEST);
    }
  }

  async search_order(req: Request) {
    try {
      await this.check_auth(req);

      const res = await axios({
        method: 'GET',
        url: `${service.order.url}/order`,
        params: { ...req.query },
        headers: {
          authorization: req.headers['authorization'] || '',
        },
      });
      return res.data;
    } catch (error) {
      throw new HttpException('Input value invalid', HttpStatus.BAD_REQUEST);
    }
  }

  async excel_export(req: Request) {
    try {
      await this.check_auth(req);

      const res = await axios({
        method: 'POST',
        url: `${service.excel.url}/excel`,
        data: req.body,
        headers: {
          authorization: req.headers['authorization'] || '',
        },
      });
      return res.data;
    } catch (error) {
      throw new HttpException('Input value invalid', HttpStatus.BAD_REQUEST);
    }
  }
}
