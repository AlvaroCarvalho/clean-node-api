import { EmailValidatorAdapter } from './EmailValidator'

describe('Email validator adapter', () => {
  test('Should return false if validator returns false', () => {
    const sut = new EmailValidatorAdapter()
    const isValid = sut.isValid('invalid_email@email.com')

    expect(isValid).toBe(false)
  })
})
