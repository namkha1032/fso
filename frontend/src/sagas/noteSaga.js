// import libraries
import { takeEvery, put, all, call, takeLatest } from "redux-saga/effects"
// import API
import * as noteAPI from "../api/notes"

function* initializeNotes(){
    const notes = yield call(noteAPI.getAll)
    yield put({type: "notes/setNotes", payload: notes})
}

function* addNote(action){
    console.log("add Note????")
    const returnNote = yield call(noteAPI.addNote, action.payload)
    yield put({type: "notes/addNote", payload: returnNote})
}

function* changeImportance(action){
    console.log("action: ", action)
    const returnNote = yield call(noteAPI.updateNote, action.payload)
    console.log("good: ", returnNote)
    yield put({type: "notes/changeImportance", payload: returnNote.id})
    console.log("put: ")
}

function* deleteNote(action){
    const returnNote = yield call(noteAPI.deleteNote, action.payload)
    yield put({type: "notes/deleteNote", payload: returnNote.id})
}

function* updateNote(action){
    const returnNote = yield call(noteAPI.updateNote, action.payload)
    yield put({type: "notes/changeContent", payload: returnNote})
}

export default function* noteSaga(){
    yield all([
        takeEvery("saga/initializeNotes", initializeNotes),
        takeEvery("saga/addNote", addNote),
        takeEvery("saga/changeImportance", changeImportance),
        takeEvery("saga/deleteNote", deleteNote),
        takeEvery("saga/updateNote", updateNote)
    ])
}