import { useQueryClient } from "@tanstack/react-query"
const UsersPage = () => {
    let queryClient = useQueryClient()
    let user = queryClient.getQueryData(['user'])
    return (
        <>
            <h1>{user?.username} Profile page</h1>
        </>
    )
}
export default UsersPage