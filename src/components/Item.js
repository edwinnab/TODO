function Item({name, id, onDelete}) {
    function handleDelete() {
        onDelete(id)
    }

    return (
        <>
        <ul>
            <li onClick={handleDelete}>
                {name}
            </li>
        </ul>
        </>
    )
}

export default Item