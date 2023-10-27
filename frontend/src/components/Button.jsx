const Button = (props) => {
    return (
        <>
            <button onClick={props.handleAction} disabled={props.disabled}>{props.content}</button>
        </>
    )
}
export default Button