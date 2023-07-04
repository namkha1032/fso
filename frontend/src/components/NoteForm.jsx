const NoteForm = (props) => {
    <form onSubmit={props.handleSubmitAction}>
        <input
            type="text"
            value={props.value}
            onChange={(event) => { props.handleChangeAction(event.target.value) }}
        />
        <button type="submit">save</button>
    </form>
}

export default NoteForm