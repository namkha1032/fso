// import logo from './logo.svg';
// import './App.css';
// import library
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query"
// import Components
import FilterSelector from "./FilterSelector/FilterSelector.jsx"
import NoteTable from './NoteTable/NoteTable.jsx'
import Togglable from './Togglable/Togglable.jsx'
import HelloUser from './HelloUser/HelloUser.jsx'
import CrudNoteForm from "../../components/CrudNoteForm/CrudNoteForm.jsx"
// import apis
import { getNotes, createNote } from "../../api/noteApi.js"
// -----------------------------------App---------------------------------------
const NotesPage = () => {
  const queryClient = useQueryClient()
  const user = queryClient.getQueryData(['user'])
  // API Call
  const notesQuery = useQuery({
    queryKey: ['notes'],
    queryFn: getNotes,
    select: (res) => {
      res.sort((a, b) => b.id - a.id)
      return res
    }
  })
  const addNoteMutation = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      return queryClient.invalidateQueries(['notes'])
    }
  })
  const isPending = addNoteMutation.isPending
  const notes = notesQuery.data
  // HTMl
  return (
    <>
      <h1>Note Page</h1>
      {user !== null &&
        <>
          <HelloUser />
          <Togglable buttonLabel="new note">
            <CrudNoteForm
              note={{ content: "", important: true }}
              crudNoteMutation={addNoteMutation}
              isPending={isPending} />
          </Togglable>
        </>
      }
      <FilterSelector />

      {notesQuery.isLoading
        ? <p>Loading...</p>
        : <NoteTable notes={notes}></NoteTable>
      }
    </>
  )
}

export default NotesPage;
