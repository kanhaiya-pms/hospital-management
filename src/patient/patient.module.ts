import { Module } from '@nestjs/common';
import { PatientService } from './patient.service';
import { PatientController } from './patient.controller';
import { AppService } from 'src/app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Patient, PatientSchema } from './schema/patient.schema';
import { AppointmentService } from 'src/appointment/appointment.service';
import { AppointmentModule } from 'src/appointment/appointment.module';

@Module({
  imports: [MongooseModule.forFeature([{ name: Patient.name, schema: PatientSchema}]),AppointmentModule],
  controllers: [PatientController],
  providers: [PatientService, AppService],
  exports: [PatientService]
})
export class PatientModule {}
