import { useSelector } from "react-redux"
const UsersPage = () => {
    let user = useSelector(state => state.user)
    return (
        <>
            <h1>{user.username} Profile page</h1>
        </>
    )
}
export default UsersPage