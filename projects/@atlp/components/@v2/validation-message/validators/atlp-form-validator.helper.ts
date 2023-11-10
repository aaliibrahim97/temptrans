import { FormGroup, ValidationErrors } from '@angular/forms';

export const AtlpFormValidationErrors = (
  formControls: any,
  form: any
): any[] => {
  let controlErrors = [];
  Object.keys(formControls).forEach((key) => {
    const errors: ValidationErrors = form.get(key).errors;
    if (errors !== null) {
      console.log(errors);
      Object.keys(errors).forEach((keyError) => {
        console.log(
          'Key control: ' + key + ', keyError: ' + keyError + ', err value: ',
          errors[keyError]
        );
        controlErrors.push({
          control_name: key,
          error_name: keyError,
          error_value: errors[keyError],
        });
      });
    }
  });

  return controlErrors;
};
