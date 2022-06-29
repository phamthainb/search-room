import { InjectQueue, Process, Processor } from '@nestjs/bull';
import { CACHE_MANAGER, Inject } from '@nestjs/common';
import axios, { AxiosResponse } from 'axios';
import { Job, Queue, JobStatus } from 'bull';
import { Cache } from 'cache-manager';
import { AppService } from './app.service';
import { RequestJSON, RequestStatus } from './app.type';
import { service } from './main';

@Processor('request_queue')
export class AppProcessor {
  constructor(
    @InjectQueue('request_queue') private queue: Queue,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private appService: AppService,
  ) {}
  @Process('handle_request')
  async handle_request(
    job: Job<{
      request_id: string;
      status: any;
      req: RequestJSON;
    }>,
  ) {
    const id = job.data.request_id;
    const req = job.data.req;
    console.log('getJobs: ', await this.queue.getJobs(['waiting']));

    // > check employee auth
    await this.appService.check_auth(job.data.req);
    await this.cacheManager.set(
      id,
      {
        request_id: id,
        status: RequestStatus['1_check_auth'],
      },
      { ttl: 10 * 60 * 1000 },
    );
    await this.appService.timeout(2 * 1000);

    // > get list room
    await this.cacheManager.set(id, {
      request_id: id,
      status: RequestStatus['2_get_room'],
    });

    let room;
    try {
      room = await axios({
        method: 'GET',
        url: `${service.room.url}/room`,
        params: { ...req.query },
        headers: {
          authorization: req.headers['authorization'] || '',
        },
      });
    } catch (error) {}

    const list_room = room.data;
    await this.appService.timeout(2 * 1000);

    // > get list order of room, 1 room has order[]
    await this.cacheManager.set(
      id,
      {
        request_id: id,
        status: RequestStatus['3_get_order'],
      },
      { ttl: 10 * 60 * 1000 },
    );
    for (let i = 0; i < list_room.length; i++) {
      const el = list_room[i];
      let order;
      try {
        order = await axios({
          method: 'GET',
          url: `${service.order.url}/order/room/${el.id}`,
          headers: {
            authorization: req.headers['authorization'] || '',
          },
        });
      } catch (error) {}

      list_room[i] = { ...el, order: order.data };
    }
    await this.appService.timeout(2 * 1000);
    console.log('list_room', list_room);

    // > get customer order
    await this.cacheManager.set(
      id,
      {
        request_id: id,
        status: RequestStatus['4_get_customer'],
      },
      { ttl: 10 * 60 * 1000 },
    );
    for (let i = 0; i < list_room.length; i++) {
      const el = list_room[i];
      const list_order = el.order;

      for (let j = 0; j < list_order.length; j++) {
        const or = list_order[j];
        let customer;
        try {
          customer = await axios({
            method: 'GET',
            url: `${service.customer.url}/customer/${or.customer}`,
            headers: {
              authorization: req.headers['authorization'] || '',
            },
          });
        } catch (error) {}

        list_order[j] = { ...or, customer: customer.data };
      }

      list_room[i] = { ...el, order: list_order };
    }
    await this.appService.timeout(2 * 1000);

    // > get employee support
    await this.cacheManager.set(
      id,
      {
        request_id: id,
        status: RequestStatus['5_get_employee'],
      },
      { ttl: 10 * 60 * 1000 },
    );

    for (let i = 0; i < list_room.length; i++) {
      const el = list_room[i];
      const list_order = el.order;

      for (let j = 0; j < list_order.length; j++) {
        const or = list_order[j];
        let employee;
        try {
          employee = await axios({
            method: 'GET',
            url: `${service.employee.url}/employee/${or.employee}`,
            headers: {
              authorization: req.headers['authorization'] || '',
            },
          });
        } catch (error) {}

        list_order[j] = { ...or, employee: employee.data };
      }

      list_room[i] = { ...el, order: list_order };
    }
    await this.appService.timeout(2 * 1000);

    // > done
    await this.cacheManager.set(
      id,
      {
        request_id: id,
        status: RequestStatus['6_done'],
        data: list_room,
      },
      { ttl: 10 * 60 * 1000 },
    );

    return true;
  }
}
