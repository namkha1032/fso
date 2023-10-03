// import libraries
import { createSlice } from '@reduxjs/toolkit'
const noteSlice = createSlice({
    name: "notes",
    initialState: [],
    reducers: {
        setNotes(state, action){
            return action.payload
        },
        addNote(state, action){
            const newNote = {
                ...action.payload,
                username: JSON.parse(window.localStorage.getItem("loggedNoteappUser")).username
            }
            return [...state, newNote]

        },
        changeImportance(state, action){
            console.log("state: ", state)
            const noteToChange = state.find(note => note.id == action.payload)
            const changedNote = {
                ...noteToChange,
                important: !noteToChange.important
            }
            // console.log(JSON.parse(JSON.stringify(state)))
            return state.map(note => note.id == changedNote.id ? changedNote : note)
        },
        deleteNote(state, action){
            const noteToDelete = state.find(note => note.id == action.payload)
            return state.filter(note => note.id != noteToDelete.id)
        },
        changeContent(state, action){
            const noteToChange = state.find(note => note.id == action.payload.id)
            const changedNote = {
                ...noteToChange,
                content: action.payload.content
            }
            // console.log(JSON.parse(JSON.stringify(state)))
            return state.map(note => note.id == changedNote.id ? changedNote : note)
        }
    }
})

export default noteSlice