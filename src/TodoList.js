import { useEffect, useState } from "react";
import styles from "./todoList.module.css"
import { fetchList, deleteTask, createTask, updateTodo } from "./api";
import img from '../src/image/pen.png'

const TodoList = () => {

    const [data, setData] = useState([])
    const [formData, setFormData] = useState({
        title: '',
        completed: true,
    });

    const [id, setId] = useState(201)
    const [updateId, setUpdateId] = useState()
    const [action, setAction] = useState(true)

    useEffect(() => {

        const fetchData = async () => {
            const data = await fetchList();
            setData(data)


        }

        fetchData()

    }, [])


    // delete the todo
    const deleteTodo = (id) => {

        deleteTask(id)
        const update = data.filter((task) => task.id !== id)
        setData(update)
        console.log(id);

    }

    // on change the state
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,

        });
    };


    // on submit to add the todo
    const handleSubmit = (e) => {


        e.preventDefault()
        setAction(true)

        setId((pre) => pre + 1)
        const { title, completed } = formData

        setData([{ title, completed, id }, ...data])

        action ? createTask(formData, id) : updateTodo(formData, updateId)

        setFormData({
            title: '',
            completed: 'completed',
        })


    }

    const updateTask = (id) => {
        setAction(false)
        setUpdateId(id)
        const foundObject = data.find(item => item.id === id);
        setFormData({
            title: foundObject.title,
            completed: foundObject.completed
        })
        const update = data.filter((task) => task.id !== id)
        setData(update)




    }

    return (
        <div className={styles.todo_wraper}>
            <div className={styles.leftSection}>
                <h2><u>TASK LIST</u></h2>
                <ul>
                    {data.map((task) => (
                        <li className={styles.todo} key={task.id}>
                            <div className={styles.info}>
                                <span>Task :&nbsp;&nbsp;{task.title}</span>
                                <span>Status :&nbsp;&nbsp;{task.completed ? "Complete" : "Pending"}</span>
                            </div>
                            <div className={styles.edit}>
                                <img className={styles.uptBtn} src={img} alt="edit" onClick={() => updateTask(task.id)} />
                                <button onClick={() => deleteTodo(task.id)} className={styles.delBtn}> X</button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
            <div className={styles.rightSection}>
                <div className={styles.taskform}>
                    <h2>{action ? "Add a task" : "Edit the task"}</h2>
                    <form action="" method="post">
                        <label htmlFor="taskTitle">Task Title:</label>
                        <input type="text" id="taskTitle" name="title" value={formData.title} onChange={handleChange} required />

                        <label htmlFor="taskStatus">Complete:</label>
                        <select id="taskStatus" name="completed" value={formData.completed} onChange={handleChange}>
                            <option value="completed">true</option>
                            <option value="pending">false</option>
                        </select>

                        <button type="submit" onClick={handleSubmit}>Submit</button>
                    </form>
                </div>
            </div>
        </div>
    )

}

export default TodoList;