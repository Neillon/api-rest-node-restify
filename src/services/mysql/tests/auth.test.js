

const test = require('ava')

const { connection, errorHandler } = require('./setup')

const users = require('../users')({ connection, errorHandler })
const auth = require('../auth')({ connection, errorHandler })

const create = () => users.save('user@test.com', '123') 

test.beforeEach(t => { connection.query('truncate table users') })
test.after.always(t => { connection.query('truncate table users') })

test('Login de usuário - sucesso', async t => { 
    await create()

    const result = await auth.authenticate('user@test.com', '123')

    t.not(result.token, null)
    t.not(result.token.length, 0)
})

test('Login de usuário - falha', async t => { 
    await create()

    const promisse = auth.authenticate('user3@test.com', '123')

    const error = await t.throws(promisse)

    t.is(error.error, 'Falha ao localizar o usuario')
})
