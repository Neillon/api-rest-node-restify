

const test = require('ava')

const { connection, errorHandler } = require('./setup')

const categories = require('../categories')({ connection, errorHandler })

test.beforeEach(t => {
	connection.query('truncate table categories')
})


test.after.always(t => {
	connection.query('truncate table categories')
})


const create = () => categories.save('test') 

test('Criação de categoria', async t => {
    const result = await create();
    // console.log(result);
    
    t.is(result.category.name, 'test')
})

test('Atualização de categoria', async t => {
    await create()
    const updated = await categories.update(1, 'category-test-updated')
    // console.log(updated)
    t.is(updated.category.name, 'category-test-updated')
    t.is(updated.affectedRows, 1)
})

test('Remoção de categoria', async t => {
    await create()
    const removed = await categories.del(1)
    // console.log(removed)
    t.is(removed.affectedRows, 1)
})

// test('Lista de categoria', async t => {
//     await create()
//     const list = await categories.all()
//     console.log(list)
//     t.is(list.categories.length, 1)
// })