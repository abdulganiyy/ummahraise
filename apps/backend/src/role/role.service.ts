import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';

@Injectable()
export class RoleService {

  constructor(private prisma: PrismaService) {}

  create(data) {
    return this.prisma.role.create({data})
  }

  
  
  findAll() {
    return this.prisma.role.findMany()
  }

  findOne(name:string):Promise<any> {
    return this.prisma.role.findFirst({
      where: {
        name
      },
    })
  }
}


// import { Injectable } from '@nestjs/common';
// import { CreateRoleDto } from './dto/create-role.dto';
// import { UpdateRoleDto } from './dto/update-role.dto';

// @Injectable()
// export class RoleService {
//   create(createRoleDto: CreateRoleDto) {
//     return 'This action adds a new role';
//   }

//   findAll() {
//     return `This action returns all role`;
//   }

//   findOne(id: number) {
//     return `This action returns a #${id} role`;
//   }

//   update(id: number, updateRoleDto: UpdateRoleDto) {
//     return `This action updates a #${id} role`;
//   }

//   remove(id: number) {
//     return `This action removes a #${id} role`;
//   }
// }
