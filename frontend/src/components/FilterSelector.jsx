// import { filterChange } from '../reducers/filterReducer'
import { useDispatch } from 'react-redux'
import filterSlice from '../redux/reducers/filterReducer'
const FilterSelector = () => {
    const dispatch = useDispatch()
    return (
        <>
            <input
                type="radio"
                name="filter"
                onChange={() => dispatch(filterSlice.actions.changeFilter('ALL'))}
            /><label>all</label><br/>
            <input
                type="radio"
                name="filter"
                onChange={() => dispatch(filterSlice.actions.changeFilter('IMPORTANT'))}
            /><label>important</label><br/>
            <input
                type="radio"
                name="filter"
                onChange={() => dispatch(filterSlice.actions.changeFilter('NONIMPORTANT'))}
            /><label>non-important</label><br/>
        </>
    )
}

export default FilterSelector