import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PrismaService } from 'src/module/prisma/prisma.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private prismaService: PrismaService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: { userId: number }) {
    const user = await this.prismaService.user.findUnique({
      where: { id: payload.userId },
      select: { id: true, role: true, isActive: true },
    });
    // Si el usuario no existe o está inactivo, retornar null
    if (!user || !user.isActive) return null;
    // Verificación de rol
    if (user.role !== 'ADMIN') {
      throw new UnauthorizedException('Insufficient permissions');
    }

    return { userId: user.id, role: user.role };
  }
}
