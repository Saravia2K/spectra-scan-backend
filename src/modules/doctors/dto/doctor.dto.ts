// src/doctor/dto/doctor.dto.ts
import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';

export class CreateDoctorDto {
  @IsString()
  names: string;

  @IsString()
  last_names: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;
}

export class UpdateDoctorDto {
  @IsOptional()
  @IsString()
  names?: string;

  @IsOptional()
  @IsString()
  last_names?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  @MinLength(6)
  password?: string;
}
