// import libraries
import { useState } from 'react'
import { Link, useNavigate, redirect } from 'react-router-dom'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { userLogin } from '../../apis/userApi'
import delay from '../../functions/delay'
// import MUI
import { TextField, Button, Alert } from "@mui/material"
// import apis
import { getNotes, updateNote, deleteNote } from '../../apis/noteApi'

const Page_LogIn = () => {
    // props
    // states
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    // hooks
    const navigate = useNavigate()
    const queryClient = useQueryClient()
    // queries
    // mutations
    const userLoginMutation = useMutation({
        mutationFn: userLogin,
    })
    // functions
    async function handleLogin(event) {
        event.preventDefault()
        try {
            let userReturn = await userLoginMutation.mutateAsync({ username, password })
            window.localStorage.setItem(
                'user', JSON.stringify(userReturn)
            )
            queryClient.setQueryData(['user'], userReturn)
            await delay(1000)
            navigate('/')
        }
        catch (error) {
            console.log('error: ', error)
            await delay(2000)
            userLoginMutation.reset()
        }
    }
    // logics
    // HTML
    return (
        <>
            <h1>Login Page</h1>
            <form onSubmit={handleLogin}>
                <TextField
                    type="text"
                    value={username}
                    label="username"
                    onChange={(event) => { setUsername(event.target.value) }}
                />
                <br />
                <br />
                <TextField
                    type="password"
                    value={password}
                    label="password"
                    onChange={(event) => { setPassword(event.target.value) }}
                />
                <br />
                <br />
                <Button variant="outlined" color="secondary" type="submit">login</Button>
                <br />
                <div>{userLoginMutation.isPending ? "loading..." : ""}</div>
                {userLoginMutation.isError
                    ? <Alert color="error">
                        Wrong credential!
                    </Alert>
                    : null
                }
                {userLoginMutation.isSuccess
                    ? <Alert color="success">
                        Login successfully!!
                    </Alert>
                    : null
                }
            </form>
        </>
    )
}

export default Page_LogIn