// import { filterChange } from '../reducer/filterReducer'
import { useQueryClient } from '@tanstack/react-query'
import filterSlice from '../redux/reducer/filterReducer'
const FilterSelector = () => {
    const queryClient = useQueryClient()
    return (
        <>
            <input
                type="radio"
                name="filter"
                onChange={() => queryClient.setQueryData(['filter'], "ALL")}
            /><label>all</label><br />
            <input
                type="radio"
                name="filter"
                onChange={() => queryClient.setQueryData(['filter'], "IMPORTANT")}
            /><label>important</label><br />
            <input
                type="radio"
                name="filter"
                onChange={() => queryClient.setQueryData(['filter'], "NONIMPORTANT")}
            /><label>non-important</label><br />
        </>
    )
}

export default FilterSelector