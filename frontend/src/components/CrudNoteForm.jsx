// import libraries
import { useState } from "react"

const CrudNoteForm = (props) => {
    // props
    let crudNoteMutation = props.crudNoteMutation
    let isPending = props.isPending
    let note = props.note
    // states
    let [newContent, setNewContent] = useState(note.content)
    // functions
    function handleCrudNote(event) {
        event.preventDefault()
        const newObj = {
            ...note,
            content: newContent
        }
        crudNoteMutation.mutate(newObj)
    }
    // HTML
    return (
        <>
            <form onSubmit={handleCrudNote}>
                <input
                    value={newContent}
                    onChange={(event) => { setNewContent(event.target.value) }}
                    disabled={isPending ? true : false}
                />
                <button type="submit" disabled={isPending ? true : false}>save</button>
            </form>
        </>
    )
}




export default CrudNoteForm