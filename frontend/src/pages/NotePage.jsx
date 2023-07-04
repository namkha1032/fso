import { useParams, useLocation } from "react-router-dom"
import { useSelector } from "react-redux"
import { useMemo } from "react"
const NotePage = () => {
    let location = useLocation()
    console.log("location: ", location)
    const id = useParams().id
    const note = useSelector(state => {
        return state.notes.find(note => note.id == id)
    })
    if (note) {
        console.log(note.content)
    }
    console.log("note: ", note)
    return (
        <>
            <h1>{note && note.content}</h1>
        </>
    )
}
export default NotePage