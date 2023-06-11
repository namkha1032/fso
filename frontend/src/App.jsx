// import logo from './logo.svg';
// import './App.css';
import { Namkha } from "./components/Namkha"
import { useState, useEffect } from "react"
import { Note } from "./components/Note"
import { ImportantButton } from "./components/ImportantButton"
import axios from 'axios'
import * as noteService from './services/notes'
const App = (props) => {
  // states
  // debugger
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(true)
  // functions
  async function addNote(event) {
    event.preventDefault()
    const noteObject = {
      content: newNote,
      important: Math.random() < 0.5
    }
    const response = await noteService.create(noteObject)
    console.log(response)
    setNotes([...notes, response.data])
    setNewNote('')
  }
  function handleNoteChange(event) {
    setNewNote(event.target.value)
  }
  async function initialFetch() {
    const response = await noteService.getAll()
    setNotes(response.data)
  }
  function renderEffect() {
    initialFetch()
  }
  useEffect(renderEffect, [])
  // logic
  let notesToShow = showAll ? notes : notes.filter(note => note.important == true)
  // HTMl
  return (
    <>
      <h1>List note</h1>
      <ul>
        {notesToShow.map(note => (
          <Note key={note.id} note={note} notes={notes} setNotes={setNotes}></Note>
        ))}
      </ul>
      <form onSubmit={addNote}>
        <input value={newNote} onChange={handleNoteChange} />
        <button type="submit">submit</button>
      </form>
      <ImportantButton showAll={showAll} setShowAll={setShowAll}></ImportantButton>
    </>
  )
}

export { App };
