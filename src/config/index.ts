import dotenv from 'dotenv'

dotenv.config()

export const config = {
  db: {
    name: process.env.DB_NAME as string,
    user: process.env.DB_USER as string,
    host: process.env.DB_HOST,
    driver: process.env.DB_DRIVER,
    password: process.env.DB_PASSWORD,
    port: Number(process.env.DB_PORT) || 8040,
  },
  app: {
    port: Number(process.env.APP_PORT) || 4000,
  },
}
