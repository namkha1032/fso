// import libraries
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom"
// import reducers
import userSlice from "../redux/reducers/userReducer"
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
            <Link style={{ padding: 5 }} to="/">home</Link>
            <Link style={{ padding: 5 }} to="/notes">notes</Link>
            <Link style={{ padding: 5 }} to="/users">users</Link>
            {user == null
                ? <>
                    <Link style={{ padding: 5 }} to="/login" onClick={handleSaveURL}>login</Link>
                    <Link style={{ padding: 5 }} to="/signup" onClick={handleSaveURL}>signup</Link>
                </>
                : <>
                    <span style={{ padding: 5 }}>hello {user.username}</span>
                    <span style={{ padding: 5 }} onClick={handleLogout}>Log out</span>
                </>}
        </>
    )
}
export default NavBar