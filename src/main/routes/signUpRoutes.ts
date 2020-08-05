import { Router } from 'express'
import { makeSignUpController } from '../factories/signup'
import { adaptRoutes } from '../adapters/expressRoutesAdapter'

export default (router: Router): void => {
  router.post('/signup', adaptRoutes(makeSignUpController()))
}
