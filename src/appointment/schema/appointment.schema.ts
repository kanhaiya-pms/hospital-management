import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Doctor } from 'src/doctor/schema/doctor.schema';
import { Patient } from 'src/patient/schema/patient.schema';
import { eStatus } from 'src/utils/interface';

export type AppointmentDocument = HydratedDocument<Appointment>;


@Schema({ timestamps: true, versionKey: false })

export class Appointment {
   
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "Patient" })
    patient: Patient;

    @Prop({ required: true, type: String })
    appointmentfor : string;

    @Prop({ required: true, type: Date })
    appointmentDate: Date;

    @Prop({type: String, enum: [eStatus.ACCEPTED, eStatus.REJECT, eStatus.REQUEST], default: eStatus.REQUEST })
    status: string;

    @Prop({ required: true, type: String })
    feedback: string;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "Doctor" })
    doctor: Doctor;

     
}
export const AppointmentSchema = SchemaFactory.createForClass(Appointment);