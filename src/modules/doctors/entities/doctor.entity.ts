// src/doctor/entities/doctor.entity.ts
import { ApiProperty } from '@nestjs/swagger';

export class DoctorEntity {
  @ApiProperty()
  id: number;

  @ApiProperty()
  names: string;

  @ApiProperty()
  last_names: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  request_password_change: boolean;

  @ApiProperty()
  registration_date: Date;

  @ApiProperty({ nullable: true })
  last_login: Date | null;
}
