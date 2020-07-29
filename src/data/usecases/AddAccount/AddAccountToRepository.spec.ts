import { AddAccountToRepository } from './AddAccountToRepository'

describe('AddAccountToRepository', () => {
  test('Should call encrypter with correct password', async () => {
    class EncrypterStub {
      async encrypt (password: string): Promise<string> {
        return new Promise(resolve => resolve('hash'))
      }
    }
    const encrypterStub = new EncrypterStub()
    const sut = new AddAccountToRepository(encrypterStub)
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
