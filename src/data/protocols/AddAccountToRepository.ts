import { AccountModel } from '../../domain/models/account'
import { AddAccountModel } from '../../domain/usecases/addAccount'

export interface AddAccountToRepository {
  add(account: AddAccountModel): Promise<AccountModel>
}
