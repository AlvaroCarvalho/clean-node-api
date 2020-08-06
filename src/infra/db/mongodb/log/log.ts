import { LogErrorRepository } from '../../../../data/protocols/LogErrorRepository'
import { MongoHelper } from '../helpers/mongoHelper'

export class LogMongoRepository implements LogErrorRepository {
  async logError (stack: string): Promise<void> {
    const errorCollections = await MongoHelper.getCollection('errors')
    await errorCollections.insertOne({
      stack,
      date: new Date()
    })
  }
}
