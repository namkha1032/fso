// import libraries
import {
  BrowserRouter,
  Routes, Route, Link, Navigate
} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
// import pages
import UsersPage from "./pages/UsersPage"
import NotesPage from "./pages/NotesPage"
import HomePage from "./pages/HomePage"
import HomePage2 from "./pages/HomePage2"
import NotePage from "./pages/NotePage"
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import TestPage from "./pages/TestPage"
// import components
import NavBar from "./components/NavBar"
import Footer from './components/Footer'
// import MUI
import { Container } from '@mui/material'
import '@fontsource/roboto/400.css';
// import reducers
import noteSlice from "./redux/reducer/noteReducer"
// import apis
import { getNotes } from './api/noteapi'
// ------------------------------------------------------------------------------------------------------
const App = () => {
  // dispatch
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch({ type: "saga/initializeNotes" })
  }, [])
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch({ type: "user/userLogin", payload: user })
    }
  }, [])
  const user = useSelector(state => state.user)

  // React Query
  const result = useQuery({
    queryKey: ['notes'],
    queryFn: getNotes,
    staleTime: 2000
  })
  console.log(JSON.parse(JSON.stringify(result)))

  if (result.isPending) {
    return <div>loading data...</div>
  }

  const notes = result.data
  return (

    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />}></Route>
        <Route path="/notes" element={<NotesPage notes={notes} />} />
        <Route path="/notes/:id" element={<NotePage />} />
        <Route path="/users"
          element={user
            ? <UsersPage />
            : <Navigate replace to="/login" />} />
        <Route path="/home" element={<HomePage2 />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/test" element={<TestPage />} />

      </Routes>
      {/* <Footer></Footer> */}
    </BrowserRouter>
  )
}

export default App