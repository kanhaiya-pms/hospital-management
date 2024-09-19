import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, Request } from '@nestjs/common';
import { AppointmentService } from './appointment.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';

@ApiTags('appointment')
@Controller('appointment')
export class AppointmentController {
  constructor(private readonly appointmentService: AppointmentService) {}

  @Post()
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  create(@Body() createAppointmentDto: CreateAppointmentDto, @Request() req: any) {
    return this.appointmentService.create(createAppointmentDto, req.user.sub);
  }

  @Get()
  findAll() {
    return this.appointmentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.appointmentService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAppointmentDto: UpdateAppointmentDto) {
    return this.appointmentService.update(+id, updateAppointmentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.appointmentService.remove(+id);
  }
}
