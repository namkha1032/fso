// import libraries
import { configureStore } from '@reduxjs/toolkit'
// import reducers
import noteSlice from './reducers/noteReducer'
import filterSlice from './reducers/filterReducer'

const store = configureStore({
    reducer: {
        notes: noteSlice.reducer,
        filter: filterSlice.reducer
    }
})

export default store