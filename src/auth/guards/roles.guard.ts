import { CacheService } from './../../cache/cache.service';
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
import { UserAuthDto } from '../dto/UserAuthDto';
import { ListUserIdUseCase } from 'src/users/usecases/list-user-id.usecase';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private readonly jwtService: JwtService,
    private readonly cacheService: CacheService,
    private readonly listUserIdUseCase: ListUserIdUseCase,
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
      const payload: UserAuthDto = await this.jwtService.verifyAsync(token, {
        secret: process.env.SECRET_KEY,
      });

      if (!payload) {
        throw new UnauthorizedException('Dados inválidos');
      }

      if (payload.isBlocked === true || payload.active === false) {
        throw new UnauthorizedException('Usuário bloqueado.');
      }

      if (payload?.role === 'admin') {
        return true;
      }

      let userResult = await this.cacheService.getCache(payload.id);

      if (!userResult) {
        const result = await this.listUserIdUseCase.execute(payload.id);
        await this.cacheService.setCache(payload.id, result);
        userResult = result;
      }

      const hasPermissions = requiredRoles.every(
        (requiredPermission) =>
          userResult.permissions?.some(
            (userPermission) => userPermission.name === requiredPermission,
          ) ?? false,
      );

      if (!hasPermissions) {
        throw new ForbiddenException(
          'Você não tem permissão para acessar este recurso.',
        );
      }

      return true;
    } catch (error) {
      if (error.name === 'JsonWebTokenError') {
        throw new UnauthorizedException(
          'Token inválido ou assinatura incorreta',
        );
      }

      if (error.name === 'TokenExpiredError') {
        throw new UnauthorizedException('Token expirado');
      }

      if (
        error instanceof UnauthorizedException ||
        error instanceof ForbiddenException
      ) {
        throw error;
      }

      console.error('Erro desconhecido na autenticação:', error);
      throw new UnauthorizedException('Acesso inválido');
    }
  }
}
