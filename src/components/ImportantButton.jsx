const ImportantButton = (props) => {
    function handleShowAll(event){
        props.setShowAll(!props.showAll)
    }
    return (
        <>
            <button onClick={handleShowAll}>{props.showAll ? "All" : "Important"}</button>
        </>
    )
}

export {ImportantButton}