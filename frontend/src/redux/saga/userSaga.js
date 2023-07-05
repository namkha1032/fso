// import libraries
import { takeEvery, put, all, call, takeLatest } from "redux-saga/effects"
import axios from 'axios'
// import reducers
import userSlice from "../reducer/userReducer"

function* loginSaga(action) {
    try {
        const user = yield call(axios.post, 'http://localhost:3001/api/login', action.payload)
        window.localStorage.setItem(
            'loggedNoteappUser', JSON.stringify(user)
        )
        yield put(userSlice.actions.userLogin(user))
        // yield put({ type: "user/userLogin", payload: user })

    }
    catch (error) {
        console.log("error is: ", error)
    }
}
function* logoutSaga() {
    window.localStorage.removeItem('loggedNoteappUser')
    yield put(userSlice.actions.userLogout(null))
    // yield put({ type: "user/userLogout", payload: null })
}

export default function* userSaga() {
    yield all([
        takeEvery("saga/userLogin", loginSaga),
        takeEvery("saga/userLogout", logoutSaga)
    ])
}