
import { useState, useEffect } from "react"
const NoteForm = (props) => {
    // state
    const [newNote, setNewNote] = useState('')
    // functions
    const addNote = (event) => {
        event.preventDefault()
        props.createNote({
            content: newNote,
            important: true
        })
        setNewNote('')
    }
    function handleNoteChange(event) {
        setNewNote(event.target.value)
    }
    return (
        <div>
            <h2>Create a new note</h2>

            <form onSubmit={addNote}>
                <input
                    value={newNote}
                    onChange={handleNoteChange}
                />
                <button type="submit">save</button>
            </form>
        </div>
    )
}
export default NoteForm