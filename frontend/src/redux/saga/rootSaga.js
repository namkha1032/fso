// import sagas
import userSaga from "./userSaga";
import noteSaga from "./noteSaga"
// import libraries
import { all } from "redux-saga/effects"
export default function* rootSaga() {
    yield all([
        userSaga(),
        noteSaga(),
    ])
}
