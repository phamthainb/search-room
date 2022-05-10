import {
  HttpCode,
  HttpException,
  HttpStatus,
  MiddlewareConsumer,
  Module,
  NestMiddleware,
  NestModule,
} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CustomerModule } from './customer/customer.module';
// import { Request, Response } from 'express';

// class CheckAuth implements NestMiddleware {
//   use(req: Request, res: Response, next: (error?: any) => void) {
//     const { headers } = req;
//     console.log('headers', headers.authorization);
//     if (headers.authorization) {
//       next();
//     }
//     throw new HttpException('FORBIDDEN', HttpStatus.FORBIDDEN);
//   }
// }
@Module({
  imports: [
    CustomerModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '', // just is local password :)) happy hacking
      database: 'search-room',
      entities: ['dist/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
// export class AppModule implements NestModule {
//   configure(consumer: MiddlewareConsumer) {
//     consumer.apply(CheckAuth).forRoutes('/customer');
//   }
// }
export class AppModule {}
