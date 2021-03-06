import { Controller, Get, Param, Post, Query, Req } from '@nestjs/common';
import { query, Request } from 'express';
import { Readable } from 'stream';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('/login')
  login(@Req() req: Request) {
    return this.appService.login(req);
  }

  @Post('/auth')
  check_auth(@Req() req: Request) {
    return this.appService.check_auth(req);
  }

  // main api
  @Get('/search-room')
  search_room(@Req() req: Request) {
    return this.appService.search_room(req);
  }

  @Get('/get-request/:id')
  get_request(@Param('id') id: string, @Req() req: Request) {
    return this.appService.get_request(id, req);
  }

  @Get('/reset-queue')
  reset_queue() {
    return this.appService.reset_queue();
  }

  @Get('/room/:id')
  room(@Req() req: Request) {
    return this.appService.room(req);
  }

  @Get('/search-order')
  search_order(@Req() req: Request) {
    return this.appService.search_order(req);
  }

  @Post('/export-excel')
  async export_excel(@Req() req: Request) {
    return this.appService.excel_export(req);
  }
}
