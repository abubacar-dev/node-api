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
    };

    update(table, id, data) {
        const rowIndex = this.#databese[table].findIndex(row => row.id === id)

        if(rowIndex > -1) {
            this.#databese[table][rowIndex] = {id, ...data}
        }
    };

    delete(table, id) {
        const rowIndex = this.#databese[table].findIndex(row => row.id === id)

        if(rowIndex > -1) {
            this.#databese[table].splice(rowIndex, 1)
        }
    }
}