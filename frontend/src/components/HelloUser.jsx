// import libraries
import { useSelector, useDispatch } from "react-redux";
// import components
import Button from "./Button"
// import reducers
import userSlice from "../redux/reducers/userReducer"

const HelloUser = () => {
    const dispatch = useDispatch()
    const username1 = useSelector(state => state.user.username)
    // const username2 = JSON.parse(window.localStorage.getItem("loggedNoteappUser")).username
    function handleLogout() {
        dispatch(userSlice.actions.userLogout(null))
    }
    return (
        <>
            <p>Hello {username1}</p>
            {/* <p>Username2: {username2}</p> */}
            <Button
                handleAction={handleLogout}
                content="log out">
            </Button>
        </>
    )
}
export default HelloUser