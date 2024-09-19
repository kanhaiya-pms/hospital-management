import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Doctor } from './schema/doctor.schema';
import * as bcrypt from 'bcrypt';
import { AppService } from 'src/app.service';
import { AppointmentService } from 'src/appointment/appointment.service';

@Injectable()
export class DoctorService {
  constructor(@InjectModel(Doctor.name) private doctorModel: Model<Doctor>,
    private readonly appService: AppService,
    private readonly appointmentService: AppointmentService
  ) { }




  async create(createDoctorDto: CreateDoctorDto) {
    const doctor = await this.doctorModel.findOne({ email: createDoctorDto.email })

    if (doctor) {
      throw new BadRequestException("email should be uniqe")
    }

    const userName = await this.appService.generateUserName(createDoctorDto, "DOC")

    const hashPass = await bcrypt.hash(createDoctorDto.password, 10)

    const { password, username, ...dto } = createDoctorDto

    return await this.doctorModel.create({
      username: userName,
      ...dto,
      password: hashPass
    });
  }

  async findAll() {
    const data = await this.doctorModel.find();
    const count = await this.doctorModel.countDocuments();
    return {
      data,
      count
    };
  }

  async myAppointment(id: string){
    return await this.appointmentService.Doctorappointment(id)
  }

  async findOne(username: string) {
    return await this.doctorModel.findOne({username});
  }

 async update(id: string, dto: UpdateDoctorDto) {
    return await this.doctorModel.findByIdAndUpdate(id,dto);
  }

  async remove(id: string) {
    return await this.doctorModel.findByIdAndDelete(id);
  }
}
