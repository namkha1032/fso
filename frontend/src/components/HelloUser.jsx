// import libraries
import { useSelector, useDispatch } from "react-redux";
// import components
import Button from "./Button"
// import reducers
import userSlice from "../redux/reducer/userReducer"

const HelloUser = () => {
    const username1 = useSelector(state => state.user.username)
    // const username2 = JSON.parse(window.localStorage.getItem("loggedNoteappUser")).username
    
    return (
        <>
            <p>Hello {username1}</p>
        </>
    )
}
export default HelloUser