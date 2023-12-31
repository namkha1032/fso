// import libraries
import { useQuery, useQueryClient } from "@tanstack/react-query";
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