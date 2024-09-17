import { BadRequestException, Injectable, Optional, UnauthorizedException } from '@nestjs/common';
import { DoctorService } from 'src/doctor/doctor.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { PatientService } from 'src/patient/patient.service';
import { AppService } from 'src/app.service';
import { eRole } from 'src/utils/interface';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
    constructor(private readonly docterSevice: DoctorService,
        @Optional() private patientService: PatientService,
        private appService: AppService,
        private jwtService: JwtService
    ) { }

    async signIn(dto: LoginDto) {
        const { pass, username } = dto

        let user: any = await this.docterSevice.findOne(username);

        user = !user ? await this.patientService.findOne(username) : user

        if (!user) {
            throw new UnauthorizedException()
        }

        const passMatch = await bcrypt.compare(pass, user.password)

        if (!passMatch) {
            throw new UnauthorizedException();
        }
        // const { password, ...result } = user;

        const payload = {
            username,
            email: user.email,
            sub: user._id,
            role: user.role,
            name: user.first_name + " " + user.last_name,
        }

        const access_token = await this.jwtService.signAsync(payload, {
            secret: process.env.SECRET
        })

        return {
            data: payload,
            access_token
        };
    }

    async forgetPassword(username: string) {
        console.log(username);

        let user: any = await this.patientService.findOne(username)

        user = !user ? await this.docterSevice.findOne(username) : user

        if (!user) {
            throw new BadRequestException("wrong username!")
        }

        const res = await this.appService.sendEmail(user.email)

        if (user.role == eRole.DOCTOR) {
            await this.patientService.update(user._id, {
                otp: res.otp
            })

            const { otp, ...data } = res

            return {
                data
            }
        }

        await this.patientService.update(user._id, {
            otp: res.otp
        })

        const { otp, ...data } = res

        return {
            data
        }
    }

}
