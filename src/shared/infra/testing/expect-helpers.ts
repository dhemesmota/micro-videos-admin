import { ClassValidatorFields } from "../../domain/validators/class-validator-fields";
import { EntityValidationError } from "../../domain/validators/validation.error";
import { FieldsErrors } from "../../domain/validators/validator-fields-interface";

type Expected =  | {
  validator: ClassValidatorFields<any>;
  data: any;
} | (() => any);

expect.extend({
  containsErrorMessages(expected: Expected, received: FieldsErrors) {
    if (typeof expected === 'function') {
      try {
        expected();
        return isValid()
      }	catch (e) {
        const error = e as EntityValidationError;
        return assertContainsErrosMessages(error.error, received);
      }
    } else {
      const {validator, data} = expected;
      const validated = validator.validate(data);

      if (validated) {
        return isValid()
      }
      
      return assertContainsErrosMessages(validator.errors, received);
    }
  },
})

function assertContainsErrosMessages(
  expected: FieldsErrors,
  received: FieldsErrors
) {
  const isMatch = expect.objectContaining(received).asymmetricMatch(expected);

  return isMatch 
  ? isValid()
  : {
    pass: false,
    message: () => 
      `The validation erros not contains ${JSON.stringify(
        received
      )}. Current: ${JSON.stringify(expected)}`
  }
}

function isValid() {
  return {pass: true, message: () => ""}
}