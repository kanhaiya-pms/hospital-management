import { Injectable } from '@nestjs/common';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Appointment } from './schema/appointment.schema';
import { Model } from 'mongoose';

@Injectable()
export class AppointmentService {
  constructor(@InjectModel(Appointment.name) private appiontmentModel: Model<Appointment>){}
  
  async create(createAppointmentDto: CreateAppointmentDto, id: string) {
    return await this.appiontmentModel.create({
      ...createAppointmentDto,
      patient: id,
    });
  }

  async findAll() {
    const data = await this.appiontmentModel.find().populate('patient').populate('doctor');
    const count = await this.appiontmentModel.countDocuments()

    return {
      data,
      count
    }
  }

  async Doctorappointment(id: string){
    const data = await this.appiontmentModel.find({ doctor: id})
    const count = await this.appiontmentModel.countDocuments(data) 
    return {
      data,
      count
    }
  }

  async Patientappointment(id: string){
    const data = await this.appiontmentModel.find({ patient: id})
    const count = await this.appiontmentModel.countDocuments(data) 
    return {
      data,
      count
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} appointment`;
  }

  update(id: number, updateAppointmentDto: UpdateAppointmentDto) {
    return `This action updates a #${id} appointment`;
  }

  remove(id: number) {
    return `This action removes a #${id} appointment`;
  }
}
