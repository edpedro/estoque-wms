import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateAddressDto } from '../dto/create-address.dto';
import { AddressDto } from '../dto/address.dto';
import { UpdateAddressDto } from '../dto/update-address.dto';

@Injectable()
export class AddressRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createAddress(data: CreateAddressDto, idUser: string) {
    const result = await this.prisma.address.create({
      data: {
        name: data.name,
        capacity: data.capacity,
        createId: idUser,
        companyId: data.companyId,
      },
      select: {
        id: true,
        name: true,
        capacity: true,
        status: true,
        isBlocked: true,
        created_at: true,
        updated_at: true,
        company: {
          select: {
            id: true,
            name: true,
            cnpj: true,
            isBlocked: true,
          },
        },
        user: {
          select: {
            id: true,
            first_name: true,
            last_name: true,
            email: true,
            username: true,
            role: true,
          },
        },
      },
    });

    return result;
  }

  async findById(id: number): Promise<AddressDto | null> {
    const result = await this.prisma.address.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        capacity: true,
        status: true,
        isBlocked: true,
        created_at: true,
        updated_at: true,
        company: {
          select: {
            id: true,
            name: true,
            cnpj: true,
            isBlocked: true,
          },
        },
        user: {
          select: {
            id: true,
            first_name: true,
            last_name: true,
            email: true,
            username: true,
            role: true,
          },
        },
      },
    });

    return result;
  }

  async findByName(name: string) {
    const result = await this.prisma.address.findFirst({
      where: { name },
      select: {
        id: true,
        name: true,
        capacity: true,
        status: true,
        isBlocked: true,
        created_at: true,
        updated_at: true,
        company: {
          select: {
            id: true,
            name: true,
            cnpj: true,
            isBlocked: true,
          },
        },
        user: {
          select: {
            id: true,
            first_name: true,
            last_name: true,
            email: true,
            username: true,
            role: true,
          },
        },
      },
    });

    return result;
  }

  async findAllAddress(): Promise<AddressDto[]> {
    const result = await this.prisma.address.findMany({
      select: {
        id: true,
        name: true,
        capacity: true,
        status: true,
        isBlocked: true,
        created_at: true,
        updated_at: true,
        company: {
          select: {
            id: true,
            name: true,
            cnpj: true,
            isBlocked: true,
          },
        },
        user: {
          select: {
            id: true,
            first_name: true,
            last_name: true,
            email: true,
            username: true,
            role: true,
          },
        },
      },
    });

    return result;
  }

  async updateAddress(id: number, data: UpdateAddressDto) {
    return await this.prisma.address.update({
      where: { id },
      data,
      select: {
        id: true,
        name: true,
        capacity: true,
        status: true,
        isBlocked: true,
        created_at: true,
        updated_at: true,
        company: {
          select: {
            id: true,
            name: true,
            cnpj: true,
            isBlocked: true,
          },
        },
        user: {
          select: {
            id: true,
            first_name: true,
            last_name: true,
            email: true,
            username: true,
            role: true,
          },
        },
      },
    });
  }

  async removeAddress(id: number) {
    return await this.prisma.address.delete({
      where: { id },
    });
  }

  async blockedAddress(id: number, data: UpdateAddressDto) {
    return await this.prisma.address.update({
      where: { id },
      data: {
        isBlocked: data.isBlocked,
      },
      select: {
        id: true,
        name: true,
        capacity: true,
        status: true,
        isBlocked: true,
        created_at: true,
        updated_at: true,
        company: {
          select: {
            id: true,
            name: true,
            cnpj: true,
            isBlocked: true,
          },
        },
        user: {
          select: {
            id: true,
            first_name: true,
            last_name: true,
            email: true,
            username: true,
            role: true,
          },
        },
      },
    });
  }
}
