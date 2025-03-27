import { CancelledInvoiceDto } from './../dto/cancelled-invoice.dto';
import { ListStockTypeIdUseCase } from './../../stock-type/usecases/list-stock-type-id.usecase';
import { ListItemsIdUseCase } from './../../items/usecases/list-items-id.usecase';
import { ListAddressIdUseCase } from './../../address/usecases/list-address-id.usecase';
import { ListCompanyIdUseCase } from 'src/company/usecases/list-company-id.usecase';
import { CreateInvoiceUseCase } from '../usecases/create-invoice.usecase';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateInvoiceDto } from '../dto/create-invoice.dto';
import { UpdateInvoiceDto } from '../dto/update-invoice.dto';
import { ReqUserDto } from 'src/auth/dto/req-user.dto';
import { ListInvoiceIdUseCase } from '../usecases/list-invoice-id.usecase';
import { ListInvoiceUseCase } from '../usecases/list-invoice.usecase';
import { ListInvoiceNumberUseCase } from '../usecases/list-invoice-number.usecase';
import { DeleteInvoiceIdUseCase } from '../usecases/delete-invoice.usecase';
import { UpdateInvoiceUseCase } from '../usecases/update-invoice.usecase';
import { ListAllCancelledInvoiceUseCase } from '../usecases/list-cancelled-invoice.usecase';
import { ListIdCancelledInvoiceUseCase } from '../usecases/list-cancelled-invoice-id.usecase';

@Injectable()
export class InvoiceService {
  constructor(
    private readonly createInvoiceUseCase: CreateInvoiceUseCase,
    private readonly listInvoiceIdUseCase: ListInvoiceIdUseCase,
    private readonly listInvoiceUseCase: ListInvoiceUseCase,
    private readonly listInvoiceNumberUseCase: ListInvoiceNumberUseCase,
    private readonly listCompanyIdUseCase: ListCompanyIdUseCase,
    private readonly listAddressIdUseCase: ListAddressIdUseCase,
    private readonly listItemsIdUseCase: ListItemsIdUseCase,
    private readonly listStockTypeIdUseCase: ListStockTypeIdUseCase,
    private readonly deleteInvoiceIdUseCase: DeleteInvoiceIdUseCase,
    private readonly updateInvoiceUseCase: UpdateInvoiceUseCase,
    private readonly listAllCancelledInvoiceUseCase: ListAllCancelledInvoiceUseCase,
    private readonly listIdCancelledInvoiceUseCase: ListIdCancelledInvoiceUseCase,
  ) {}

  async create(createInvoiceDto: CreateInvoiceDto, req: ReqUserDto) {
    if (createInvoiceDto.companyId) {
      const companyExits = await this.listCompanyIdUseCase.execute(
        createInvoiceDto.companyId,
      );

      if (!companyExits) {
        throw new HttpException('Empresa não cadastrada', HttpStatus.NOT_FOUND);
      }

      if (companyExits?.isBlocked) {
        throw new HttpException('Empresa inativa', HttpStatus.NOT_FOUND);
      }
    }

    if (
      !Array.isArray(createInvoiceDto.items) ||
      createInvoiceDto.items.length === 0
    ) {
      throw new HttpException(
        'A nota fiscal deve conter pelo menos um item',
        HttpStatus.BAD_REQUEST,
      );
    }

    const numberExist = await this.listInvoiceNumberUseCase.execute(
      createInvoiceDto.number,
    );

    if (numberExist) {
      if (!numberExist.isInvoiceCancelled) {
        throw new HttpException(
          'Nota fiscal já cadastrada',
          HttpStatus.NOT_FOUND,
        );
      }
    }

    const itemChecks = createInvoiceDto.items.map(async (item) => {
      const itemExist = await this.listItemsIdUseCase.execute(item.itemId);
      if (!itemExist) {
        throw new HttpException('Item não encontrado', HttpStatus.BAD_REQUEST);
      }

      if (item.addressId) {
        const addressExist = await this.listAddressIdUseCase.execute(
          item.addressId,
        );
        if (!addressExist) {
          throw new HttpException(
            'Endereço não encontrado',
            HttpStatus.BAD_REQUEST,
          );
        }
        if (addressExist.isBlocked) {
          throw new HttpException(
            'Endereço está bloqueado',
            HttpStatus.BAD_REQUEST,
          );
        }
      }

      if (item.stockTypeId) {
        const stockType = await this.listStockTypeIdUseCase.execute(
          item.stockTypeId,
        );
        if (!stockType) {
          throw new HttpException(
            'Tipo de estoque não encontrado',
            HttpStatus.BAD_REQUEST,
          );
        }
      }
    });

    await Promise.all(itemChecks);

    const seenIds = new Set();
    let hasDuplicate = false;

    for (const item of createInvoiceDto.items) {
      if (seenIds.has(item.itemId)) {
        hasDuplicate = true;
        break;
      }
      seenIds.add(item.itemId);

      if (item.divergenceQuantity && item.divergenceQuantity > 0) {
        if (!createInvoiceDto.divergenceReason) {
          throw new HttpException(
            'Favor informar o motivo da divergência',
            HttpStatus.BAD_REQUEST,
          );
        }
        if (!createInvoiceDto.divergence) {
          throw new HttpException(
            'Ativar modo divergência',
            HttpStatus.BAD_REQUEST,
          );
        }
        if (!item.divergenceItem) {
          throw new HttpException(
            'Se há "divergenceQuantity", o campo "divergenceItem" deve ser true',
            HttpStatus.BAD_REQUEST,
          );
        }
      } else {
        if (item.divergenceItem !== false) {
          throw new HttpException(
            'Se não há "divergenceQuantity", o campo "divergenceItem" deve ser false',
            HttpStatus.BAD_REQUEST,
          );
        }
      }
    }

    if (hasDuplicate) {
      throw new HttpException('Há itens duplicados', HttpStatus.BAD_REQUEST);
    }

    if (createInvoiceDto.divergence) {
      if (
        !createInvoiceDto.items.some(
          (item) => item.divergenceQuantity && item.divergenceItem === true,
        )
      ) {
        throw new HttpException(
          'Pelo menos um item deve ter "divergenceQuantity" e "divergenceItem": true quando "divergence" for true.',
          HttpStatus.BAD_REQUEST,
        );
      }
    }

    if (!createInvoiceDto.divergence) {
      if (
        createInvoiceDto.items.some((item) => item.divergenceItem !== false)
      ) {
        throw new HttpException(
          'Quando "divergence" for false, todos os itens devem ter "divergenceItem": false',
          HttpStatus.BAD_REQUEST,
        );
      }
    }

    if (!createInvoiceDto.divergence && createInvoiceDto.divergenceReason) {
      throw new HttpException(
        'Remova o campo "divergenceReason", pois não há divergência.',
        HttpStatus.BAD_REQUEST,
      );
    }

    try {
      const invoice = await this.createInvoiceUseCase.execute(
        createInvoiceDto,
        req.user.id,
      );
      return invoice;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }

      console.error('Erro ao cadastrar nota fiscal:', error);
      throw new HttpException(
        'Erro ao cadastrar nota fiscal',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAll() {
    return await this.listInvoiceUseCase.execute();
  }

  async findOne(id: number) {
    const invoice = await this.listInvoiceIdUseCase.execute(id);

    if (!invoice) {
      throw new HttpException('Dados não encontrado', HttpStatus.BAD_REQUEST);
    }

    return invoice;
  }

  async findAllCancelled() {
    return await this.listAllCancelledInvoiceUseCase.execute();
  }

  async findOneCancelled(id: number) {
    const invoice = await this.listIdCancelledInvoiceUseCase.execute(id);

    if (!invoice) {
      throw new HttpException('Dados não encontrado', HttpStatus.BAD_REQUEST);
    }

    return invoice;
  }

  async update(
    id: number,
    updateInvoiceDto: UpdateInvoiceDto,
    req: ReqUserDto,
  ) {
    const invoice = await this.listInvoiceIdUseCase.execute(id);

    if (!invoice) {
      throw new HttpException('Dados não encontrado', HttpStatus.BAD_REQUEST);
    }

    if (invoice.company.id) {
      const companyExits = await this.listCompanyIdUseCase.execute(
        invoice.company.id,
      );

      if (companyExits?.isBlocked) {
        throw new HttpException('Empresa inativa', HttpStatus.NOT_FOUND);
      }
    }

    if (invoice.number !== updateInvoiceDto.number!) {
      const numberExist = await this.listInvoiceNumberUseCase.execute(
        updateInvoiceDto.number!,
      );

      if (numberExist) {
        if (!numberExist.isInvoiceCancelled) {
          throw new HttpException(
            'Numero de nota fiscal já cadastrada',
            HttpStatus.NOT_FOUND,
          );
        }
      }
    }

    if (!updateInvoiceDto.items || !Array.isArray(updateInvoiceDto.items)) {
      throw new HttpException(
        `A lista de itens é obrigatória`,
        HttpStatus.BAD_REQUEST,
      );
    }

    for (const [index, item] of invoice.stock.entries()) {
      if (!updateInvoiceDto.items[index]) {
        throw new HttpException(
          `Item na posição ${index} não foi encontrado na requisição`,
          HttpStatus.BAD_REQUEST,
        );
      }

      const dtoItem = updateInvoiceDto.items[index];

      if (item.currentBalance === 0) {
        throw new HttpException(
          `Não é possível atualizar a nota fiscal, houve movimentação para o item ${item.item.code}`,
          HttpStatus.BAD_REQUEST,
        );
      }

      if (!updateInvoiceDto.divergence) {
        if (updateInvoiceDto.divergenceReason) {
          throw new HttpException(
            'Remova o campo "divergenceReason", pois não há divergência.',
            HttpStatus.BAD_REQUEST,
          );
        }
        if (dtoItem.divergenceItem === true) {
          throw new HttpException(
            `O campo "divergenceItem" tem que ser false`,
            HttpStatus.BAD_REQUEST,
          );
        }

        if (item.divergenceItem === true) {
          if (
            dtoItem.divergenceItem === false &&
            dtoItem.divergenceQuantity !== 0
          ) {
            throw new HttpException(
              `Informar saldo da divergência como 0`,
              HttpStatus.BAD_REQUEST,
            );
          }
        }

        if (item.divergenceQuantity > 0) {
          if (item.currentBalance !== item.divergenceQuantity) {
            throw new HttpException(
              `Não é possível atualizar a nota fiscal, item ${item.item.code} está em movimentação`,
              HttpStatus.BAD_REQUEST,
            );
          }
        } else {
          if (item.currentBalance !== item.invoiceQuantity) {
            throw new HttpException(
              `Não é possível atualizar a nota fiscal, item ${item.item.code} está em movimentação`,
              HttpStatus.BAD_REQUEST,
            );
          }
        }
      } else {
        if (item.divergenceItem) {
          if (dtoItem.divergenceQuantity === undefined) {
            throw new HttpException(
              `Informar saldo da divergência`,
              HttpStatus.BAD_REQUEST,
            );
          }
          if (dtoItem.divergenceQuantity === 0) {
            throw new HttpException(
              `Saldo da divergência tem que ser maior que 0`,
              HttpStatus.BAD_REQUEST,
            );
          }
        }
      }
    }

    const seenIds = new Set();
    let hasDuplicate = false;

    for (const item of updateInvoiceDto.items) {
      if (seenIds.has(item.itemId)) {
        hasDuplicate = true;
        break;
      }
      seenIds.add(item.itemId);
    }

    if (hasDuplicate) {
      throw new HttpException('Há itens duplicados', HttpStatus.BAD_REQUEST);
    }

    try {
      const update = await this.updateInvoiceUseCase.execute(
        id,
        updateInvoiceDto,
        req.user.id,
      );
      return update;
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'Erro ao atualizar nota fiscal',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async removeCancelledInvoice(
    id: number,
    cancelledInvoiceDto: CancelledInvoiceDto,
    req: ReqUserDto,
  ) {
    const invoice = await this.listInvoiceIdUseCase.execute(id);

    if (!invoice) {
      throw new HttpException('Dados não encontrado', HttpStatus.BAD_REQUEST);
    }

    if (invoice.company.id) {
      const companyExits = await this.listCompanyIdUseCase.execute(
        invoice.company.id,
      );

      if (companyExits?.isBlocked) {
        throw new HttpException('Empresa inativa', HttpStatus.NOT_FOUND);
      }
    }

    const itemChecks = invoice.stock.map(async (item) => {
      if (item.currentBalance === 0) {
        throw new HttpException(
          `Nao é possível cancelar a nota fiscal, houver movimentação para o item ${item.item.code}`,
          HttpStatus.BAD_REQUEST,
        );
      }
      if (item.divergenceQuantity > 0) {
        if (item.currentBalance !== item.divergenceQuantity) {
          throw new HttpException(
            `Não é possível cancelar a nota fiscal, item ${item.item.code} está em movimentação`,
            HttpStatus.BAD_REQUEST,
          );
        }
      } else if (item.currentBalance !== item.invoiceQuantity) {
        throw new HttpException(
          `Não é possível cancelar a nota fiscal, item ${item.item.code} está em movimentação`,
          HttpStatus.BAD_REQUEST,
        );
      }
    });

    await Promise.all(itemChecks);

    try {
      await this.deleteInvoiceIdUseCase.execute(
        id,
        cancelledInvoiceDto,
        req.user.id,
      );
    } catch (error) {
      throw new HttpException(
        'Erro ao cancelar nota fiscal',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
