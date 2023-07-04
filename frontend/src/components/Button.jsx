const Button = (props) => {
    return (
        <>
            <button onClick={props.handleAction}>{props.content}</button>
        </>
    )
}
export default Button