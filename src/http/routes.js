
const db = require('../services/mysql');

const routes = (server) => {

    server.post('categoria', async (req, res, next) => {
        const { name } = req.params
        try {
            res.send(await db.categories().save(name)) 
        } catch (error) {
            res.send(error);
        } finally {
            next()
        }
    });

    server.get('/categoria', async (req, res, next) => {
        try {
            res.send(await db.categories().all()) 
        } catch (error) {
            res.send(error);
        } finally {
            next()
        }
    });

    server.put('categoria', async (req, res, next) => {
        const { id, name } = req.params
        try {
            res.send(await db.categories().update(id, name)) 
        } catch (error) {
            res.send(error);
        } finally {
            next()
        }
    });

    server.del('categoria', async (req, res, next) => {
        const { id } = req.params
        try {
            res.send(await db.categories().del(id)) 
        } catch (error) {
            res.send(error);
        } finally {
            next()
        }
    });

    server.post('autenticar', async (req, res, next) => {
        const { email, password } = req.params
        try {
            res.send(await db.auth().authenticate(email, password)) 
        } catch (error) {
            res.send(error);
        } finally {
            next()
        }
    });
}

module.exports = routes;