// import logo from './logo.svg';
// import './App.css';
// import library
import { useSelector } from "react-redux"
// import Components
import FilterSelector from "../components/FilterSelector"
import CreateNoteForm from '../components/CreateNoteForm'
import NoteTable from '../components/NoteTable'
import Togglable from '../components/Togglable'
import HelloUser from '../components/HelloUser'
// -----------------------------------App---------------------------------------
const NotesPage = () => {
  // logic
  const user = useSelector(state => state.user)
  // HTMl
  return (
    <>
      <h1>Note Page</h1>
      {user !== null &&
        <>
          <HelloUser></HelloUser>
          <Togglable buttonLabel="new note">
            <CreateNoteForm />
          </Togglable>
        </>
      }
      <FilterSelector></FilterSelector>
      <NoteTable></NoteTable>
    </>
  )
}

export default NotesPage;
