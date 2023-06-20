// Connect to database
// const sqlite3 = require('sqlite3').verbose()
const db = require('../connect')
const jwt = require('jsonwebtoken')
const notesRouter = require('express').Router()

const getTokenFrom = request => {
    const authorization = request.get('authorization')
    if (authorization && authorization.startsWith('Bearer ')) {
        return authorization.replace('Bearer ', '')
    }
    return null
}
notesRouter.get('/', (request, response) => {
    sql = `SELECT notes.id, notes.content, notes.important, notes.date, notes.userid, users.username 
           FROM notes INNER JOIN users ON notes.userid = users.id;`
    db.all(sql, async function (err, rows) {
        response.send(rows)
    })
})
notesRouter.get('/:id', (request, response) => {
    const id = Number(request.params.id)
    sql = `SELECT * FROM notes WHERE id=${id}`
    db.all(sql, function (err, rows) {
        if (rows.length > 0) {
            response.json(rows[0])
        }
        else {
            response.status(404).end()
        }
    })
})
notesRouter.delete('/:id', (request, response) => {
    const id = Number(request.params.id)
    sql = `DELETE FROM notes WHERE id = ${id} RETURNING *;`
    db.all(sql, function(err, rows){
        response.json(rows[0])
    })
})
notesRouter.post('', async (request, response) => {
    const decodedToken = jwt.verify(getTokenFrom(request), "namkhadeptrai")
    if (!decodedToken.id) {
        return response.status(401).json({ error: 'token invalid' })
    }
    if (request.body.content === undefined) {
        return response.status(400).json({ error: 'content missing' })
    }

    sql = `INSERT INTO notes(content, important, userid) 
    VALUES ('${request.body.content}', ${request.body.important}, ${decodedToken.id}) RETURNING *;`
    db.all(sql, function (err, rows) {
        console.log(err)
        console.log(rows)
        response.json(rows[0])
    })
})
notesRouter.patch('/:id', (request, response) => {
    sql = `UPDATE notes SET content = '${request.body.content}', important = ${request.body.important} WHERE notes.id = ${request.params.id} RETURNING *;`
    db.all(sql, function (err, rows) {
        console.log(err, rows)
        response.json(rows[0])
    })
})


module.exports = notesRouter