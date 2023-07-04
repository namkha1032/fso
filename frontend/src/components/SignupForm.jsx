// import libraries
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
// import services
import * as SignupService from "../api/signup"
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
            const user = await SignupService.userSignup({
                username, password, roleid
            })
            // window.localStorage.setItem(
            //     'loggedNoteappUser', JSON.stringify(user)
            // )
            // noteService.setToken(user.token)
            // setUser(user)
            setUsername('')
            setPassword('')
            setRoleid(0)
            navigate("/login")
        } catch (exception) {
            setErrorMessage('Wrong credentials')
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
                <input type="radio" onClick={() => setRoleid(1)} />Admin
                <br />
                <input type="radio" onClick={() => setRoleid(2)} />Recruiter
                <br />
                <input type="radio" onClick={() => setRoleid(3)} />Interviewer
                <br />
                <input type="radio" onClick={() => setRoleid(4)} />Candidate
                <br />
                <button type="submit">signup</button>
            </form>
        </>
    )
}
export default SignupForm