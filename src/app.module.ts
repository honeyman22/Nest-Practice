import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { CatsModule } from './cats/cats.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [DatabaseModule, CatsModule, UserModule, AuthModule],
})
export class AppModule {}
