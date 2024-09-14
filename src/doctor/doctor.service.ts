import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Doctor } from './schema/doctor.schema';
import * as bcrypt from 'bcrypt';
import { AppService } from 'src/app.service';

@Injectable()
export class DoctorService {
  constructor(@InjectModel(Doctor.name) private doctorModel: Model<Doctor>,
  private readonly appService: AppService
) {}
  



  async create(createDoctorDto: CreateDoctorDto) {
    const doctor = await this.doctorModel.findOne({ username: createDoctorDto.username})

    if (doctor) {
      throw new BadRequestException("username should be uniqe")
    }


    const userName = await this.appService.generateUserName(createDoctorDto)

    const hashPass = await bcrypt.hash(createDoctorDto.password, 10)

    const {password, username, ...dto} =createDoctorDto

    return await this.doctorModel.create({
      username: userName,
      ...dto,
      password: hashPass
    });
  }

  findAll() {
    return this.doctorModel.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} doctor`;
  }

  update(id: number, updateDoctorDto: UpdateDoctorDto) {
    return `This action updates a #${id} doctor`;
  }

  remove(id: number) {
    return `This action removes a #${id} doctor`;
  }
}
