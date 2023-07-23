export class NotMinLengthError extends Error {
  constructor (
    private readonly minLength: number
  ) {
    super(`Campo requer ${minLength} caracteres no mínimo`)
    this.name = 'notMinLengthError'
  }
}
