import { AddAccountToDatabase } from './AddAccountToDatabase'
import { Encrypter, AccountModel, AddAccount, AddAccountModel, AddAccountToRepository } from './Protocols'

const makeEncrypter = (): Encrypter => {
  class EncrypterStub implements Encrypter {
    async encrypt (password: string): Promise<string> {
      return new Promise(resolve => resolve('hashed_password'))
    }
  }

  return new EncrypterStub()
}

const makeAddAccountToRepositoryStub = (): AddAccountToRepository => {
  class AddAccountToRepositoryStub implements AddAccount {
    async add (accountData: AddAccountModel): Promise<AccountModel> {
      const fakeAccount = { ...accountData, id: 'valid_id', password: 'hashed_password' }

      return new Promise(resolve => resolve(fakeAccount))
    }
  }

  return new AddAccountToRepositoryStub()
}

interface SutTypes {
  sut: AddAccountToDatabase
  encrypterStub: Encrypter
  addAccountToRepositoryStub: AddAccountToRepository
}

const makeSut = (): SutTypes => {
  const encrypterStub = makeEncrypter()
  const addAccountToRepositoryStub = makeAddAccountToRepositoryStub()
  const sut = new AddAccountToDatabase(encrypterStub, addAccountToRepositoryStub)

  return { sut, encrypterStub, addAccountToRepositoryStub }
}

describe('AddAccountToRepository', () => {
  test('Should call encrypter with correct password', async () => {
    const { sut, encrypterStub } = makeSut()
    const spy = jest.spyOn(encrypterStub, 'encrypt')
    const accountData = {
      name: 'valid_name',
      email: 'valid_email',
      password: 'valid_password'
    }

    await sut.add(accountData)
    expect(spy).toBeCalledWith(accountData.password)
  })

  test('Should throw if encrypter throws', async () => {
    const { sut, encrypterStub } = makeSut()
    jest.spyOn(encrypterStub, 'encrypt').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const accountData = {
      name: 'valid_name',
      email: 'valid_email',
      password: 'valid_password'
    }

    const promise = sut.add(accountData)
    await expect(promise).rejects.toThrow()
  })

  test('Should call AddAccountRepository with correct values', async () => {
    const { sut, addAccountToRepositoryStub } = makeSut()
    const addSpy = jest.spyOn(addAccountToRepositoryStub, 'add')
    const accountData = {
      name: 'valid_name',
      email: 'valid_email',
      password: 'valid_password'
    }

    await sut.add(accountData)
    expect(addSpy).toHaveBeenCalledWith({ ...accountData, password: 'hashed_password' })
  })

  test('Should throw if AddAccountToDatabase throws', async () => {
    const { sut, addAccountToRepositoryStub } = makeSut()
    jest.spyOn(addAccountToRepositoryStub, 'add').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const accountData = {
      name: 'valid_name',
      email: 'valid_email',
      password: 'hashed'
    }

    const promise = sut.add(accountData)
    await expect(promise).rejects.toThrow()
  })
})
