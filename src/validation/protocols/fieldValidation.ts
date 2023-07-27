export type InputObject = {
  [key: string]: string
}

export interface FieldValidation {
  field: string
  validate: (input: InputObject) => Error
}
