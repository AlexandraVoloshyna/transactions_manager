import { BadRequestException, Injectable } from '@nestjs/common';
import { UserRepository } from 'src/repository/user.repository';
import { UserEntity } from './user.entity';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  public async getUserById(id: number): Promise<UserEntity> {
    const user = this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new BadRequestException('User is not found');
    }
    return user;
  }

  public async login(loginDto: LoginDto): Promise<string> {
    const { email, password } = loginDto;
    const user = await this.userRepository.findOne({
      where: { email },
    });
    if (!user) {
      throw new BadRequestException('Invalid email or password');
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      throw new BadRequestException('Invalid email or password');
    }
    const token = await this.jwtService.signAsync({ id: user.id });
    return token;
  }

  public async register(registerDto: RegisterDto): Promise<void> {
    const isExist = await this.userRepository.findOne({
      where: { email: registerDto.email },
    });
    if (isExist) {
      throw new BadRequestException('User already exist');
    }
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(registerDto.password, salt);
    const user = this.userRepository.create({
      email: registerDto.email,
      password: hashedPassword,
    });
    await this.userRepository.save(user);
  }
}
