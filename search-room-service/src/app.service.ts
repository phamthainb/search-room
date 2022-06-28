import { InjectQueue } from '@nestjs/bull';
import {
  CACHE_MANAGER,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import axios from 'axios';
import { Request } from 'express';
import { service } from './main';
import { Queue } from 'bull';
import { randomUUID } from 'crypto';
import { Cache } from 'cache-manager';
import { RequestJSON, RequestStatus } from './app.type';

@Injectable()
export class AppService {
  constructor(
    @InjectQueue('request_queue') private queue: Queue,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  getHello(): string {
    return 'Hello World!';
  }

  async login(req: Request | RequestJSON) {
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

  async check_auth(req: Request | RequestJSON) {
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
      throw new HttpException('Unauthorization', HttpStatus.FORBIDDEN);
    }
  }

  async search_room(req: Request) {
    const request_id = randomUUID();

    // for store data
    await this.cacheManager.set(
      request_id,
      {
        request_id: request_id,
        status: RequestStatus['0_init'],
        data: [],
      },
      { ttl: 60 * 60 * 1000 },
    );

    // for store list request
    await this.queue.add('handle_request', {
      request_id: request_id,
      req: { headers: req.headers, body: req.body, query: req.query },
    });

    return { data: [], request_id };
  }

  async get_request(id: string, req: Request) {
    await this.check_auth(req);

    const res = await this.cacheManager.get(id);

    if (!res) {
      throw new HttpException('Request not found', HttpStatus.NOT_FOUND);
    }
    return res;
  }

  async room(req: Request | RequestJSON) {
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

  async search_order(req: Request | RequestJSON) {
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

  async excel_export(req: Request | RequestJSON) {
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

  async timeout(ms) {
    console.log(`${new Date().toLocaleTimeString()}: timeout ${ms}ms`);
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
