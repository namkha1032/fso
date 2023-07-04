// import libraries
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
// import API
import * as authenAPi from "../api/authen"
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
const LoginForm = (props) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [errorMessage, setErrorMessage] = useState(null)
    const [logging, setLogging] = useState(false)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    async function handleLogin(event) {
        event.preventDefault()
        setLogging(true)
        try {
            // dispatch({ type: "saga/userLogin", payload: { username, password } })
            // Gọi thẳng API ở đây thay vì thông qua saga để tiện catch error
            const user = await authenAPi.loginAPI({ username, password })
            dispatch({ type: "user/userLogin", payload: user })
            window.localStorage.setItem(
                'loggedNoteappUser', JSON.stringify(user)
            )
            setUsername('')
            setPassword('')
            navigate(window.sessionStorage.getItem("currentpath"))
        } catch (exception) {
            console.log("exception is: ", exception)
            setErrorMessage('Wrong credentials')
            setTimeout(() => {
                setErrorMessage(null)
            }, 5000)
        }
        setLogging(false)
    }
    return (
        <>
            <Notification message={errorMessage} />
            <form onSubmit={handleLogin}>
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
                <div>{logging ? "loading..." : ""}</div>
                <button type="submit">login</button>
            </form>
        </>
    )
}
export default LoginForm