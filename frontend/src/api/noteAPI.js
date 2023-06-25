// import librarys
import * as noteService from "../services/notes"
// import reducer
import noteSlice from "../redux/reducers/noteReducer"
// API
export const initializeNotes = () => {
    return async dispatch => {
        const notes = await noteService.getAll()
        dispatch(noteSlice.actions.setNotes(notes))
    }
}
export const createNote = content => {
    return async dispatch => {
        const newNote = await noteService.createNote(content)
        dispatch(noteSlice.actions.appendNote(newNote))
    }
}
export const changeImportance = (noteId, noteObj) => {
    return async dispatch => {
        const updatedNote = await noteService.updateNote(noteId, noteObj)
        dispatch(noteSlice.actions.changeImportance(updatedNote.id))
    }
}
export const deleteNote = (noteId) => {
    return async dispatch => {
        const returnNote = await noteService.deleteNote(noteId)
        dispatch(noteSlice.actions.deleteNote(returnNote.id))
    }
}