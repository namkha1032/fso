import axios from 'axios'
import * as noteService from '../services/notes'
const ImportantState = (props) => {
    async function toggleImportance(){
        const changedNote = {...props.note, important: !props.note.important} // shallow copy!!
        const response = await noteService.update(props.note.id, changedNote)
        props.setNotes(props.notes.map(note => note.id != props.note.id ? note : response.data))
    }
    let impo = props.note.important ? "true" : "false"
    return(
        <>
            <button onClick = {toggleImportance}>{impo}</button>
        </>
    )

}

const Note = (props) => {
    let impo = props.note.important ? "true" : "false"
    return (
        <>
            <li><ImportantState 
                 note = {props.note} 
                 notes = {props.notes}
                 setNotes = {props.setNotes}></ImportantState>{[": ", props.note.content]}</li>
        </>
    )
}
export { Note }