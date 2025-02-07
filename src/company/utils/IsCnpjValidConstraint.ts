import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { cnpj } from 'cpf-cnpj-validator';

@ValidatorConstraint({ async: false })
export class IsCnpjValidConstraint implements ValidatorConstraintInterface {
  validate(value: string) {
    return cnpj.isValid(value);
  }

  defaultMessage() {
    return 'O CNPJ informado é inválido.';
  }
}

export function IsCnpjValid(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsCnpjValidConstraint,
    });
  };
}
