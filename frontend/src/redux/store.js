// import libraries
import { configureStore } from '@reduxjs/toolkit'
import createSagaMiddleware from 'redux-saga'
// import reducers
import noteSlice from './reducer/noteReducer'
import filterSlice from './reducer/filterReducer'
import userSlice from './reducer/userReducer'
// import rootSaga
import rootSaga from './saga/rootSaga'

const sagaMiddleware = createSagaMiddleware()
const store = configureStore({
    reducer: {
        notes: noteSlice.reducer,
        filter: filterSlice.reducer,
        user: userSlice.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware)
    // middleware: [sagaMiddleware]
})
sagaMiddleware.run(rootSaga)

export default store