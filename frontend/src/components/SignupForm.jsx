// import libraries
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const Notification = ({ message }) => {
    if (message === null) {
        return null
    }

    return (
        <div className="error">
            {message}
        </div>
    )
}
const SignupForm = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [roleid, setRoleid] = useState(0)
    const [errorMessage, setErrorMessage] = useState(null)
    const navigate = useNavigate()
    async function handleSignup(event) {
        event.preventDefault()

        try {
            const response = await axios.post('http://localhost:3001/api/users', { username, password, roleid })
            setUsername('')
            setPassword('')
            setRoleid(0)
            navigate("/login")
        } catch (exception) {
            setErrorMessage('Username exist')
            setTimeout(() => {
                setErrorMessage(null)
            }, 5000)
        }
    }
    return (
        <>
            <Notification message={errorMessage} />
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
export default SignupForm