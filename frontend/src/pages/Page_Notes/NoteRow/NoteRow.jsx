// import libraries
import { useState } from "react"
import { Link } from 'react-router-dom'
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
// import apis
import { updateNote, deleteNote } from "../../../api/noteApi"
// import components
import CustomizeButton from "../CustomizeButton/CustomizeButton"
import CrudNoteForm from "../../../components/CrudNoteForm/CrudNoteForm"
// import MUI
import {
    TableRow,
    TableCell,
} from '@mui/material'

const NoteRow = (props) => {
    // state
    let [updating, setUpdating] = useState(false)
    // react query
    const queryClient = useQueryClient()
    const updateNoteMutation = useMutation({
        mutationFn: updateNote,
        onSuccess: async (res) => {
            const noteToUpdate = await queryClient.getQueryData(["notes", res.id])
            if (noteToUpdate) {
                await queryClient.setQueryData(["notes", res.id], res)
            }
            await queryClient.invalidateQueries({ queryKey: ["notes"] })
            return setUpdating(false)
        }
    })
    const importanceNoteMutation = useMutation({
        mutationFn: updateNote,
        onSuccess: async (res) => {
            const noteToUpdate = await queryClient.getQueryData(["notes", res.id])
            if (noteToUpdate) {
                await queryClient.setQueryData(["notes", res.id], res)
            }
            return await queryClient.invalidateQueries({ queryKey: ["notes"] })
        }
    })
    const deleteNoteMutation = useMutation({
        mutationFn: deleteNote,
        onSuccess: async () => {
            return await queryClient.invalidateQueries({ queryKey: ["notes"] })
        }
    })
    const isPending = updateNoteMutation.isPending || importanceNoteMutation.isPending || deleteNoteMutation.isPending
    // redux
    function handleImportance() {
        const changedNote = { ...props.note, important: !props.note.important } // shallow copy!!
        importanceNoteMutation.mutate(changedNote)
    }
    function handleDeleteNote() {
        deleteNoteMutation.mutate(props.note.id)
    }
    function handleToggleUpdateNote() {
        setUpdating(!updating)
    }
    return (
        <>
            <TableRow>
                <TableCell>{props.note.id}</TableCell>
                <TableCell style={{ whiteSpace: 'pre-line' }}>
                    {!updating
                        ? <Link to={`/notes/${props.note.id}`}>
                            {props.note.content}
                        </Link>
                        : <CrudNoteForm
                            note={props.note}
                            crudNoteMutation={updateNoteMutation}
                            isPending={isPending} />}
                </TableCell>
                <TableCell>
                    <CustomizeButton
                        content={props.note.important ? "true" : "false"}
                        handleAction={handleImportance}
                        disabled={isPending ? true : false}>
                    </CustomizeButton>
                </TableCell>
                <TableCell>{props.note.date}</TableCell>
                <TableCell>{props.note.username}</TableCell>
                <TableCell>
                    <CustomizeButton
                        content={updating ? "Cancel" : "Update"}
                        handleAction={handleToggleUpdateNote}
                        disabled={isPending ? true : false}>
                    </CustomizeButton>
                </TableCell>
                <TableCell>
                    <CustomizeButton
                        content="Delete"
                        handleAction={handleDeleteNote}
                        disabled={isPending ? true : false}>
                    </CustomizeButton>
                </TableCell>
            </TableRow>
        </>
    )
}
export default NoteRow