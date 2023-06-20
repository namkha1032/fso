const db = require('../connect')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()

loginRouter.post('/', async (request, response) => {
    const { username, password } = request.body
    sql = `SELECT * FROM users WHERE username = '${username}';`
    db.all(sql, async function (err, rows) {
        const passwordCorrect = rows.length == 0
            ? false
            : await bcrypt.compare(password, rows[0].password)
        if (!(passwordCorrect)) {
            return response.status(401).json({
                error: 'invalid username or password'
            })
        }

        const userForToken = {
            username: rows[0].username,
            id: rows[0].id,
        }

        const token = jwt.sign(userForToken, "namkhadeptrai",{ expiresIn: 60*60 })

        response
            .status(200)
            .send({ token, username: rows[0].username })
    })

})

module.exports = loginRouter