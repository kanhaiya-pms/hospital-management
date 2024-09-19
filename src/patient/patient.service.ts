import { BadRequestException, Injectable } from '@nestjs/common';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Patient } from './schema/patient.schema';
import { Model } from 'mongoose';
import { AppService } from 'src/app.service';
import * as bcrypt from 'bcrypt';
import { AppointmentService } from 'src/appointment/appointment.service';

@Injectable()
export class PatientService {
  constructor(@InjectModel(Patient.name) private PatientModel: Model<Patient>,
  private readonly appService: AppService,
  private readonly appointmentService: AppointmentService
){}


  async create(createDoctorDto: CreatePatientDto) {
    const doctor = await this.PatientModel.findOne({ email: createDoctorDto.email })

    if (doctor) {
      throw new BadRequestException("email should be uniqe")
    }

    const userName = await this.appService.generateUserName(createDoctorDto, "PAT")

    const hashPass = await bcrypt.hash(createDoctorDto.password, 10)

    const { password, username, ...dto } = createDoctorDto

    return await this.PatientModel.create({
      username: userName,
      ...dto,
      password: hashPass
    });
  }

  async findAll() {
    const data = await this.PatientModel.find();
    const count = await this.PatientModel.countDocuments();
    return {
      data,
      count
    };
  }

  async findOne(username: string) {
    return await this.PatientModel.findOne({username});
  }

 async myAppointment(id: string){
    return await this.appointmentService.Patientappointment(id)
  }


  // async forgetPassword(username: string){
  //   console.log(username);
    
  //   const user = await this.PatientModel.findOne({username})

  //   if (!user) {
  //     throw new BadRequestException("wrong username!")
  //   }

  //   const res = await this.appService.sendEmail(user.email)

  //   await this.PatientModel.findByIdAndUpdate(user._id,{
  //     otp: res.otp
  //   })

  //   const {otp, ...data} = res

  //   return {
  //     data
  //   }
  // }

  update(id: any, data: UpdatePatientDto) {
    return this.PatientModel.findByIdAndUpdate(id,data);
  }

 async remove(id: string) {
    return await this.PatientModel.findByIdAndDelete(id);
  }
}
