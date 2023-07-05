// import libraries
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom"
// import reducers
import userSlice from "../redux/reducer/userReducer"
// Import MUI
import {
    AppBar,
    Toolbar,
    IconButton,
    Button
} from '@mui/material'
const NavBar = () => {
    const dispatch = useDispatch()
    let user = useSelector(state => state.user)
    function handleLogout() {
        dispatch({ type: "saga/userLogout" })
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