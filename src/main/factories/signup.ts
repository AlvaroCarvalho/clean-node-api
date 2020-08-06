import { SignUpController } from '../../presentation/controllers/signup/signup'
import { EmailValidatorAdapter } from '../../utils/EmailValidatorAdapter'
import { AddAccountToDatabase } from '../../data/usecases/AddAccount/AddAccountToDatabase'
import { BcryptAdapter } from '../../infra/criptography/BcryptAdapter'
import { AccountMongoRepository } from '../../infra/db/mongodb/account/account'
import { LogMongoRepository } from '../../infra/db/mongodb/log/log'
import { LogControllerDecorator } from '../decorators/log'
import { Controller } from '../../presentation/protocols/controller'

export const makeSignUpController = (): Controller => {
  const salt = 12
  const bcryptAdapter = new BcryptAdapter(salt)
  const accountMongoRepository = new AccountMongoRepository()

  const emailValidatorAdapter = new EmailValidatorAdapter()
  const addAccountToDatabase = new AddAccountToDatabase(bcryptAdapter, accountMongoRepository)
  const signUpController = new SignUpController(emailValidatorAdapter, addAccountToDatabase)
  const logMongoRepository = new LogMongoRepository()
  return new LogControllerDecorator(signUpController, logMongoRepository)
}
