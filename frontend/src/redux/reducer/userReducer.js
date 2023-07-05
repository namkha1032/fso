// import libraries
import { createSlice } from '@reduxjs/toolkit'
// import services


const userSlice = createSlice({
    name: "user",
    initialState: null,
    reducers: {
        userLogin(state, action){
            return action.payload
        },
        userLogout(state, action){
            return action.payload
        }
    }
})

export default userSlice