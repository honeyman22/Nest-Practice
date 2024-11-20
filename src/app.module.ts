import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { CatsModule } from './cats/cats.module';

@Module({
  imports: [DatabaseModule, CatsModule],
})
export class AppModule {}
