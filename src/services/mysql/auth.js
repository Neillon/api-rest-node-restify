
const sha1 = require('sha1')
const jwt = require('jsonwebtoken')

const auth = deps => {
    return {
        authenticate: (email, password) => {
            return new Promise((resolve, reject) => {
                const { connection, errorHandler } = deps;
                const queryString = 'select id, email from users where email = ? and password = ?'
                const queryData = [ email, sha1(password) ]
               
                connection.query(queryString, queryData, (error, results) => {
                    if (error || !results.length) {
                        errorHandler(error, "Falha ao localizar o usuario", reject)
                        return false
                    }

                    const { email, id } = results[0]
                    const token = jwt.sign({ email, id }, process.env.JWT_SECRET, { expiresIn: 60 * 60 * 24 })

                    resolve({ token })
                })
            })
        }
    }
}

module.exports = auth
