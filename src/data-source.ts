import { DataSource } from 'typeorm'
import { config } from './config'

const { name, user, password, host, port } = config.db

export const AppDataSource = new DataSource({
  type: 'postgres',
  host,
  port,
  username: user,
  password,
  database: name,
  entities: [],
  subscribers: [],
  migrations: [],
  synchronize: true,
  logging: true,
})
