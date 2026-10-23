import { useNavigate } from "react-router-dom"
import { categories, priorities } from "../Dashboard/category.jsx"
import SideBar from "../SideBar/sideBar.jsx"
import styles from "./editPage.module.css"
import { userContext } from "../../userContext.jsx"
import { useContext } from "react"
function Edit({ form, updateTodo }) {
    const {  } = useContext(userContext)

    const { setVal, val, setdisc, disc, inputRef, setEdit, edit, time, setDate, setTime, date, setCategory, category, setPriority, priority } = form
    const naviagte = useNavigate()
    let minDate = new Date().toISOString().split("T")[0]
    let minTime = new Date().toTimeString().slice(0, 5)
    console.log(date, time);


    return (
        <div className={styles.container}>
            <div className={styles.sidebar}>
                <SideBar />

            </div>
            <div className={styles.dashboard}>

                <div className={styles.inputBox}>
                    <h2 className={styles.heading}>Update task</h2>

                    <div className={styles.field}>
                        <label>Task</label>
                        <input
                            type="text"
                            value={val}
                            onChange={(e) => setVal(e.target.value)}
                        />
                    </div>

                    <div className={styles.field}>
                        <label>Description</label>
                        <input
                            type="text"
                            value={disc}
                            onChange={(e) => setdisc(e.target.value)}
                        />
                    </div>

                    <div className={styles.row}>
                        <div className={styles.field}>
                            <label>Date</label>
                            <input
                                type="date"
                                min={minDate}
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                            />
                        </div>

                        <div className={styles.field}>
                            <label>Time</label>
                            <input
                                type="time"
                                min={minTime}
                                value={time}
                                onChange={(e) => setTime(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className={styles.row}>
                        <div className={styles.field}>
                            <label>Category</label>
                            <select
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                            >
                                {categories.map((item) => (
                                    <option key={item.name} value={item.name}>
                                        {item.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className={styles.field}>
                            <label>Priority</label>
                            <select
                                value={priority}
                                onChange={(e) => setPriority(e.target.value)}
                            >
                                {priorities.map((item) => (
                                    <option key={item.name} value={item.name}>
                                        {item.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <button
                        className={styles.addBtn}
                        onClick={() => {
                            if (val.trim() !== "" && disc.trim() !== "") {
                                updateTodo(edit, val.trim(), disc.trim(), date, time, category, priority);
                                setVal("");
                                setdisc("");
                                setEdit(null);
                                naviagte('/todo')

                            }
                        }}
                    >
                        Update task
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Edit;