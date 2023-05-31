import { BadRequestException, ForbiddenException, Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UserEntity } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService
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
    try {

      const userData = await this.userService.create(dto)

      return {
        token: this.jwtService.sign({id: userData.id})
      }

    } catch(e) {
      throw new ForbiddenException('Ошибка при регистрации')
    }
  }

  async login(user: UserEntity) {
    return {
      token: this.jwtService.sign({id: user.id})
    }
  }
}
