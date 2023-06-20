// import logo from './logo.svg';
// import './App.css';
// import library
import { useState, useEffect, useRef } from "react"
import axios from 'axios'
import * as noteService from './services/notes'
import * as loginService from './services/login'
// import Components
import Note from "./components/Note"
import ShowAllButton from "./components/ShowAllButton"
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import NoteForm from './components/NoteForm'
import Togglable from './components/Togglable'
const App = (props) => {
  // states
  const [notes, setNotes] = useState([])
  const [showAll, setShowAll] = useState(true)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [loginVisible, setLoginVisible] = useState(false)
  // test
  // console.log("user: ", user)
  // effect
  useEffect(() => {
    console.log("use effect")
    noteService.getAll()
      .then(initialNotes => {
        setNotes(initialNotes)
      })
  }, [])
  useEffect(() => {
    const loggedUserJSON = window.sessionStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      noteService.setToken(user.token)
    }
  }, [])
  // functions
  function createNote(noteObject) {
    // event.preventDefault()
    // const noteObject = {
    //   content: newNote,
    //   important: Math.random() < 0.5,
    //   userid: 1
    // }
    noteService.createNote(noteObject)
      .then(response => {
        setNotes([...notes, response])
        // setNewNote('')
      })
  }
  function handleUsernameChange(event) {
    setUsername(event.target.value)
  }
  function handlePasswordChange(event) {
    setPassword(event.target.value)
  }
  async function handleLogin(event) {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })

      window.sessionStorage.setItem(
        'loggedNoteappUser', JSON.stringify(user)
      )
      noteService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }
  // // Child component
  // const loginForm = () => {
  //   const hideWhenVisible = { display: loginVisible ? 'none' : '' }
  //   const showWhenVisible = { display: loginVisible ? '' : 'none' }
  //   return (
  //     <>
  //       <div style={hideWhenVisible}>
  //         <button onClick={() => setLoginVisible(true)}>show login</button>
  //       </div>
  //       <div style={showWhenVisible}>
  //         <LoginForm
  //           username={username}
  //           password={password}
  //           handleUsernameChange={event => setUsername(event.target.value)}
  //           handlePasswordChange={event => setPassword(event.target.value)}
  //           handleSubmit={handleLogin}
  //         />
  //         <button onClick={() => setLoginVisible(false)}>cancel</button>
  //       </div>
  //     </>
  //   )
  // }
  // const noteForm = () => {
  //   return (
  //     <>
  //       <form onSubmit={addNote}>
  //         <input value={newNote} onChange={handleNoteChange} />
  //         <button type="submit">submit</button>
  //       </form>
  //     </>
  //   )
  // }
  // logic
  let notesToShow = showAll ? notes : notes.filter(note => note.important == true)

  // HTMl
  return (
    <>
      <h1>List note</h1>
      <Notification message={errorMessage} />
      {user === null &&
        <Togglable buttonLabel="show login">
          <LoginForm
            username={username}
            password={password}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            handleSubmit={handleLogin}
          />
        </Togglable>}
      {user !== null &&
        <>
          <p>{user.username} logged in</p>
          <Togglable buttonLabel="new note">
            <NoteForm createNote={createNote} />
          </Togglable>
        </>
      }
      <table>
        <thead>
          <tr>
            <th>Note ID</th>
            <th>Content</th>
            <th>Important</th>
            <th>Date</th>
            <th>Username</th>
            <th>Update</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {notesToShow.map(note => (
            <Note key={note.id} note={note} notes={notes} setNotes={setNotes}></Note>
          ))}
        </tbody>
      </table>
      <ShowAllButton showAll={showAll} setShowAll={setShowAll}></ShowAllButton>
    </>
  )
}

export { App };
