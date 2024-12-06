import { Module } from '@nestjs/common';
import { DoctorService } from './doctor.service';
import { DoctorController } from './doctor.controller';
import { JwtModule } from '@nestjs/jwt';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  controllers: [DoctorController],
  providers: [DoctorService],
  imports: [
    DatabaseModule,
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET_KEY, // Replace with a secure secret
      signOptions: { expiresIn: '1d' }, // Optional: Token expiration time
    }),
  ],
})
export class DoctorModule {}
