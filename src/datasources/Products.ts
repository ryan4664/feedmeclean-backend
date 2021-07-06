import { DataSource } from 'apollo-datasource'
import { Knex } from 'knex'

interface IProduct {
  id: number
  name: string
}

export default class Products extends DataSource {
  store: Knex<IProduct>
  context: any

  constructor({ store }) {
    super()
    this.store = store
  }

  // /**
  //  * This is a function that gets called by ApolloServer when being setup.
  //  * This function gets called with the datasource config including things
  //  * like caches and context. We'll assign this.context to the request context
  //  * here, so we can know about the user making requests
  //  */
  initialize(config) {
    this.context = config.context
  }

  // /**
  //  * User can be called with an argument that includes email, but it doesn't
  //  * have to be. If the user is already on the context, it will use that user
  //  * instead
  //  */
  async findAll() {
    // const email =
    //   this.context && this.context.user ? this.context.user.email : emailArg

    let result = await this.store.select('*').from('products')

    console.log('Result', result)

    return result
  }

  // async bookTrips({ launchIds }) {
  //   const userId = this.context.user.id
  //   if (!userId) return

  //   let results = []

  //   // for each launch id, try to book the trip and add it to the results array
  //   // if successful
  //   for (const launchId of launchIds) {
  //     const res = await this.bookTrip({ launchId })
  //     if (res) results.push(res)
  //   }

  //   return results
  // }

  // async bookTrip({ launchId }) {
  //   const userId = this.context.user.id
  //   const res = await this.store.trips.findOrCreate({
  //     where: { userId, launchId }
  //   })
  //   return res && res.length ? res[0].get() : false
  // }

  // async cancelTrip({ launchId }) {
  //   const userId = this.context.user.id
  //   return !!this.store.trips.destroy({ where: { userId, launchId } })
  // }

  // async getLaunchIdsByUser() {
  //   const userId = this.context.user.id
  //   const found = await this.store.trips.findAll({
  //     where: { userId }
  //   })
  //   return found && found.length
  //     ? found.map((l) => l.dataValues.launchId).filter((l) => !!l)
  //     : []
  // }

  // async isBookedOnLaunch({ launchId }) {
  //   if (!this.context || !this.context.user) return false
  //   const userId = this.context.user.id
  //   const found = await this.store.trips.findAll({
  //     where: { userId, launchId }
  //   })
  //   return found && found.length > 0
  // }
}
