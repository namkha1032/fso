import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/login'

const loginAPI = async (credentials) => {
    console.log("run authen api")
    const response = await axios.post(baseUrl, credentials)
    return response.data
}

export { loginAPI } 