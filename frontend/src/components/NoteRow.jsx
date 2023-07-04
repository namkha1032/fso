// import libraries
import axios from 'axios'
import { useDispatch } from "react-redux"
import { useState } from "react"
import { Link } from 'react-router-dom'
// import components
import Button from "./Button"

const UpdateForm = (props) => {
    const dispatch = useDispatch()
    let [newContent, setNewContent] = useState(props.note.content)
    function handleUpdateNote(event) {
        event.preventDefault()
        const newObj = {
            ...props.note,
            content: newContent
        }
        // dispatch(noteAPI.updateNote(newObj))
        dispatch({type: "saga/updateNote", payload: newObj})
        setNewContent("")
        props.setUpdating(false)
    }
    return (
        <>
            <form onSubmit={handleUpdateNote}>
                <input
                    value={newContent}
                    onChange={(event) => { setNewContent(event.target.value) }}
                />
                <button type="submit">save</button>
            </form>
            {/* <NoteForm
                handleSubmitAction={handleUpdateNote}
                handleChangeAction={setNewContent}
                value={newContent}>
            </NoteForm> */}
        </>
    )
}
const NoteRow = (props) => {
    console.log(props)
    const dispatch = useDispatch()
    // state
    let [updating, setUpdating] = useState(false)
    function handleImportance() {
        const changedNote = { ...props.note, important: !props.note.important } // shallow copy!!
        // dispatch(noteAPI.changeImportance(changedNote))
        dispatch({type: "saga/changeImportance", payload: changedNote})
    }
    function handleDeleteNote() {
        // dispatch(noteAPI.deleteNote(props.note.id))
        dispatch({type: "saga/deleteNote", payload: props.note.id})
    }
    function handleToggleUpdateNote() {
        setUpdating(!updating)
    }
    return (
        <>
            <tr>
                <td>{props.note.id}</td>
                <td style={{whiteSpace: 'pre-line'}}>{!updating ? <Link to={`/notes/${props.note.id}`}>{props.note.content}</Link> : <UpdateForm note={props.note} setUpdating={setUpdating}></UpdateForm>}</td>
                <td>
                    <Button
                        content={props.note.important ? "true" : "false"}
                        handleAction={handleImportance}>
                    </Button>
                </td>
                <td>{props.note.date}</td>
                <td>{props.note.username}</td>
                <td>
                    <Button
                        content={updating ? "Cancel" : "Update"}
                        handleAction={handleToggleUpdateNote}>
                    </Button>
                </td>
                <td>
                    <Button
                        content="Delete"
                        handleAction={handleDeleteNote}>
                    </Button>
                </td>
            </tr>
        </>
    )
}
export default NoteRow