import { AddAccountModel, AccountModel, Encrypter, AddAccountToRepository } from './Protocols'

export class AddAccountToDatabase implements AddAccountToRepository {
  constructor (
    private readonly encrypter: Encrypter,
    private readonly addAccountToRepository: AddAccountToRepository
  ) {}

  async add (accountData: AddAccountModel): Promise<AccountModel> {
    const hashedPassword = await this.encrypter.encrypt(accountData.password)
    const account = await this.addAccountToRepository.add({ ...accountData, password: hashedPassword })
    return account
  }
}
