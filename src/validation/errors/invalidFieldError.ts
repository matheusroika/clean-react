export class InvalidFieldError extends Error {
  constructor (
    private readonly field: string
  ) {
    const fieldCapitalized = field.charAt(0).toUpperCase() + field.slice(1)
    super(`Campo ${fieldCapitalized} inválido`)
    this.name = 'InvalidFieldError'
  }
}
