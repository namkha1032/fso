// import libraries
import { useDispatch, useSelector } from "react-redux"
import { useSearchParams } from "react-router-dom"
import { useEffect } from "react"
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
    // props
    const notes = props.notes
    // redux
    const dispatch = useDispatch()
    let [searchParams, setSearchParams] = useSearchParams()
    useEffect(() => {
        if (searchParams.get("show") == "all") {
            dispatch({ type: "filter/changeFilter", payload: "ALL" })
        }
        else if (searchParams.get("show") == "important") {
            dispatch({ type: "filter/changeFilter", payload: "IMPORTANT" })
        }
        else if (searchParams.get("show") == "nonimportant") {
            dispatch({ type: "filter/changeFilter", payload: "NONIMPORTANT" })
        }
    }, [])
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
                        {notesToShow.map(note => (
                            <NoteRow key={note.id} note={note}></NoteRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}
export default NoteTable