// import libraries
import {
  BrowserRouter,
  Routes, Route, Link, Navigate
} from 'react-router-dom'
import { useEffect } from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
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
// ------------------------------------------------------------------------------------------------------
const App = () => {

  // const user = useSelector(state => state.user)
  useEffect(() => {
    console.log("---------------MOUNT----------------")
  }, [])
  // React Query
  let userQuery = useQuery({
    queryKey: ['user'],
    queryFn: () => {
      const userJSON = window.localStorage.getItem('user')
      if (userJSON) {
        return JSON.parse(userJSON)
      }
      else {
        return null
      }
    },
    initialData: null,
    refetchOnWindowFocus: false
  })
  let filterQuery = useQuery({
    queryKey: ['filter'],
    queryFn: () => {
      return "ALL"
    }
  })
  return (

    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />}></Route>
        <Route path="/notes" element={<NotesPage />} />
        <Route path="/notes/:id" element={<NotePage />} />
        <Route path="/users"
          element={userQuery.data
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