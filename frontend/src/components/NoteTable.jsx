// import libraries
import { useDispatch, useSelector } from "react-redux"
import { useSearchParams } from "react-router-dom"
import { useEffect } from "react"
import { useQueryClient } from "@tanstack/react-query"
// import component
import NoteRow from "./NoteRow"
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
const NoteTable = (props) => {
    const notes = props.notes
    // const notesToShow = useSelector(state => {
    //     if (state.filter == "ALL") {
    //         return state.notes
    //     }
    //     return state.filter == "IMPORTANT"
    //         ? state.notes.filter(note => note.important == true)
    //         : state.notes.filter(note => note.important == false)
    // })
    const notesToShow = notes
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