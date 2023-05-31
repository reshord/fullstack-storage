import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { AuthGuard } from '@nestjs/passport/dist';
import { Request } from '@nestjs/common';
import { ApiBody } from '@nestjs/swagger';
import { UserEntity } from 'src/users/entities/user.entity';
import { LocalAuthGuard } from './guards/local.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @ApiBody({type: CreateUserDto})
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user as UserEntity)
  }

  @Post('register')
  async register(@Body() dto: CreateUserDto) {
    return this.authService.register(dto)
  }
}
