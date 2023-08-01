export class AccessDeniedError extends Error {
  constructor () {
    super('Acesso negado')
    Object.setPrototypeOf(this, AccessDeniedError.prototype)
    this.name = 'AccessDeniedError'
  }
}
