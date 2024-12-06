import { BloodGroup, Gender } from '@prisma/client';
import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const updateDoctorSchema = z
  .object({
    email: z
      .string({ required_error: 'Email is required' })
      .email('Invalid Email Format')
      .transform((value) => value.toLowerCase())
      .optional(),
    name: z.string({ required_error: 'Name is required' }).optional(),
    phoneNumber: z
      .string({ required_error: 'Phone number is required' })
      .optional(),
    gender: z
      .enum([Gender.Male, Gender.Female, Gender.Others], {
        required_error: 'Gender is required',
      })
      .optional(),
    bloodgroup: z
      .enum(
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
      )
      .optional(),

    dateofBirth: z
      .string({ required_error: 'Date of birth is required' })
      .optional(),
    genre: z.string({ required_error: 'Genre is required' }).optional(),
    degree: z.string({ required_error: 'Degree is required' }).optional(),
    image: z.string({ required_error: 'Image URL is required' }).optional(), // Default value
  })
  .strict();

export class UpdateDoctorDto extends createZodDto(updateDoctorSchema) {}
