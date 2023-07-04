// import librarys
import * as noteAPI from "../api/notes"
// import reducer
import noteSlice from "../redux/reducers/noteReducer"
// API
export const initializeNotes = () => {
    return async dispatch => {
        const returnNotes = await noteAPI.getAll()
        dispatch(noteSlice.actions.setNotes(returnNotes))
    }
}
export const addNote = content => {
    return async dispatch => {
        const returnNote = await noteAPI.addNote(content)
        dispatch(noteSlice.actions.addNote(returnNote))
    }
}
export const changeImportance = (noteObj) => {
    return async dispatch => {
        const returnNote = await noteAPI.updateNote(noteObj)
        dispatch(noteSlice.actions.changeImportance(returnNote.id))
    }
}
export const deleteNote = (noteId) => {
    return async dispatch => {
        const returnNote = await noteAPI.deleteNote(noteId)
        dispatch(noteSlice.actions.deleteNote(returnNote.id))
    }
}
export const updateNote = (noteObj) => {
    return async dispatch => {
        const returnNote = await noteAPI.updateNote(noteObj)
        dispatch(noteSlice.actions.changeContent(returnNote))
    }
}