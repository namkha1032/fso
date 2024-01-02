// import libraries
import { useState } from "react"

const CrudNoteForm = (props) => {
    // props
    let crudNoteMutation = props.crudNoteMutation
    let note = props.note
    // state
    let [newContent, setNewContent] = useState(note.content)
    // hook
    // query
    // mutation
    // function
    async function handleCrudNote(event) {
        event.preventDefault()
        const newObj = {
            ...note,
            content: newContent
        }
        try {
            await crudNoteMutation.mutateAsync(newObj)
            setNewContent('')
        } catch (error) {

        }
    }
    // logic
    // HTMl
    return (
        <>
            <form onSubmit={handleCrudNote}>
                <input
                    value={newContent}
                    onChange={(event) => { setNewContent(event.target.value) }}
                    disabled={crudNoteMutation.isPending ? true : false}
                />
                <button type="submit" disabled={crudNoteMutation.isPending ? true : false}>save</button>
            </form>
        </>
    )
}
export default CrudNoteForm