import { useState } from 'react'

const Togglable = (props) => {
    // props
    const buttonLabel = props.buttonLabel
    const children = props.children
    // state
    const [visible, setVisible] = useState(false)
    // hook
    // query
    // mutation
    // function
    const toggleVisibility = () => {
        setVisible(!visible)
    }
    // logic
    const hideWhenVisible = { display: visible ? 'none' : '' }
    const showWhenVisible = { display: visible ? '' : 'none' }
    // HTMl
    return (
        <div>
            <div style={hideWhenVisible}>
                <button onClick={toggleVisibility}>{buttonLabel}</button>
            </div>
            <div style={showWhenVisible}>
                {children}
                <button onClick={toggleVisibility}>cancel</button>
            </div>
        </div>
    )
}

export default Togglable