import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { LoginDto } from './dto/login.dto';
import { AuthGuard } from './auth.guard';
import { Request } from 'express';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }


    @Post('login')
    async signIn(@Body() signInDto: LoginDto) {
        return await this.authService.signIn(signInDto);
    }

    @UseGuards(AuthGuard)
    @ApiBearerAuth()
    @Get('profile')
    getProfile(@Req() request: any) {
        return request.user;
    }
}
