import axios from "axios";

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));


export async function userLogin(credential) {
    await delay(1000)
    let res = await axios.post('http://localhost:3001/api/login', credential)
    return res.data
}

export async function userSignup(credential) {
    await delay(1000)
    let res = await axios.post('http://localhost:3001/api/users', credential)
    return res.data
}

export async function createNote(newNoteObj) {
    let userlocal = JSON.parse(window.localStorage.getItem("user"))
    let token = `Bearer ${userlocal.token}`
    const config = {
        headers: { Authorization: token },
    }
    let res = await axios.post('http://localhost:3001/api/notes', newNoteObj, config)
    return res.data
}

export async function changeImportance(newNoteObj) {
    let res = await axios.patch(`http://localhost:3001/api/notes/${newNoteObj.id}`, newNoteObj)
    return res.data
}