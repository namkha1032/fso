// import libraries
import { takeEvery, put, all, call, takeLatest } from "redux-saga/effects"
// import apis
import * as authenAPI from "../api/authen"
// import reducers
import userSlice from "../redux/reducers/userReducer"

function* loginSaga(action) {
    try {
        const user = yield call(authenAPI.loginAPI, action.payload)
        window.localStorage.setItem(
            'loggedNoteappUser', JSON.stringify(user)
        )
        yield put({ type: "user/userLogin", payload: user })

    }
    catch(error){
        console.log("error is: ", error)
    }
}
function* logoutSaga() {
    window.localStorage.removeItem('loggedNoteappUser')
    yield put({ type: "user/userLogout", payload: null })
}

export default function* authenSaga() {
    yield all([
        takeEvery("saga/userLogin", loginSaga),
        takeEvery("saga/userLogout", logoutSaga)
    ])
}