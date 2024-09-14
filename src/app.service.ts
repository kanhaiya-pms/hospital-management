import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateDoctorDto } from './doctor/dto/create-doctor.dto';

const user = []

@Injectable()
export class AppService {
  getHello(): any {
    return user;
  }

  async generateUserName(createDoctorDto: CreateDoctorDto): Promise<string> {
    const date = new Date();
    const userName = await `DOC_${createDoctorDto.first_name.slice(0, 1).toUpperCase()}${createDoctorDto.last_name.slice(0, 1).toUpperCase()}${date.getDate()}${date.getMonth() + 1}${date.getFullYear()}`;
    return userName;
  }


}
