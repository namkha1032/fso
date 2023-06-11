import axios from 'axios'
const baseUrl = 'http://localhost:3001/notes'

async function getAll(){
    const response = await axios.get(baseUrl)
    return response
}

async function create(newObject) {
    const response = await axios.post(baseUrl, newObject)
    return response
}

async function update(id, newObject){
    const response = await axios.put(`${baseUrl}/${id}`, newObject)
    return response
}

export  {getAll,create,update}