// import libraries
import { Link } from "react-router-dom"
import { useQueryClient } from "@tanstack/react-query";
// Import MUI
import {
    AppBar,
    Toolbar,
    IconButton,
    Button
} from '@mui/material'
const NavBar = () => {
    // let user = window.localStorage.getItem("user")
    // user = JSON.parse(user)
    let queryClient = useQueryClient()
    let user = queryClient.getQueryData(['user'])
    function handleLogout() {
        window.localStorage.removeItem('user')
        queryClient.setQueryData(['user'], null)
    }
    function handleSaveURL() {
        window.sessionStorage.setItem("currentpath", window.location.pathname)
    }
    return (
        <>
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                    </IconButton>
                    <Button color="inherit">
                        <Link to="/">home</Link>
                    </Button>
                    <Button color="inherit">
                        <Link to="/notes">notes</Link>
                    </Button>
                    <Button color="inherit">
                        <Link to="/users">users</Link>
                    </Button>

                    {user
                        ?
                        <>
                            <em>Hello {user.username}</em>
                            <Button color="inherit">
                                <Link style={{ padding: 5 }} onClick={handleLogout}>Log out</Link>
                            </Button>
                        </>
                        :
                        <>
                            <Button color="inherit">
                                <Link to="/login" onClick={handleSaveURL}>login</Link>
                            </Button>
                            <Button color="inherit">
                                <Link style={{ padding: 5 }} to="/signup" onClick={handleSaveURL}>signup</Link>
                            </Button>
                        </>
                    }
                </Toolbar>
            </AppBar >
        </>
    )
}
export default NavBar