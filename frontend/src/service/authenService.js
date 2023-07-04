// import librarys
import * as authenAPI from "../api/authen"
// import reducer
import userSlice from "../redux/reducers/userReducer"
// API
export const login = (credentials) => {
    return async dispatch => {
        const user = await authenAPI.apiLogin(credentials)
        window.localStorage.setItem(
            'loggedNoteappUser', JSON.stringify(user)
        )
        dispatch(userSlice.actions.userLogin(user))
    }

}