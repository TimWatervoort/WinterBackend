module.exports = {
  development: {
    client: `pg`,
    connection: `postgres://localhost/excusedb`
  },
  test: {},
  production: {
    client: `pg`,
    connection: process.env.DATABASE_URL
  }
}
