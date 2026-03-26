import { DataSource } from 'typeorm';
import { typeOrmConfig } from '../config/database.config';

export const AppDataSource = new DataSource(typeOrmConfig);