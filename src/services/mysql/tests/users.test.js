

const test = require('ava')

const { connection, errorHandler } = require('./setup')

const users = require('../users')({ connection, errorHandler })

test.beforeEach(t => { connection.query('truncate table users') })

test.after.always(t => { connection.query('truncate table users') })


const create = () => users.save('user@test.com', '123') 

test('Criação de usuario', async t => {
    const result = await create();
    // console.log(result);
    
    t.is(result.user.email, 'user@test.com')
})

test('Atualização de usuario', async t => {
    await create()
    const updated = await users.update(1, '123456')
    // console.log(updated)
    t.is(updated.affectedRows, 1)
})

test('Remoção de usuario', async t => {
    await create()
    const removed = await users.del(1)
    // console.log(removed)
    t.is(removed.affectedRows, 1)
})

// test('Lista de usuario', async t => {
//     await create()
//     const list = await users.all()
//     console.log(list)
//     t.is(list.users.length, 1)
// })