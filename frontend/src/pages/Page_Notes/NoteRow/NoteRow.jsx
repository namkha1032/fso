// import libraries
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
// import apis
import { updateNote, deleteNote } from '../../../apis/noteApi'
// import components
import CustomizeButton from '../CustomizeButton/CustomizeButton'
import CrudNoteForm from '../../../components/CrudNoteForm/CrudNoteForm'
// import MUI
import {
    TableRow,
    TableCell,
} from '@mui/material'

const NoteRow = (props) => {
    // props
    const note = props.note
    // state
    let [updating, setUpdating] = useState(false)
    // hook
    const queryClient = useQueryClient()
    // query
    // mutation
    const updateNoteMutation = useMutation({
        mutationFn: updateNote,
        onSuccess: async (res) => {
            // const noteToUpdate = queryClient.getQueryData(['notes', res.id])
            // if (noteToUpdate) {
            //     queryClient.setQueryData(['notes', res.id], res)
            // }
            await queryClient.invalidateQueries(['notes'])
            setUpdating(false)
        }
    })
    const importanceNoteMutation = useMutation({
        mutationFn: updateNote,
        onSuccess: async (res) => {
            // const noteToUpdate = queryClient.getQueryData(['notes', res.id])
            // if (noteToUpdate) {
            //     queryClient.setQueryData(['notes', res.id], res)
            // }
            await queryClient.invalidateQueries({ queryKey: ['notes'] })
        }
    })
    const deleteNoteMutation = useMutation({
        mutationFn: deleteNote,
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ['notes'] })
        }
    })
    // function
    async function handleImportance() {
        const changedNote = { ...note, important: !note.important } // shallow copy!!
        importanceNoteMutation.mutate(changedNote)
    }
    function handleDeleteNote() {
        deleteNoteMutation.mutate(note.id)
    }
    function handleToggleUpdateNote() {
        setUpdating(!updating)
    }
    // logic
    const isPending = updateNoteMutation.isPending || importanceNoteMutation.isPending || deleteNoteMutation.isPending
    // HTMl
    return (
        <>
            <TableRow>
                <TableCell>{note.id}</TableCell>
                <TableCell style={{ whiteSpace: 'pre-line' }}>
                    {!updating
                        ? <Link to={`/notes/${note.id}`}>
                            {note.content}
                        </Link>
                        : <CrudNoteForm
                            note={note}
                            crudNoteMutation={updateNoteMutation} />}
                </TableCell>
                <TableCell>
                    <CustomizeButton
                        content={note.important ? 'true' : 'false'}
                        handleAction={handleImportance}
                        disabled={isPending ? true : false}>
                    </CustomizeButton>
                </TableCell>
                <TableCell>{note.date}</TableCell>
                <TableCell>{note.username}</TableCell>
                <TableCell>
                    <CustomizeButton
                        content={updating ? 'Cancel' : 'Update'}
                        handleAction={handleToggleUpdateNote}
                        disabled={isPending ? true : false}>
                    </CustomizeButton>
                </TableCell>
                <TableCell>
                    <CustomizeButton
                        content='Delete'
                        handleAction={handleDeleteNote}
                        disabled={isPending ? true : false}>
                    </CustomizeButton>
                </TableCell>
            </TableRow>
        </>
    )
}
export default NoteRow