import { AddAccountToRepository } from '../../../../data/protocols/AddAccountToRepository'
import { AddAccountModel } from '../../../../domain/usecases/addAccount'
import { AccountModel } from '../../../../domain/models/account'
import { MongoHelper } from '../helpers/mongoHelper'

export class AccountMongoRepository implements AddAccountToRepository {
  async add (accountData: AddAccountModel): Promise<AccountModel> {
    const accountCollection = MongoHelper.getCollection('accounts')
    const result = await accountCollection.insertOne(accountData)

    return MongoHelper.map(result.ops[0])
  }
}
