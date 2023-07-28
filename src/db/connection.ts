import { Sequelize } from 'sequelize'
import { config } from '../config'

const { dbName, dbUser, dbPassword, dbHost, dbDriver } = config.db

const sequelizeConnection = new Sequelize(dbName, dbUser, dbPassword, {
  host: dbHost,
  dialect: dbDriver,
  pool: {
    max: 5,
    min: 0,
    acquire: 20000,
    idle: 5000,
  },
})

export default sequelizeConnection
