// import libraries
import { takeEvery, put, all, call, takeLatest } from "redux-saga/effects"
import axios from 'axios'
import noteSlice from "../reducer/noteReducer"
function* initializeNotes() {
    const response = yield call(axios.get, 'http://localhost:3001/api/notes')
    yield put(noteSlice.actions.setNotes(response.data))
    // yield put({ type: "notes/setNotes", payload: response.data })
    // lệnh ở dòng 7 và dòng 8 giống nhau, xài lệnh nào cũng được
    // có thể thử comment dòng 7 và uncomment dòng 8 để test
}

function* addNote(action) {
    let userlocal = JSON.parse(window.localStorage.getItem("user"))
    let token = `Bearer ${userlocal.token}`
    const config = {
        headers: { Authorization: token },
    }
    const response = yield call(axios.post, 'http://localhost:3001/api/notes', action.payload, config)
    yield put(noteSlice.actions.addNote(response.data))
    // yield put({ type: "notes/addNote", payload: response.data })
}

function* changeImportance(action) {
    const response = yield call(axios.patch, `http://localhost:3001/api/notes/${action.payload.id}`, action.payload)
    yield put(noteSlice.actions.changeImportance(response.data.id))
    // yield put({ type: "notes/changeImportance", payload: response.data.id })
}

function* deleteNote(action) {
    const response = yield call(axios.delete, `http://localhost:3001/api/notes/${action.payload}`)
    yield put(noteSlice.actions.deleteNote(response.data.id))
    // yield put({ type: "notes/deleteNote", payload: response.data.id })
}

function* updateNote(action) {
    const response = yield call(axios.patch, `http://localhost:3001/api/notes/${action.payload.id}`, action.payload)
    yield put(noteSlice.actions.changeContent(response.data))
    // yield put({ type: "notes/changeContent", payload: response.data })
}

export default function* noteSaga() {
    yield all([
        takeEvery("saga/initializeNotes", initializeNotes),
        takeEvery("saga/addNote", addNote),
        takeEvery("saga/changeImportance", changeImportance),
        takeEvery("saga/deleteNote", deleteNote),
        takeEvery("saga/updateNote", updateNote)
    ])
}