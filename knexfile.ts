export default {
  client: 'pg',
  connection: {
    host: 'db',
    port: 5432,
    user: 'postgres',
    password: 'mysecretpassword',
    database: 'feedmeclean'
  },
  log: {
    warn(message) {
      console.warn(message)
    },
    error(message) {
      console.error(message)
    },
    debug(message) {
      console.debug(message)
    }
  }
}
