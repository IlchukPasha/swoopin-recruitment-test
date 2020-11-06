import EncryptionService from 'services/encryption'
import AuthorizationError from 'errors/authorization-error'

const LoginRoute = async (server : any, opts : any, next: () => void) => {
  server.route({
    method: 'POST',
    url: '/login',
    schema: {
      body: {
        type: 'object',
        required: ['login', 'password'],
        properties: {
          login: {
            type: 'string',
            format: 'email',
            minLength: 5,
            maxLength: 30,
          },
          password: { type: 'string', minLength: 4, maxLength: 16 },
        },
      },
    },
    async handler(req: any, res: any) {
      const { login: email, password } = req.body

      const {
        id, email: currentEmail, password: currentPassword, name,
      } = req.conf.account

      if (currentEmail !== email) {
        throw new AuthorizationError('Bad Request', 'user_not_found')
      }

      if (!EncryptionService.comparePassword({ password, salt: id, encrypted: currentPassword })) {
        throw new AuthorizationError('Bad Request', 'wrong_credentials')
      }

      res.code(200).send({
        token: server.jwt.sign({
          payload: {
            userId: id,
            name,
            isAdmin: false,
          },
        }),
      })
    },
  })
  next()
}

export default LoginRoute
