import { Express, Router } from 'express'
import fastGlob from 'fast-glob'

export default (app: Express): void => {
  const router = Router()
  app.use('/api', router)

  const files = fastGlob.sync('**/src/main/routes/**Routes.ts')
  files.map(async file => {
    const route = (await import(`../../../${file}`)).default
    route(router)
  })
}
