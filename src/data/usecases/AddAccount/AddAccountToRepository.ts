import { AddAccountModel, AddAccount, AccountModel, Encrypter } from './Protocols'
export class AddAccountToRepository implements AddAccount {
  constructor (private readonly encrypter: Encrypter) {}

  async add (account: AddAccountModel): Promise<AccountModel> {
    await this.encrypter.encrypt(account.password)
    return new Promise(resolve => resolve(null))
  }
}
