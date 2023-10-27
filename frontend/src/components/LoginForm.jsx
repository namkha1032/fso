// import libraries
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate, redirect } from 'react-router-dom'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { userLogin } from '../api/userApi'
// import MUI
import { TextField, Button, Alert } from "@mui/material"

const LoginForm = () => {
    // states
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    // react query
    const queryClient = useQueryClient()

    const userMutation = useMutation({
        mutationFn: userLogin,
        onSuccess: (userReturn) => {
            window.localStorage.setItem(
                'user', JSON.stringify(userReturn)
            )
            setUsername('')
            setPassword('')
            queryClient.setQueryData(['user'], userReturn)
            navigate(window.sessionStorage.getItem("currentpath"))
        }
    })
    const navigate = useNavigate()
    async function handleLogin(event) {
        event.preventDefault()
        userMutation.mutate({ username, password })
    }
    return (
        <>
            {userMutation.isError
                ? <Alert color="error">
                    Wrong credential!
                </Alert>
                : null
            }
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
                <div>{userMutation.isPending ? "loading..." : ""}</div>
                <Button variant="outlined" color="secondary" type="submit">login</Button>
                <br />
            </form>
        </>
    )
}
export default LoginForm