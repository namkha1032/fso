// import libraries
import {
  BrowserRouter,
  Routes, Route, Link, Navigate
} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
// import pages
import UsersPage from "./pages/UsersPage"
import NotesPage from "./pages/NotesPage"
import HomePage from "./pages/HomePage"
import NotePage from "./pages/NotePage"
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
// import components
import NavBar from "./components/NavBar"
import Footer from './components/Footer'
// import MUI
import { Container } from '@mui/material'
import '@fontsource/roboto/400.css';
// import reducers
import noteSlice from "./redux/reducer/noteReducer"
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
  return (
    <Container>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />}></Route>
          <Route path="/notes" element={<NotesPage />} />
          <Route path="/notes/:id" element={<NotePage />} />
          <Route path="/users"
            element={user
              ? <UsersPage />
              : <Navigate replace to="/login" />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/signup" element={<SignupPage />} />
        </Routes>
        <Footer></Footer>
      </BrowserRouter>
    </Container>
  )
}

export default App