import axios from 'axios'
import * as noteService from '../services/notes'
const ImportantButton = (props) => {
    function toggleImportance() {
        const changedNote = { ...props.note, important: !props.note.important } // shallow copy!!
        noteService.updateNote(props.note.id, changedNote)
            .then(response => {
                props.setNotes(props.notes.map(note => note.id != props.note.id ? note : response))
            })
    }
    let impo = props.note.important ? "true" : "false"
    return (
        <>
            <button onClick={toggleImportance}>{impo}</button>
        </>
    )

}
const DeleteButton = (props) => {
    function handleDeleteNote() {
        console.log("handle delete note")
        noteService.deleteNote(props.note.id)
            .then(response => {
                props.setNotes(props.notes.filter(note => note.id != response.id))
            })
    }
    return (
        <>
            <button onClick={handleDeleteNote}>Delete</button>
        </>
    )
}

const UpdateButton = (props) => {
    return (
        <>
            <button>Update</button>
        </>
    )
}
const Note = (props) => {
    let impo = props.note.important ? "true" : "false"
    return (
        <>
            <tr>
                <td>{props.note.id}</td>
                <td>{props.note.content}</td>
                <td>
                    <ImportantButton
                        note={props.note}
                        notes={props.notes}
                        setNotes={props.setNotes}>
                    </ImportantButton>
                </td>
                <td>{props.note.date}</td>
                <td>{props.note.username}</td>
                <td>
                    <DeleteButton
                        note={props.note}
                        notes={props.notes}
                        setNotes={props.setNotes}>
                    </DeleteButton>
                </td>
                <td>
                    <UpdateButton></UpdateButton>
                </td>
            </tr>
        </>
    )
}
export default Note