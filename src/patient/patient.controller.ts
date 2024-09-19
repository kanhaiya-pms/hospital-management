import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, Request, UseGuards } from '@nestjs/common';
import { PatientService } from './patient.service';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';

@ApiTags('patient')
@Controller('patient')
export class PatientController {
  constructor(private readonly patientService: PatientService) { }

  @Post()
  create(@Body() createPatientDto: CreatePatientDto) {
    return this.patientService.create(createPatientDto);
  }

  @Get()
  findAll() {
    return this.patientService.findAll();
  }

  @Get('my-appointment')
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  myAppointment(@Request() req: any) {
    return this.patientService.myAppointment(req.user.sub);
  }


  @Get('forget-password/:username')
  forgetPassword(@Param('username') username: string) {
    console.log("runnning",username);
    
    // return this.patientService.forgetPassword(username)
  }
  
  @Get(':id')
  findOne(@Param('id') id: string) {
    console.log(id);
    
    return this.patientService.findOne(id);
  }


  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePatientDto: UpdatePatientDto) {
    return this.patientService.update(id, updatePatientDto);
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id') id: string) {
    return this.patientService.remove(id);
  }
}
