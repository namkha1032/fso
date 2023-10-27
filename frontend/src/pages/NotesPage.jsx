// import logo from './logo.svg';
// import './App.css';
// import library
import { useSelector } from "react-redux"
import { useQuery, useQueryClient } from "@tanstack/react-query"
// import Components
import FilterSelector from "../components/FilterSelector"
import CreateNoteForm from '../components/CreateNoteForm'
import NoteTable from '../components/NoteTable'
import Togglable from '../components/Togglable'
import HelloUser from '../components/HelloUser'
// import apis
import { getNotes } from "../api/noteApi"
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
  const notes = notesQuery.data
  // HTMl
  return (
    <>
      <h1>Note Page</h1>
      {user !== null &&
        <>
          <HelloUser />
          <Togglable buttonLabel="new note">
            <CreateNoteForm />
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
