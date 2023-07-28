import dotenv from 'dotenv'
import { Dialect } from 'sequelize'

dotenv.config()

export const config = {
  db: {
    dbName: process.env.DB_NAME as string,
    dbUser: process.env.DB_USER as string,
    dbHost: process.env.DB_HOST,
    dbDriver: process.env.DB_DRIVER as Dialect,
    dbPassword: process.env.DB_PASSWORD,
  },
  app: {
    PORT: process.env.PORT || 4000,
  },
}
