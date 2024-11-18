import { Body, Controller, Param, Patch, Post, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, RegisterDto } from './dto/auth.dto';
import { Role } from '@prisma/client';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    const user = await this.authService.register(registerDto);
    const token = await this.authService.generateToken(user);
    return {
      token: token,
      user: user,
    };
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    const user = await this.authService.login(loginDto);
    const token = await this.authService.generateToken(user);
    return {
      token: token,
      user: user,
    };
  }

  @Patch('users/:id/role')
  /*  @UseGuards(JwtAuthGuard) */
  async changeUserRole(
    @Request() req,
    @Param('id') userId: number,
    @Body('role') newRole: Role,
  ) {
    // req.user viene del JwtAuthGuard y contiene la info del token
    return this.authService.changeUserRole(req.user.id, userId, newRole);
  }
}
