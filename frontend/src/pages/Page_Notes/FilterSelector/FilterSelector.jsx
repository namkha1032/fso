import { useQueryClient, useQuery } from '@tanstack/react-query'
const FilterSelector = () => {
    // props
    // state
    // hook
    const queryClient = useQueryClient()
    // query
    // mutation
    // function
    // logic
    // HTMl
    return (
        <>
            <input
                type='radio'
                name='filter'
                onChange={() => queryClient.setQueryData(['filter'], 'ALL')}
            /><label>all</label><br />
            <input
                type='radio'
                name='filter'
                onChange={() => queryClient.setQueryData(['filter'], 'IMPORTANT')}
            /><label>important</label><br />
            <input
                type='radio'
                name='filter'
                onChange={() => queryClient.setQueryData(['filter'], 'NONIMPORTANT')}
            /><label>non-important</label><br />
        </>
    )
}
export default FilterSelector