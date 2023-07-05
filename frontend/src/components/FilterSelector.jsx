// import { filterChange } from '../reducer/filterReducer'
import { useDispatch } from 'react-redux'
import filterSlice from '../redux/reducer/filterReducer'
const FilterSelector = () => {
    const dispatch = useDispatch()
    return (
        <>
            <input
                type="radio"
                name="filter"
                onChange={() => dispatch(filterSlice.actions.changeFilter("ALL"))}
            // onChange={() => dispatch({type:"filter/changeFilter", payload: "ALL"})}
            /><label>all</label><br />
            <input
                type="radio"
                name="filter"
                onChange={() => dispatch(filterSlice.actions.changeFilter('IMPORTANT'))}
            // onChange={() => dispatch({type:"filter/changeFilter", payload: "IMPORTANT"})}
            /><label>important</label><br />
            <input
                type="radio"
                name="filter"
                onChange={() => dispatch(filterSlice.actions.changeFilter('NONIMPORTANT'))}
            // onChange={() => dispatch({type:"filter/changeFilter", payload: "NONIMPORTANT"})}
            /><label>non-important</label><br />
        </>
    )
}

export default FilterSelector