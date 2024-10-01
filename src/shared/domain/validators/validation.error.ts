import { FieldsErrors } from "./validator-fields-interface";


export class EntityValidationError extends Error {
  constructor(public error: FieldsErrors, messge = 'Entity validation error') {
    super(messge)
  }

  count() {
    return Object.keys(this.error).length;
  }
}