import AuthorizationError from 'errors/authorization-error'
import NotFoundError from 'errors/not-found-error'

const errorHandler = (error: any, req: any, res: any) => {
  let statusCode = 500
  let response = {
    error: 'Internal Server Error',
    message: 'internal_error',
  }

  if (error instanceof AuthorizationError) {
    statusCode = 401
    response = {
      error: error.error,
      message: error.type,
    }
  }

  if (error instanceof NotFoundError) {
    statusCode = 404
    response = {
      error: error.error,
      message: 'not_found',
    }
  }

  if (error.validation) {
    statusCode = 400
    response = {
      error: error.validation.map((e: any) => ({ message: e.message, field: e.dataPath })),
      message: 'validation_error',
    }
  }

  res.status(statusCode).send({
    ...response, statusCode,
  })
}

export default errorHandler
