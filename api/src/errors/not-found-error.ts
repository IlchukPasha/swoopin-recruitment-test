export default class NotFoundError extends Error {
  constructor(public error: string) {
    super()
  }
}
