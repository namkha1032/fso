const db = require('../connect')
const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()

usersRouter.get('/', async (request, response) => {
    sql = `SELECT * FROM users;`
    db.all(sql, function (err, rows) {
        response.send(rows)
    })
})


usersRouter.post('/', async (request, response) => {
    const { username, password } = request.body
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    const user = {
        username,
        passwordHash,
    }

    sql = `INSERT INTO users(username, password) 
                    VALUES ('${user.username}', '${user.passwordHash}') RETURNING *;`
    db.all(sql, function (err, rows) {
        console.log(err)
        console.log(rows)
        response.status(201).json(rows[0])
    })
})

module.exports = usersRouter