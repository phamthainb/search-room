import { Controller, Get, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { AppService } from './app.service';
import * as XLSX from 'xlsx';
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('/excel')
  async export_excel(@Req() req: Request, @Res() res: Response) {
    const name_file = req?.body?.file_name + '_' + Date.now() + '.xlsx';

    const workSheet = XLSX.utils.json_to_sheet(req?.body?.data);
    const workBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workBook, workSheet, 'data');
    XLSX.write(workBook, { bookType: 'xlsx', type: 'buffer' });
    XLSX.writeFile(workBook, __dirname + '/excel/' + name_file);

    res.send(name_file);
  }
}
