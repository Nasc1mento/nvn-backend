import { registerDecorator } from "class-validator";
import { ValidationOptions } from "class-validator";
import { cpf } from "cpf-cnpj-validator";


export function IsValidCPF(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'CPF',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: validationOptions,
      validator: {
        validate(value: any) {
          return typeof value === 'string' && cpf.isValid(value);
        },
      },
    });
  };
}