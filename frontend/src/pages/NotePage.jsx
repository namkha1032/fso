import { useParams, useLocation } from "react-router-dom"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { useEffect, useMemo, useState } from "react"
// import APIs
import { getOneNote } from "../api/noteApi"
const NotePage = () => {
    const queryClient = useQueryClient()
    const noteId = useParams().id
    const getOneNoteQuery = useQuery({
        queryKey: ["notes", parseInt(noteId)],
        queryFn: () => getOneNote(parseInt(noteId))
    })
    console.log("onenote: ", getOneNoteQuery.data)
    return (
        getOneNoteQuery.isLoading
            ? <p>loading...</p>
            : <>
                <h1>{getOneNoteQuery.data.content}</h1>
                <p>{getOneNoteQuery.data.important}</p>
            </>
    )
}

// const NotePage = () => {
//     const [note, setNote] = useState(null)
//     const noteId = useParams().id
//     useEffect(() => {
//         async function fetchNote() {
//             let res = await getOneNote(noteId)
//             console.log("ressss: ", res)
//             setNote(res)
//         }
//         fetchNote()
//     }, [])
//     return (
//         note
//             ? <>
//                 <h1>{note.content}</h1>
//                 <p>{note.important}</p>
//             </>
//             : <p>loading...</p>
//     )
// }
export default NotePage