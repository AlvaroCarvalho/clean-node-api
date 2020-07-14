import { HttpRequest, HttpResponse, Controller, EmailValidator, AddAccount } from './signUpProtocols'
import { MissingParamError, InvalidParamError } from '../../errors'
import { badRequest, serverError, success } from '../../helpers/httpHelper'

export class SignUpController implements Controller {
  private readonly emailValidator: EmailValidator
  private readonly addAccount: AddAccount

  constructor (emailValidator: EmailValidator, addAccount: AddAccount) {
    this.emailValidator = emailValidator
    this.addAccount = addAccount
  }

  handle (httpRequest: HttpRequest): HttpResponse {
    try {
      const requestBody = httpRequest.body
      const requiredFields = ['name', 'email', 'password', 'passwordConfirmation']

      for (const field of requiredFields) {
        if (!requestBody[field]) {
          return badRequest(new MissingParamError(field))
        }
      }

      const { name, email, password, passwordConfirmation } = requestBody

      if (password !== passwordConfirmation) {
        return badRequest(new InvalidParamError('passwordConfirmation'))
      }

      const isEmailValid = this.emailValidator.isValid(email)

      if (!isEmailValid) {
        return badRequest(new InvalidParamError('email'))
      }

      const account = this.addAccount.add({ name, email, password })

      return success(account)
    } catch (err) {
      return serverError()
    }
  }
}
