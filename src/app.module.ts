import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { PrismaService } from './prisma/prisma.service';
import { PermissionsModule } from './permissions/permissions.module';
import { AuthModule } from './auth/auth.module';
import { CampanyModule } from './company/campany.module';

@Module({
  imports: [UsersModule, PermissionsModule, AuthModule, CampanyModule],
  providers: [PrismaService],
})
export class AppModule {}
