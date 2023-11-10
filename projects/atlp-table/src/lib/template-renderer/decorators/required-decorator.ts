import { ValidatorConfig } from '../models/validator-config';

const registeredValidators: ValidatorConfig = {};

export function Required(target: any, propName: string) {
  registeredValidators[target.constructor.name] = {
    ...registeredValidators[target.constructor.name],
    [propName]: [
      ...(registeredValidators[target.constructor.name]?.[propName] ?? []),
      'required',
    ],
  };
}

export function TypeOfString(target: any, propName: string) {
  registeredValidators[target.constructor.name] = {
    ...registeredValidators[target.constructor.name],
    [propName]: [
      ...(registeredValidators[target.constructor.name]?.[propName] ?? []),
      'TypeOfString',
    ],
  };
}

export function TypeOfObject(target: any, propName: string) {
  registeredValidators[target.constructor.name] = {
    ...registeredValidators[target.constructor.name],
    [propName]: [
      ...(registeredValidators[target.constructor.name]?.[propName] ?? []),
      'TypeOfObject',
    ],
  };
}

export function decoratorValidator(obj: any) {
  const objValidatorConfig = registeredValidators.AtlpTemplateRenderer; //registeredValidators[obj.constructor.name];
  if (!objValidatorConfig) {
    return true;
  }
  let isValid = true;
  for (const prop in objValidatorConfig) {
    for (const validator of objValidatorConfig[prop]) {
      switch (validator) {
        case 'required':
          isValid = isValid && !!obj[prop];
          break;
        case 'TypeOfString':
          isValid = isValid && typeof obj[prop] === 'string';
          break;
        case 'TypeOfObject':
          isValid = isValid && typeof obj[prop] === 'object';
          break;
      }
    }
  }
  return isValid;
}
