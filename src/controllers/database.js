import fs from 'node:fs/promises';

const dataBasePath = new URL('../../db.js', import.meta.url)

export class DataBase {
    #databese = {}

    constructor() {
        fs.readFile(dataBasePath, 'utf8')
            .then(data => {
                this.#databese = JSON.parse(data)
            })
            .catch(() => {
                this.#presist()
            })
    }

    #presist() {
        fs.writeFile(dataBasePath, JSON.stringify(this.#databese))
    }

    select(table, search) {
        let data = this.#databese[table] ?? []

        if(search) {
            data = data.filter(row => {
                return Object.entries(search).some(([key, value]) => {
                    return row[key].toLowerCase().includes(value.toLowerCase())
                })
            })
        }

        return data
    };

    insert(table, data) {
        if(Array.isArray(this.#databese[table])) {
            this.#databese[table].push(data)
        } else {
            this.#databese[table] = [data]
        }

        this.#presist()

        return data
    };

    update(table, id, data) {
        const rowIndex = this.#databese[table].findIndex(row => row.id === id)

        if(rowIndex > -1) {
            this.#databese[table][rowIndex] = {id, ...data}

            this.#presist()
        }
    };

    delete(table, id) {
        const rowIndex = this.#databese[table].findIndex(row => row.id === id)

        if(rowIndex > -1) {
            this.#databese[table].splice(rowIndex, 1)

            this.#presist()
        }
    }
}