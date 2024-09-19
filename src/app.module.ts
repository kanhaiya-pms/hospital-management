import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { DoctorModule } from './doctor/doctor.module';
import { AuthModule } from './auth/auth.module';
import { PatientModule } from './patient/patient.module';
import { AppointmentModule } from './appointment/appointment.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ".env"
    }),
    MongooseModule.forRoot(process.env.DB_URI),
    DoctorModule,
    AuthModule,
    PatientModule,
    AppointmentModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
