import fs from 'node:fs/promises';

const dataBasePath = new URL('../controllers/db.js', import.meta.url)

export class DataBase {
    #databese = {}

    select(table) {
        const data = this.#databese[table] ?? []

        return data
    };

    insert(table, data) {
        if(Array.isArray(this.#databese[table])) {
            this.#databese[table].push(data)
        } else {
            this.#databese[table] = [data]
        }

        return data
    }
}