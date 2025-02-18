import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

export class JwtStarty extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.SECRET_KEY || 'defaultSecretKey',
    });
  }

  async validate(paload: any) {
    return {
      id: paload.sub,
      username: paload.username,
      name: paload.name,
      role: paload.role,
      first_name: paload.first_name,
      email: paload.email,
      isBlocked: paload.isBlocked,
    };
  }
}
