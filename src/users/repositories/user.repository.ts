import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { UserDto } from '../dto/user.dto';
import { EncryptedPassword } from 'src/users/utils/users/encrypted-password';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UserAuthDto } from 'src/auth/dto/UserAuthDto';

@Injectable()
export class UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createUser(data: CreateUserDto): Promise<UserDto> {
    const hashedPassword = await EncryptedPassword(data.password);

    const user = await this.prisma.user.create({
      data: {
        first_name: data.first_name,
        last_name: data.last_name,
        email: data.email,
        username: data.username,
        password: hashedPassword,
        role: data.role,
        active: data.active,
        isBlocked: data.isBlocked,
        login_attempts: data.login_attempts,
        permissionUser: data.permission_id?.length
          ? {
              create: data.permission_id.map((permissionId) => ({
                permission: { connect: { id: permissionId } },
              })),
            }
          : undefined,
        companyUser: data.companyId?.length
          ? {
              create: data.companyId.map((company_Id) => ({
                company: { connect: { id: company_Id } },
              })),
            }
          : undefined,
      },
      select: {
        id: true,
        first_name: true,
        last_name: true,
        email: true,
        username: true,
        role: true,
        isBlocked: true,
        login_attempts: true,
        enterpriseId: true,
        active: true,
        created_at: true,
        updated_at: true,
        lastLogin: true,
        permissionUser: {
          select: {
            permission: {
              select: {
                id: true,
                name: true,
                description: true,
              },
            },
          },
        },
        companyUser: {
          select: {
            company: {
              select: {
                id: true,
                cnpj: true,
                name: true,
                isBlocked: true,
              },
            },
          },
        },
      },
    });
    const formattedUser: UserDto = {
      id: user.id,
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      username: user.username,
      role: user.role,
      isBlocked: user.isBlocked,
      login_attempts: user.login_attempts,
      enterpriseId: user.enterpriseId,
      active: user.active,
      created_at: user.created_at,
      updated_at: user.updated_at,
      lastLogin: user.lastLogin,
      permissions: user.permissionUser.map((perm) => perm.permission),
      companies: user.companyUser.map((comp) => comp.company),
    };

    return formattedUser;
  }

  async findByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: {
        email,
      },
      include: {
        permissionUser: true,
        companyUser: true,
      },
    });
  }

  async findByUserName(username: string): Promise<UserAuthDto | null> {
    const user = await this.prisma.user.findFirst({
      where: {
        username,
      },
      select: {
        id: true,
        first_name: true,
        last_name: true,
        email: true,
        password: true,
        username: true,
        role: true,
        isBlocked: true,
        login_attempts: true,
        enterpriseId: true,
        active: true,
        created_at: true,
        updated_at: true,
        lastLogin: true,
        permissionUser: {
          select: {
            permission: {
              select: {
                id: true,
                name: true,
                description: true,
              },
            },
          },
        },
        companyUser: {
          select: {
            company: {
              select: {
                id: true,
                cnpj: true,
                name: true,
                isBlocked: true,
              },
            },
          },
        },
      },
    });

    if (!user) return null;

    const formattedUser: UserAuthDto = {
      id: user.id,
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      password: user.password,
      username: user.username,
      role: user.role,
      isBlocked: user.isBlocked,
      login_attempts: user.login_attempts,
      enterpriseId: user.enterpriseId,
      active: user.active,
      created_at: user.created_at,
      updated_at: user.updated_at,
      lastLogin: user.lastLogin,
      permissions: user.permissionUser.map((perm) => perm.permission),
      companies: user.companyUser.map((comp) => comp.company),
    };

    return formattedUser;
  }

  async findByIdUser(id: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        first_name: true,
        last_name: true,
        email: true,
        username: true,
        role: true,
        isBlocked: true,
        login_attempts: true,
        enterpriseId: true,
        active: true,
        created_at: true,
        updated_at: true,
        lastLogin: true,
        permissionUser: {
          select: {
            permission: {
              select: {
                id: true,
                name: true,
                description: true,
              },
            },
          },
        },
        companyUser: {
          select: {
            company: {
              select: {
                id: true,
                cnpj: true,
                name: true,
                isBlocked: true,
              },
            },
          },
        },
      },
    });

    if (!user) return null;

    const formattedUser: UserDto = {
      id: user.id,
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      username: user.username,
      role: user.role,
      isBlocked: user.isBlocked,
      login_attempts: user.login_attempts,
      enterpriseId: user.enterpriseId,
      active: user.active,
      created_at: user.created_at,
      updated_at: user.updated_at,
      lastLogin: user.lastLogin,
      permissions: user.permissionUser.map((perm) => perm.permission),
      companies: user.companyUser.map((comp) => comp.company),
    };

    return formattedUser;
  }

  async findAllUsers(): Promise<UserDto[]> {
    const users = await this.prisma.user.findMany({
      select: {
        id: true,
        first_name: true,
        last_name: true,
        email: true,
        username: true,
        role: true,
        isBlocked: true,
        login_attempts: true,
        enterpriseId: true,
        active: true,
        created_at: true,
        updated_at: true,
        lastLogin: true,
        permissionUser: {
          select: {
            permission: {
              select: {
                id: true,
                name: true,
                description: true,
              },
            },
          },
        },
        companyUser: {
          select: {
            company: {
              select: {
                id: true,
                cnpj: true,
                name: true,
                isBlocked: true,
              },
            },
          },
        },
      },
    });

    return users.map((user) => ({
      id: user.id,
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      username: user.username,
      role: user.role,
      isBlocked: user.isBlocked,
      login_attempts: user.login_attempts,
      enterpriseId: user.enterpriseId,
      active: user.active,
      created_at: user.created_at,
      updated_at: user.updated_at,
      lastLogin: user.lastLogin,
      permissions: user.permissionUser.map((perm) => perm.permission),
      companies: user.companyUser.map((comp) => comp.company),
    }));
  }

  async update(id: string, data: UpdateUserDto) {
    const user = await this.prisma.user.update({
      where: {
        id,
      },
      data,
      select: {
        id: true,
        first_name: true,
        last_name: true,
        email: true,
        username: true,
        role: true,
        isBlocked: true,
        login_attempts: true,
        enterpriseId: true,
        active: true,
        created_at: true,
        updated_at: true,
        lastLogin: true,
        permissionUser: {
          select: {
            permission: {
              select: {
                id: true,
                name: true,
                description: true,
              },
            },
          },
        },
        companyUser: {
          select: {
            company: {
              select: {
                id: true,
                cnpj: true,
                name: true,
                isBlocked: true,
              },
            },
          },
        },
      },
    });

    const formattedUser: UserDto = {
      id: user.id,
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      username: user.username,
      role: user.role,
      isBlocked: user.isBlocked,
      login_attempts: user.login_attempts,
      enterpriseId: user.enterpriseId,
      active: user.active,
      created_at: user.created_at,
      updated_at: user.updated_at,
      lastLogin: user.lastLogin,
      permissions: user.permissionUser.map((perm) => perm.permission),
      companies: user.companyUser.map((comp) => comp.company),
    };

    return formattedUser;
  }

  async remove(id: string) {
    return await this.prisma.user.update({
      where: {
        id,
      },
      data: {
        active: false,
      },
    });
  }
}
