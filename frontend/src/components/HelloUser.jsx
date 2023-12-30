// import libraries
import { useQuery, useQueryClient } from "@tanstack/react-query";
// import components
import Button from "./Button"
// import reducers
import userSlice from "../redux/reducer/userReducer"

const HelloUser = () => {
    const queryClient = useQueryClient()
    const user = queryClient.getQueryData(['user'])
    const username = user?.username

    return (
        <>
            <p>Hello {username}</p>
        </>
    )
}
export default HelloUser