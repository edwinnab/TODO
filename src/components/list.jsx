import { useEffect, useState } from "react"
import Item from "./Item"

function List() {
    const [tasks, setTasks] = useState([])
    const [formData, setFormData] = useState({
        task: ""
    })

    useEffect(() => {
        fetch("http://localhost:3001/tasks")
        .then(res => res.json())
        .then(data => setTasks(data))
    }, [])

    function dataFetch(e) {
        let value = e.target.value
        setFormData({
            ...formData,
            task: value,
        })

    }
    
    function handleSubmit(e) {
        e.preventDefault()
        fetch("http://localhost:3001/tasks", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        })
    }

    function deleteRecord(id) {
        fetch(`http://localhost:3001/tasks/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
        })
        .then(res => res.json())
        .then(data => console.log(data))
    }

    return (
        <>
        <form onSubmit={handleSubmit}>
            <input 
            type="text"
            value={formData.task}
            onChange={dataFetch}
            />
            <button type="submit" style={{marginLeft: "10px"}}>Add</button>
        </form>
        <p style={{color: "orange", fontWeight: "bold"}}>
            {tasks.length} tasks remaining out of {tasks.length} tasks
        </p>
        {
            tasks.map((task) => {
                return (
                    <Item
                    key = {task.id} 
                    name = {task.task}
                    id = {task.id}
                    onDelete = {deleteRecord}
                    />
                )
            })
        }
        </>
    )
}

export default List;