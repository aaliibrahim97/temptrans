import { isEmpty, isObject } from '../validators/validator.functions';

export class DynamicFormFieldValidations {
  static formatErrors(errors: any, validationMessages: any = {}): string {
    if (isEmpty(errors)) {
      return null;
    }
    if (!isObject(validationMessages)) {
      validationMessages = {};
    }
    const addSpaces = (string) =>
      string[0].toUpperCase() +
      (string.slice(1) || '')
        .replace(/([a-z])([A-Z])/g, '$1 $2')
        .replace(/_/g, ' ');
    const formatError = (error) =>
      typeof error === 'object'
        ? Object.keys(error)
            .map((key) =>
              error[key] === true
                ? addSpaces(key)
                : error[key] === false
                ? 'Not ' + addSpaces(key)
                : addSpaces(key) + ': ' + formatError(error[key])
            )
            .join(', ')
        : addSpaces(error.toString());
    const messages = [];
    return (
      Object.keys(errors)
        // Hide 'required' error, unless it is the only one
        .filter(
          (errorKey) =>
            errorKey !== 'required' || Object.keys(errors).length === 1
        )
        .map((errorKey) =>
          // If validationMessages is a string, return it
          typeof validationMessages === 'string'
            ? validationMessages
            : // If custom error message is a function, return function result
            typeof validationMessages[errorKey] === 'function'
            ? validationMessages[errorKey](errors[errorKey])
            : // If custom error message is a string, replace placeholders and return
            typeof validationMessages[errorKey] === 'string'
            ? // Does error message have any {{property}} placeholders?
              !/{{.+?}}/.test(validationMessages[errorKey])
              ? validationMessages[errorKey]
              : // Replace {{property}} placeholders with values
                Object.keys(errors[errorKey]).reduce(
                  (errorMessage, errorProperty) =>
                    errorMessage.replace(
                      new RegExp('{{' + errorProperty + '}}', 'g'),
                      errors[errorKey][errorProperty]
                    ),
                  validationMessages[errorKey]
                )
            : // If no custom error message, return formatted error data instead
              addSpaces(errorKey) + ' Error: ' + formatError(errors[errorKey])
        )
        .join('<br>')
    );
  }
}
