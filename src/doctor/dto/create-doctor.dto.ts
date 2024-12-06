import { BloodGroup, Gender } from '@prisma/client';
import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const createDoctorSchema = z
  .object({
    email: z
      .string({ required_error: 'Email is required' })
      .email('Invalid Email Format')
      .transform((value) => value.toLowerCase()),
    password: z.string({ required_error: 'Password is required' }),
    name: z.string({ required_error: 'Name is required' }),
    phoneNumber: z.string({ required_error: 'Phone number is required' }),
    gender: z.enum([Gender.Male, Gender.Female, Gender.Others], {
      required_error: 'Gender is required',
    }),
    bloodgroup: z.enum(
      [
        BloodGroup.AB_NEGATIVE,
        BloodGroup.AB_POSITIVE,
        BloodGroup.A_NEGATIVE,
        BloodGroup.A_POSITIVE,
        BloodGroup.B_NEGATIVE,
        BloodGroup.B_POSITIVE,
        BloodGroup.O_NEGATIVE,
        BloodGroup.O_POSITIVE,
      ],
      { required_error: 'Blood group is required' },
    ),

    dateofBirth: z.string({ required_error: 'Date of birth is required' }),
    genre: z.string({ required_error: 'Genre is required' }),
    degree: z.string({ required_error: 'Degree is required' }),
    image: z
      .string({ required_error: 'Image URL is required' })
      .default('default-image.png'), // Default value
  })
  .strict();

export class CreateDoctorDto extends createZodDto(createDoctorSchema) {}
