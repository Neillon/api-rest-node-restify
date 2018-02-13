
const sha1 = require('sha1')

const users = deps => {
    return {
        all: () => {
            return new Promise((resolve, reject) => {
                const { connection, errorHandler } = deps;
                connection.query('select id, email from users', (error, results) => {
                    if (error) {
                        errorHandler(error, "Falha ao listar os usuarios", reject)
                        return false
                    }

                    resolve({users : results})
                })
            })
        },
        save: (email, password) => {
            return new Promise((resolve, reject) => {
                const { connection, errorHandler } = deps;
                connection.query('insert into users (email, password) values (?, ?)', [email, sha1(password)],  (error, results) => {
                    if (error) {
                        errorHandler(error, `Falha ao salvar a usuario ${email}`, reject)
                        return false
                    }

                    resolve({user : { email, id: results.insertId } })
                })
            })
        },
        update: (id, password) => {
            return new Promise((resolve, reject) => {
                const { connection, errorHandler } = deps;
                connection.query('update users set password = ? where id = ?', [sha1(password), id],  (error, results) => {
                    if (error || !results.affectedRows) {
                        errorHandler(error, `Falha ao atualizar a usuario de id ${id}`, reject)
                        return false
                    }

                    resolve({user : { id }, affectedRows: results.affectedRows })
                })
            })
        },
        del: (id) => {
            return new Promise((resolve, reject) => {
                const { connection, errorHandler } = deps;
                connection.query('delete from users where id = ?', [id],  (error, results) => {
                    if (error || !results.affectedRows) {
                        errorHandler(error, `Falha ao remover a usuario ${id}`, reject)
                        return false
                    }

                    resolve({message: 'usuario removida com sucesso', affectedRows: results.affectedRows})
                })
            })
        }
    }
}

module.exports = users
