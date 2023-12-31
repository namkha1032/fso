// import libraries
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
// import apis
import { userSignup } from '../../api/userApi'
const SignupPage = () => {
    // states
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [roleid, setRoleid] = useState(0)
    const [errorMessage, setErrorMessage] = useState(null)
    const navigate = useNavigate()
    const userSignupMutation = useMutation({
        mutationFn: userSignup,
        onSuccess: () => {
            setUsername('')
            setPassword('')
            setRoleid(0)
            navigate("/login")
        }
    })
    async function handleSignup(event) {
        event.preventDefault()
        userSignupMutation.mutate({ username, password, roleid })
    }
    return (
        <>
            {userSignupMutation.isError && <div className="error">Username exist</div>}
            {userSignupMutation.isPending && <p>loading...</p>}
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
            </form>
        </>
    )
}

export default SignupPage