import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { PrismaService } from './prisma/prisma.service';
import { PermissionsModule } from './permissions/permissions.module';

@Module({
  imports: [UsersModule, PermissionsModule],
  providers: [PrismaService],
})
export class AppModule {}
