import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/notes'
let token = null

function setToken(newToken) {
    token = `Bearer ${newToken}`
}
function getAll() {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

function createNote(newObject) {
    const config = {
        headers: { Authorization: token },
    }
    const request = axios.post(baseUrl, newObject, config)
    return request.then(response => response.data)
}

function updateNote(id, newObject) {
    const request = axios.patch(`${baseUrl}/${id}`, newObject)
    return request.then(response => response.data)
}

function deleteNote(id) {
    const request = axios.delete(`${baseUrl}/${id}`)

    return request.then(response => {
        console.log(response)
        return response.data
    })
}

export { getAll, createNote, updateNote, deleteNote, setToken }