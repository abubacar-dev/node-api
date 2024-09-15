import { randomUUID } from 'node:crypto';
import { DataBase } from './controllers/database.js';
import { buildRoutePath } from './utils/buildroutepath.js';

const dataBase = new DataBase()

export const routes = [
    {
        method: 'GET',
        path: buildRoutePath('/users'),
        handler: (req, res) => {
            const users = dataBase.select('users')

            return res.end(JSON.stringify(users))
        }
    },
    {
        method: 'POST',
        path: buildRoutePath('/users'),
        handler: (req, res) => {
            const { name, email } = req.body

            const user = {
                id: randomUUID(),
                name,
                email,
            }

            dataBase.insert('users', user)

            return res
                .writeHead(201)
                .end()
        }
    }
]