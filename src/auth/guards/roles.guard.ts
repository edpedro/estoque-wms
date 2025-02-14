import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private readonly jwtService: JwtService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!requiredRoles || requiredRoles.length === 0) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization?.split(' ')[1];

    if (!token) {
      throw new UnauthorizedException('Token de autenticação ausente');
    }

    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: process.env.SECRET_KEY,
      });

      if (!payload) {
        throw new UnauthorizedException('Dados invalidos');
      }

      const hasPermissions = requiredRoles.every((requiredPermission) =>
        payload.permission.some(
          (userPermission) => userPermission.name === requiredPermission,
        ),
      );

      if (!hasPermissions) {
        throw new ForbiddenException(
          'Você não tem permissão para acessar este recurso.',
        );
      }

      return true;
    } catch (error) {
      throw new ForbiddenException(
        'Você não tem permissão para acessar este recurso.',
      );
    }
  }
}
