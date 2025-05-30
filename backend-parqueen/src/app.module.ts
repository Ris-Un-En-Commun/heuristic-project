import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ParkingModule } from './parking/parking.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [UsersModule, ParkingModule, DatabaseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
}
