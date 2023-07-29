import dotenv from 'dotenv'
import { Dialect } from 'sequelize'

dotenv.config()

export const config = {
  db: {
    name: process.env.DB_NAME as string,
    user: process.env.DB_USER as string,
    host: process.env.DB_HOST,
    driver: process.env.DB_DRIVER as Dialect,
    password: process.env.DB_PASSWORD,
  },
  app: {
    PORT: process.env.PORT || 4000,
  },
}
