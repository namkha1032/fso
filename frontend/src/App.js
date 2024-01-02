// import libraries
import {
  BrowserRouter,
  Routes, Route, Link, Navigate
} from 'react-router-dom'
import { useEffect } from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
// import pages
import Page_User from "./pages/Page_User/Page_User"
import Page_Notes from "./pages/Page_Notes/Page_Notes"
import Page_Home from "./pages/Page_Home/Page_Home"
import Page_Note from "./pages/Page_Note/Page_Note"
import Page_LogIn from './pages/Page_LogIn/Page_LogIn'
import Page_SignUp from './pages/Page_SignUp/Page_SignUp'
// import components
import NavBar from "./components/NavBar/NavBar"
import Footer from './components/Footer/Footer'
// import MUI
import { Container } from '@mui/material'
import '@fontsource/roboto/400.css';
// ------------------------------------------------------------------------------------------------------
// test
const App = () => {
  // query
  console.log("render App")
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
    // initialData: null,
    refetchOnWindowFocus: false
  })
  
  return (

    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<Page_Home />} />
        <Route path="/login" element={<Page_LogIn />}></Route>
        <Route path="/notes" element={<Page_Notes />} />
        <Route path="/notes/:id" element={<Page_Note />} />
        <Route path="/users"
          element={userQuery.data
            ? <Page_User />
            : <Navigate replace to="/login" />} />
        <Route path="/signup" element={<Page_SignUp />} />
      </Routes>
      {/* <Footer></Footer> */}
    </BrowserRouter>
  )
}

export default App