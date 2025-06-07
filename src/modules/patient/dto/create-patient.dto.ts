import { CreateTutorDto } from './create-tutor.dto';

export class CreatePatientDto {
  doctor_id: number;
  names: string;
  last_names: string;
  age: number;
  tutor?: CreateTutorDto;
}
