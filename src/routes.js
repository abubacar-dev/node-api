import { randomUUID } from 'node:crypto';
import { DataBase } from './controllers/database.js';

const dataBase = new DataBase()

export const routes = [
    {
        method: 'GET',
        path: '/users',
        handler: (req, res) => {
            const users = dataBase.select('users')

            return res.end(JSON.stringify(users))
        }
    }
]