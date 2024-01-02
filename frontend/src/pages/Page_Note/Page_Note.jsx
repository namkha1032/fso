import { useParams, useLocation } from "react-router-dom"
import { useQuery, useQueryClient } from "@tanstack/react-query"
// import APIs
import { getOneNote } from "../../apis/noteApi"
const Page_Note = () => {
    // props
    // states
    // hooks
    const queryClient = useQueryClient()
    const noteId = useParams().id
    // queries
    const getOneNoteQuery = useQuery({
        queryKey: ["notes", parseInt(noteId)],
        queryFn: () => getOneNote(parseInt(noteId))
    })
    // mutations
    // functions
    // logics
    const note = queryClient.getQueryData(['notes', parseInt(noteId)])
    // HTMl
    return (
        note
            ?
            <>
                <h1>{note.content}</h1>
                <p>{note.important}</p>
            </>
            :
            <p>loading...</p>
    )
}

export default Page_Note