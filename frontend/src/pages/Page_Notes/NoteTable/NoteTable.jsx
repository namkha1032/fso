// import libraries
import { useSearchParams } from "react-router-dom"
import { useQueryClient, useMutation } from "@tanstack/react-query"
// import component
import NoteRow from "../NoteRow/NoteRow"
// import api
import { updateNote } from "../../../apis/noteApi"
// import MUI
import {
    Paper,
    TableContainer,
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell
} from '@mui/material'
const NoteTable = () => {
    console.log("render NoteTable")
    // props
    // states
    // hooks
    let queryClient = useQueryClient()
    // queries
    // mutations
    // functions
    // logics
    let filterValue = queryClient.getQueryData(['filter'])
    let notes = queryClient.getQueryData(['notes'])
    let notesToShow = null
    if (filterValue == "ALL") {
        notesToShow = notes
    }
    else if (filterValue == "IMPORTANT") {
        notesToShow = notes.filter(note => note.important == true)
    }
    else if (filterValue == "NONIMPORTANT") {
        notesToShow = notes.filter(note => note.important == false)
    }
    // HTMl
    return (
        <>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Note ID</TableCell>
                            <TableCell>Content</TableCell>
                            <TableCell>Important</TableCell>
                            <TableCell>Date</TableCell>
                            <TableCell>Username</TableCell>
                            <TableCell>Update</TableCell>
                            <TableCell>Delete</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {notesToShow?.map(note => (
                            <NoteRow key={note.id} note={note}></NoteRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}
export default NoteTable