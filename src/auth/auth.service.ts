import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService
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
}
