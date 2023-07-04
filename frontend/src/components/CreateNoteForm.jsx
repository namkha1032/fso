// import libraries
import { useState, useEffect } from "react"
import { useDispatch } from "react-redux"
const CreateNoteForm = (props) => {
    const dispatch = useDispatch()
    // state
    const [newNote, setNewNote] = useState('')
    // functions
    const handleAddNote = (event) => {
        event.preventDefault()
        // dispatch(noteAPI.addNote({ content: newNote, important: true }))
        dispatch({ type: "saga/addNote", payload: { content: newNote, important: true } })
        setNewNote('')
    }
    return (
        <div>
            <h2>Create a new note</h2>

            <form onSubmit={handleAddNote}>
                <textarea
                    value={newNote}
                    onChange={(event) => {
                        console.log("newnote: ", newNote)
                        setNewNote(event.target.value)
                    }}
                />
                <button type="submit">save</button>
            </form>
            {/* <NoteForm
                handleSubmitAction={handleAddNote}
                handleChangeAction={setNewNote}
                value={newNote}>
            </NoteForm> */}
        </div>
    )
}
export default CreateNoteForm