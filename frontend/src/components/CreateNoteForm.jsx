// import libraries
import { useState, useEffect } from "react"
import { useDispatch } from "react-redux"

import TextareaAutosize from '@mui/base/TextareaAutosize';
import { styled } from '@mui/system';
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createNote } from "../api/noteApi";

const CreateNoteForm = () => {
    // react query
    const queryClient = useQueryClient()
    const newNoteMutation = useMutation({
        mutationFn: createNote,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['notes'] })
            // const notes = queryClient.getQueryData(['notes'])
            // queryClient.setQueryData(['notes'], notes.concat(newNote))
        }
    })
    // state
    const [newNote, setNewNote] = useState('')
    // functions
    const handleAddNote = (event) => {
        event.preventDefault()
        newNoteMutation.mutate({ content: newNote, important: true })
        setNewNote('')
    }
    return (
        <div>
            <h2>Create a new note</h2>

            <form onSubmit={handleAddNote}>
                <TextareaAutosize
                    value={newNote}
                    onChange={(event) => {
                        setNewNote(event.target.value)
                    }}
                />
                <button type="submit">save</button>
            </form>
        </div>
    )
}




export default CreateNoteForm