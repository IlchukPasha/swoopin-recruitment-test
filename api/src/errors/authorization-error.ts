export default class AuthorizationError extends Error {
  constructor(public error: string, public type: string) {
    super()
  }
}
