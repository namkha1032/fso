// import libraries
import { createSlice } from '@reduxjs/toolkit'
const noteSlice = createSlice({
    name: "note",
    initialState: [],
    reducers: {
        setNotes(state, action){
            return action.payload
        },
        appendNote(state, action){
            return [...state, action.payload]

        },
        changeImportance(state, action){
            const noteToChange = state.find(note => note.id == action.payload)
            const changedNote = {
                ...noteToChange,
                important: !noteToChange.important
            }
            console.log(JSON.parse(JSON.stringify(state)))
            return state.map(note => note.id == changedNote.id ? changedNote : note)
        },
        deleteNote(state, action){
            const noteToDelete = state.find(note => note.id == action.payload)
            return state.filter(note => note.id != noteToDelete.id)
        }
    }
})

export default noteSlice