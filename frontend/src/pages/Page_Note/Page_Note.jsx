import { useParams, useLocation } from "react-router-dom"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { useEffect, useMemo, useState } from "react"
// import APIs
import { getOneNote } from "../../api/noteApi"
const Page_Note = () => {
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

export default Page_Note