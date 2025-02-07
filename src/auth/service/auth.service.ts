import { Injectable } from '@nestjs/common';
import { compareSync } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UserDto } from 'src/users/dto/user.dto';
import { ListUserUserNameUseCase } from 'src/users/usecases/list-user-username.usercase';
import { UserAuthDto } from '../dto/UserAuthDto';

@Injectable()
export class AuthService {
  constructor(
    private readonly listUserUsernameUseCase: ListUserUserNameUseCase,
    private readonly jwtService: JwtService,
  ) {}

  async login(user: UserDto) {
    const payload = {
      sub: user.id,
      first_name: user.first_name,
      email: user.email,
      username: user.username,
      role: user.role,
      isBlocked: user.isBlocked,
    };

    return {
      payload,
      token: this.jwtService.sign(payload),
    };
  }

  async validateUser(
    username: string,
    password: string,
  ): Promise<UserAuthDto | null> {
    let user: UserAuthDto | null;

    try {
      user = await this.listUserUsernameUseCase.execute(username);
    } catch (error) {
      return null; // Retorna null em caso de erro
    }

    // Verifica se o usuário existe e está ativo
    if (!user || !user.active) {
      return null;
    }

    // Verifica se a senha está correta
    const isPasswordValid = compareSync(password, user.password);
    if (!isPasswordValid) {
      return null;
    }

    // Retorna o usuário se todas as verificações passarem
    return user;
  }
}
