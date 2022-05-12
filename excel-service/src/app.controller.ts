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
    const name_file = Date.now() + '.xlsx';
    const workbook = new Workbook();
    const worksheet = workbook.addWorksheet('data');
    worksheet.addRows(req?.body?.data ?? []);
    res.setHeader(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    );
    res.setHeader('Content-Disposition', `attachment; filename=${name_file}`);
    await workbook.xlsx.writeFile(__dirname + '/excel/' + name_file);

    console.log(
      "__dirname + '/excel/' + name_file",
      __dirname + '/excel/' + name_file,
    );

    res.sendFile(__dirname + '/excel/' + name_file);
  }
}
