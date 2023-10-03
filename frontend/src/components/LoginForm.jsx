// import libraries
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate, redirect } from 'react-router-dom'
import axios from 'axios'
// import MUI
import { TextField, Button, Alert } from "@mui/material"
const Notification = ({ message }) => {
    if (message === null) {
        return null
    }

    return (
        <Alert color="error">
            {message}
        </Alert>
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
            // kiểu như nhập sai mật khẩu, server trả mã lỗi 401 về, mình catch lỗi đó để hiển thị thông báo lên màn hình
            // nếu call API ở saga (như dòng 30) thì phải xử lý phức tạp hơn chút để xử lý được lỗi
            const response = await axios.post('http://localhost:3001/api/login', { username, password })
            console.log("response: ", response)
            const user = response.data
            dispatch({ type: "user/userLogin", payload: user })
            window.localStorage.setItem(
                'loggedNoteappUser', JSON.stringify(user)
            )
            setUsername('')
            setPassword('')
            navigate(window.sessionStorage.getItem("currentpath"))
        } catch (exception) {
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
                <div>{logging ? "loading..." : ""}</div>
                <Button variant="outlined" color="secondary" type="submit">login</Button>
                <br />
            </form>
        </>
    )
}
export default LoginForm