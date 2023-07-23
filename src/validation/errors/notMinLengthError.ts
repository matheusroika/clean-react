export class NotMinLengthError extends Error {
  constructor (
    private readonly field: string,
    private readonly minLength: number
  ) {
    const fieldCapitalized = field.charAt(0).toUpperCase() + field.slice(1)
    super(`Campo ${fieldCapitalized} requer ${minLength} caracteres no mínimo`)
    this.name = 'notMinLengthError'
  }
}
