
const categories = deps => {
    return {
        all: () => {
            return new Promise((resolve, reject) => {
                const { connection, errorHandler } = deps;
                connection.query('select * from categories', (error, results) => {
                    if (error) {
                        errorHandler(error, "Falha ao listar as categorias", reject)
                        return false
                    }

                    resolve({categories : results})
                })
            })
        },
        save: (name) => {
            return new Promise((resolve, reject) => {
                const { connection, errorHandler } = deps;
                connection.query('insert into categories (name) values (?)', [name],  (error, results) => {
                    if (error) {
                        errorHandler(error, `Falha ao salvar a categoria ${name}`, reject)
                        return false
                    }

                    resolve({category : { name, id: results.insertId } })
                })
            })
        },
        update: (id, name) => {
            return new Promise((resolve, reject) => {
                const { connection, errorHandler } = deps;
                connection.query('update categories set name = ? where id = ?', [name, id],  (error, results) => {
                    if (error || !results.affectedRows) {
                        errorHandler(error, `Falha ao atualizar a categoria ${name}`, reject)
                        return false
                    }

                    resolve({category : { id, name }, affectedRows: results.affectedRows })
                })
            })
        },
        del: (id) => {
            return new Promise((resolve, reject) => {
                const { connection, errorHandler } = deps;
                connection.query('delete from categories where id = ?', [id],  (error, results) => {
                    if (error || !results.affectedRows) {
                        errorHandler(error, `Falha ao remover a categoria ${id}`, reject)
                        return false
                    }

                    resolve({message: 'Categoria removida com sucesso', affectedRows: results.affectedRows})
                })
            })
        }
    }
}

module.exports = categories
