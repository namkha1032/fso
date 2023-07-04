// import sagas
import authenSaga from "./authenSaga";
import noteSaga from "./noteSaga"
// import libraries
import { all } from "redux-saga/effects"
export default function* rootSaga() {
    console.log("run root")
    yield all([
        authenSaga(),
        noteSaga(),
    ])
}
