import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';
import { DatabaseService } from 'src/database/database.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class DoctorService {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly jwtService: JwtService,
  ) {}

  async create(createDoctorDto: CreateDoctorDto) {
    const {
      email,
      phoneNumber,
      password,
      bloodgroup,
      dateofBirth,
      degree,
      genre,
      gender,
      image,
      name,
    } = createDoctorDto;

    // Check for existing email
    const isUserEmailExists = await this.databaseService.user.findUnique({
      where: { email },
    });
    const isDoctorEmailExists = await this.databaseService.doctor.findUnique({
      where: { email },
    });
    if (isUserEmailExists || isDoctorEmailExists) {
      throw new BadRequestException('Email already exists.');
    }

    // Check for existing phone number
    const isPhoneExists = await this.databaseService.user.findUnique({
      where: { phoneNumber },
    });
    const isDoctorPhoneExists = await this.databaseService.doctor.findUnique({
      where: { phoneNumber },
    });
    if (isPhoneExists || isDoctorPhoneExists) {
      throw new BadRequestException('Phone number already exists.');
    }

    // Hash password
    let encryptedPassword: string;
    try {
      encryptedPassword = await bcrypt.hash(password, 10);
    } catch {
      throw new Error('Failed to encrypt password.');
    }

    // Create doctor
    const doctor = await this.databaseService.doctor.create({
      data: {
        email,
        phoneNumber,
        password: encryptedPassword,
        bloodgroup,
        dateofBirth,
        degree,
        genre,
        gender,
        image,
        name,
      },
    });

    // Generate and return access token
    const payload = { id: doctor.id, username: doctor.name };
    const accessToken = await this.jwtService.signAsync(payload);

    return {
      message: 'Doctor created successfully',
      data: { ...doctor, accessToken },
    };
  }

  private async ensureDoctorExists(id: number) {
    const doctor = await this.databaseService.doctor.findUnique({
      where: { id },
    });
    if (!doctor) {
      throw new NotFoundException('Doctor not found');
    }
    return doctor;
  }

  async findOne(id: number) {
    const doctor = await this.ensureDoctorExists(id);
    return { message: 'Doctor fetched successfully', data: doctor };
  }

  async update(id: number, updateDoctorDto: UpdateDoctorDto) {
    await this.ensureDoctorExists(id);
    const updatedDoctor = await this.databaseService.doctor.update({
      where: { id },
      data: updateDoctorDto,
    });
    return { message: 'Doctor updated successfully', data: updatedDoctor };
  }

  async remove(id: number) {
    await this.ensureDoctorExists(id);
    await this.databaseService.doctor.delete({ where: { id } });
    return { message: 'Doctor deleted successfully' };
  }

  async findAll() {
    const allDoctors = await this.databaseService.doctor.findMany();
    return { message: 'Doctors fetched successfully', data: allDoctors };
  }
}
