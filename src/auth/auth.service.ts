import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UserEntity } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { JwtStrategy } from './strategies/jwt.strategy';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService
  ) {}

  findByEmail(email: string) {
    return this.userService.findByEmail(email)
  }

  findById(id: number) {
    return this.userService.findById(id)
  }

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userService.findByEmail(email)

    if(user && user.password === password) {
      const {password, ...result} = user

      return result
    }

    return null
  }

  async register(dto: CreateUserDto) {
    const user = await this.findByEmail(dto.email)

    if(user) throw new BadRequestException('Пользователь уже существует')
    
    return dto
  }

  async login(user: UserEntity) {
    const payload = {
      id: user.id
    }

    return {
      token: this.jwtService.
    }
  }
}
