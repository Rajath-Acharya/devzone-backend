import { Sequelize, DataTypes, Model } from 'sequelize'
import { config } from '../config'
import logger from '../utils/logger'

const { name, user, password, host, driver } = config.db

const sequelize = new Sequelize(name, user, password, {
  host,
  dialect: driver,
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

export { connectDB, sequelize, Sequelize, DataTypes, Model }
