import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  imports:[],
  controllers: [CategoryController],
  providers: [CategoryService,PrismaService],
})
export class CategoryModule {}
