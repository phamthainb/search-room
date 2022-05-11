import { Controller, Get, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { AppService } from './app.service';
import * as XLSX from 'xlsx';
import { Workbook } from 'exceljs';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('/excel')
  async export_excel(@Req() req: Request, @Res() res: Response) {
    console.log('req?.body?.data', typeof req?.body?.data);

    res.header(
      'Content-disposition',
      'attachment; filename=anlikodullendirme.xlsx',
    );
    res.type(
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    );
    // const worksheet = XLSX.utils.json_to_sheet(req?.body?.data ?? []);
    // const wb = XLSX.utils.book_new();
    // XLSX.utils.book_append_sheet(wb, worksheet);
    // wb.xlsx.write(res);
    // res.status(200).end();
    const workbook = new Workbook();
    const worksheet = workbook.addWorksheet('data');
    // worksheet.model = [{}];
    res.setHeader('Content-Type', 'text/xlsx');
    res.setHeader('Content-Disposition', 'attachment; filename=' + 'file.xlsx');
    await workbook.xlsx.write(res);
    res.status(200).end();
  }
}
