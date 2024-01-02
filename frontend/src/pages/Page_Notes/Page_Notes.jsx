// import logo from './logo.svg';
// import './App.css';
// import library
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query"
import { useSearchParams } from "react-router-dom"
// import Components
import FilterSelector from "./FilterSelector/FilterSelector.jsx"
import NoteTable from './NoteTable/NoteTable.jsx'
import Togglable from './Togglable/Togglable.jsx'
import HelloUser from './HelloUser/HelloUser.jsx'
import CrudNoteForm from "../../components/CrudNoteForm/CrudNoteForm.jsx"

// import apis
import { getNotes, createNote } from "../../apis/noteApi.js"
// -----------------------------------App---------------------------------------

const Page_Notes = () => {
  console.log("render Page_Notes")
  // props
  // states
  // hooks
  const queryClient = useQueryClient()
  // queries
  let filterQuery = useQuery({
    queryKey: ['filter'],
    queryFn: () => {
      return "ALL"
    }
  })
  const notesQuery = useQuery({
    queryKey: ['notes'],
    queryFn: getNotes,
    select: (res) => {
      res.sort((a, b) => b.id - a.id)
      return res
    }
  })
  // mutations
  const addNoteMutation = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      return queryClient.invalidateQueries(['notes'])
    }
  })
  // function
  // logic
  // HTMl
  return (
    <>
      <h1>Note Page</h1>
      {queryClient.getQueryData(['user']) !== null &&
        <>
          <HelloUser />
          <Togglable buttonLabel="new note">
            <CrudNoteForm
              note={{ content: "", important: true }}
              crudNoteMutation={addNoteMutation} />
          </Togglable>
        </>
      }
      {
        queryClient.getQueryData(['notes'])
          ?
          <>
            <FilterSelector />
            <NoteTable />
          </>
          :
          <p>loading...</p>
      }
    </>
  )
}

export default Page_Notes;
