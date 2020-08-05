
import { SignUpController } from '../../presentation/controllers/signup/signup'
import { EmailValidatorAdapter } from '../../utils/EmailValidatorAdapter'
import { AddAccountToDatabase } from '../../data/usecases/AddAccount/AddAccountToDatabase'
import { BcryptAdapter } from '../../infra/criptography/BcryptAdapter'
import { AccountMongoRepository } from '../../infra/db/mongodb/account/account'

export const makeSignUpController = (): SignUpController => {
  const salt = 12
  const bcryptAdapter = new BcryptAdapter(salt)
  const accountMongoRepository = new AccountMongoRepository()

  const emailValidatorAdapter = new EmailValidatorAdapter()
  const addAccountToDatabase = new AddAccountToDatabase(bcryptAdapter, accountMongoRepository)
  return new SignUpController(emailValidatorAdapter, addAccountToDatabase)
}
