import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { DoctorModule } from 'src/doctor/doctor.module';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PatientService } from 'src/patient/patient.service';
import { PatientModule } from 'src/patient/patient.module';
import { AppService } from 'src/app.service';

@Module({
  imports: [DoctorModule,PatientModule,
    JwtModule.register({
      global: true,
      secret: process.env.SECRET,
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtService,AppService]
})
export class AuthModule { }
