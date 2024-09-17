import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateDoctorDto } from './doctor/dto/create-doctor.dto';
import * as nodemailer from 'nodemailer';


@Injectable()
export class AppService {
  getHello(): any {
    return "hello babe";
  }

  async generateUserName(createDoctorDto: CreateDoctorDto, type: string): Promise<string> {
    const date = new Date();
    const userName = await `${type}_${createDoctorDto.first_name.slice(0, 1).toUpperCase()}${createDoctorDto.last_name.slice(0, 1).toUpperCase()}${date.getDate()}${date.getMonth() + 1}${date.getFullYear()}`;
    return userName;
  }

  async sendEmail(email: string) {
    const genOtp = Math.floor(100000 + Math.random() * 900000);

    const transporter = nodemailer.createTransport({
      host: 'smtp.hostinger.com',
      port: 465,
      auth: {
        user: process.env.NODEMAILER_EMAIL,
        pass: process.env.NODEMAILER_PASSWORD,
      },
    });

    try {
      const info = await transporter.sendMail({
        from: '"Administrator" <kanhaiya.psa@postmortemshala.co.in>',
        to: `${email}, kanhaiyanri43@gmail.com`,
        subject: 'Reset - passwordr',
        html: ` <div style="font-family: Arial, sans-serif; line-height: 1.6;">
              <h2>Welcome, <span style="color:blue; font-weight: bold;"> ${email} </span> to auth-web-application!</h2>
              <p>Your OTP for forget-password is:</p>
              <p style="font-size: 24px; color:green; font-weight: bold;">${genOtp}</p>
              <p>Please enter this OTP to reset your password.</p>
              <p>If you did not request this OTP, please ignore this email.</p>
              <p>Best regards,</p>
              <p>auth-web-application(kanhaiya)</p>
            </div>"`,
      });
      console.log('Message Sent', info.response);
    } catch (error) {
      console.error('Error Occurred', error);
      throw new BadRequestException({
        message: 'Failed to send OTP email',
        error: 'MailError',
      });
    }

    return {
      status: true,
      otp: genOtp,
      message: 'OTP send successfuly',
    };
  }


}
