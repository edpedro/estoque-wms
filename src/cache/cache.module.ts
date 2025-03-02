import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CacheService } from './cache.service';

@Module({
  controllers: [],
  providers: [CacheService, PrismaService],
  exports: [CacheService],
})
export class CacheModule {}
