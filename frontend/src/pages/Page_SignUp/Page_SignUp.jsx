// import libraries
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
// import apis
import { userSignup } from '../../apis/userApi'
// import functions
import delay from '../../functions/delay'
// import MUI
import { TextField, Button, Alert } from "@mui/material"
const SignupPage = () => {
    // props
    // states
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [roleid, setRoleid] = useState(0)
    // hooks
    const navigate = useNavigate()
    // queries
    const userSignupMutation = useMutation({
        mutationFn: userSignup
    })
    // functions
    async function handleSignup(event) {
        event.preventDefault()
        try {
            await userSignupMutation.mutateAsync({ username, password, roleid })
            await delay(1000)
            navigate('/login')
        } catch (error) {
            console.log('error: ', error)
            await delay(2000)
            userSignupMutation.reset()
        }
    }
    // logics
    // HTML
    return (
        <>
            <form onSubmit={handleSignup}>
                <div>
                    username
                    <input
                        type="text"
                        value={username}
                        name="Username"
                        onChange={(event) => { setUsername(event.target.value) }}
                    />
                </div>
                <div>
                    password
                    <input
                        type="password"
                        value={password}
                        name="Password"
                        onChange={(event) => { setPassword(event.target.value) }}
                    />
                </div>
                <input name="role" type="radio" onClick={() => setRoleid(1)} />Admin
                <br />
                <input name="role" type="radio" onClick={() => setRoleid(2)} />Recruiter
                <br />
                <input name="role" type="radio" onClick={() => setRoleid(3)} />Interviewer
                <br />
                <input name="role" type="radio" onClick={() => setRoleid(4)} />Candidate
                <br />
                <button type="submit">signup</button>
                {userSignupMutation.isPending && <p>loading...</p>}
                {userSignupMutation.isError && <Alert color="error">
                    Username exist!
                </Alert>}
                {userSignupMutation.isSuccess && <Alert color="success">
                    Login successfully!!
                </Alert>}
            </form>
        </>
    )
}

export default SignupPage