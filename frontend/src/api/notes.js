import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/notes'
// let token = null

// export async function setToken(newToken) {
//     token = `Bearer ${newToken}`
// }
export async function getAll() {
    // const request = axios.get(baseUrl)
    // return request.then(response => response.data)
    const response = await axios.get(baseUrl)
    return response.data
}

export async function addNote(newObject) {
    let userlocal = JSON.parse(window.localStorage.getItem("loggedNoteappUser"))
    let token = `Bearer ${userlocal.token}`
    const config = {
        headers: { Authorization: token },
    }
    // const request = axios.post(baseUrl, newObject, config)
    // return request.then(response => response.data)
    const response =  await axios.post(baseUrl, newObject, config)
    return response.data
}

export async function updateNote(newObject) {
    // const request = axios.patch(`${baseUrl}/${id}`, newObject)
    // return request.then(response => response.data)
    const response = await axios.patch(`${baseUrl}/${newObject.id}`, newObject)
    return response.data
}

export async function deleteNote(id) {
    // const request = axios.delete(`${baseUrl}/${id}`)
    // return request.then(response => response.data)
    const response = await axios.delete(`${baseUrl}/${id}`)
    return response.data
}
