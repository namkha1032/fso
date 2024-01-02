// import libraries
import { useQuery, useQueryClient } from "@tanstack/react-query";
const HelloUser = () => {
    // props
    // state
    // hook
    const queryClient = useQueryClient()
    // query
    // mutation
    // function
    // logic
    const user = queryClient.getQueryData(['user'])
    // HTMl
    return (
        <>
            <p>Hello {user?.username}</p>
        </>
    )
}
export default HelloUser