import { AddAccountModel, AddAccount } from '../../../domain/usecases/addAccount'
import { AccountModel } from '../../../domain/models/account'
import { Encrypter } from '../protocols/Encrypter'

export class AddAccountToRepository implements AddAccount {
  constructor (private readonly encrypter: Encrypter) {}

  async add (account: AddAccountModel): Promise<AccountModel> {
    await this.encrypter.encrypt(account.password)
    return new Promise(resolve => resolve(null))
  }
}
