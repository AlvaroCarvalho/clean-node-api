import { AddAccountToRepository } from './AddAccountToRepository'
import { Encrypter } from '../protocols/Encrypter'

interface SutTypes {
  sut: AddAccountToRepository
  encrypterStub: Encrypter
}

const makeSut = (): SutTypes => {
  class EncrypterStub {
    async encrypt (password: string): Promise<string> {
      return new Promise(resolve => resolve('hash'))
    }
  }
  const encrypterStub = new EncrypterStub()
  const sut = new AddAccountToRepository(encrypterStub)

  return { sut, encrypterStub }
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
})
