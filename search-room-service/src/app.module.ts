import { CacheModule, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BullModule } from '@nestjs/bull';
import { AppProcessor } from './app.consumer';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '', // just local password :)) happy hacking
      database: 'search-room',
      entities: ['dist/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    BullModule.forRoot({
      redis: {
        host: 'localhost',
        port: 6379,
        keyPrefix: 'SEARCH_ROOM_',
      },
    }),
    BullModule.registerQueue({ name: 'request_queue' }),
    CacheModule.register(),
  ],
  controllers: [AppController],
  providers: [AppService, AppProcessor],
})
export class AppModule {}
