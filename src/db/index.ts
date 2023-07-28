import { Sequelize, DataTypes } from 'sequelize'
import { config } from '../config'
import logger from '../utils/logger'

const { dbName, dbUser, dbPassword, dbHost, dbDriver } = config.db

const sequelize = new Sequelize(dbName, dbUser, dbPassword, {
  host: dbHost,
  dialect: dbDriver,
  pool: {
    max: 5,
    min: 0,
    acquire: 20000,
    idle: 5000,
  },
})

async function connectDB() {
  try {
    await sequelize.authenticate()
    logger.info('✅ Database connection has been established successfully.')
  } catch (error) {
    logger.error('Unable to connect to the database:', error)
  }
}

export { connectDB, sequelize, Sequelize, DataTypes }
