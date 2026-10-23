import React, { useState, useRef, useReducer, useMemo, useCallback, useContext } from 'react'
import styles from "./todo.module.css"
import { useNavigate } from 'react-router-dom';
import SideBar from "../SideBar/sideBar.jsx"
import { categories, priorities } from "../Dashboard/category.jsx";
import { userContext } from "../../userContext.jsx"
import { CircleEllipsis, EllipsisVertical, Filter, Pin, PinOffIcon, Plus, Search, Edit, Trash2, ChevronDown, ListSortDescending, SortDescIcon, Settings2, Calendar } from 'lucide-react';
import { auth, db, storage } from "../../firebase.js";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
function App({ form, todo, deleteTodo, toggleComplete, onPin, onDot, addUnderTodo }) {
    const { setVal, val, setdisc, disc, inputRef, setEdit, edit, setCategory, setPriority, time, setDate, setTime, date, category, priority } = form;
    const navigate = useNavigate()
    console.log(todo);
    let minDate = new Date().toISOString().split("T")[0]
    let minTime = new Date().toTimeString().slice(0, 5)
    const { users, allUsers } = useContext(userContext)
    console.log(allUsers);

    const [uploadFile, setuploadFile] = useState('')
    const [search, setSearch] = useState('')

    const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];


    const [btn, setbtn] = useState("all")
    const [show, setshow] = useState(false)
    const [completeFilter, setcompleteFilter] = useState(false)

    const [statusMess, setstatusMess] = useState('')






    const filterdList = useMemo(() => {
        return todo.filter((item) => {
            if (btn === "pending") {

                return !item.complete;
            }
            if (btn === "completed") {

                return item.complete;
            }

            if (btn === "applyfilter") {
                // if (completeFilter) {
                return item.category === category && item.priority === priority && item.complete === completeFilter;

                // }


            }

            else if (btn === null) {
                return item.category === category && item.priority === priority;

            }

            return true;
        });
    }, [todo, btn]);
    console.log(filterdList);

    const pinned = useMemo(() => {
        return [...filterdList].sort((a, b) => b.pin - a.pin);
    }, [filterdList]);

    const searchTask = useMemo(() => {
        return pinned.filter((item) =>
            item.task.toLowerCase().startsWith(search.toLowerCase())
        );
    }, [pinned, search]);

    const visibleTodo = show
        ? searchTask
        : searchTask.slice(0, 5);
    console.log(visibleTodo);
    console.log(todo);
    const [editDailogue, setEditDailogue] = useState(null)

    return (
        <>

            <div className={styles.todoContainer}>
                <div className={styles.sidebar}>
                    <SideBar />

                </div>
                <div className={styles.todoDashboard}>
                    <div className={styles.todoHeader}>
                        <div className={styles.hearderFirst}>
                            <div className={styles.taskTitle}>
                                My Tasks
                            </div>
                            <div className={styles.taskDescription}>
                                this your daily task
                            </div>
                        </div>
                        <div className={styles.hearderSecond}>



                            <div className={`${styles.todoSearchContainer} ${users.theme === "light" ? "light_card" : "dark_card"} ${users.theme === "light" ? "light_shadow" : "dark_shadow"}`}>

                                <div className={`${styles.todoSearchBox} `} >
                                    <Search size={18.5} />

                                </div>
                                <input className={`${styles.todoSearch} ${users.theme === "light" ? "light_card" : "dark_card"}`}
                                    type="text"
                                    placeholder="Search task..."
                                    value={search}
                                    onChange={(e) => {
                                        setSearch(e.target.value)
                                    }}


                                />
                            </div>


                            <div className={`${styles.addTaskBtn}  ${users.theme === "light" ? "light_shadow" : "dark_shadow"}`}
                                onClick={() => {
                                    navigate("/addTask")
                                }}
                            >
                                <Plus size={21} />
                                Add Task
                            </div>
                        </div>
                    </div>
                    <div className={styles.sectionFirst}>
                        <div className={styles.totalTaskDetail}>
                            Total {todo.length}
                        </div>
                        <div className={styles.filterBtnSection}>
                            <div className={`${styles.sortBtn} ${users.theme === "light" ? "light_card" : "dark_card"} `}>
                                <div className={`${styles.sortIcon}`}>
                                    <SortDescIcon size={20} />
                                </div>sort<ChevronDown size={20} />
                            </div>

                            <div className={`${styles.filterBtn} ${users.theme === "light" ? "light_card" : "dark_card"} `}>
                                <div className={`${styles.sortIcon}`}>
                                    <Settings2 size={20} />
                                </div>

                            </div>
                        </div>

                    </div>
                    {/* <div className={styles.row}>
                        <div className={styles.field}>
                            <label>Date</label>
                            <input
                                type="date"
                                value={date}
                                min={minDate}
                                onChange={(e) => setDate(e.target.value)}
                            />
                        </div>


                    </div> */}

                    {/* <div className={styles.row}>
                        <div className={styles.field}>
                            <label>Category</label>
                             <select className={`${styles.sort} ${users.theme === "light" ? "light_card" : "dark_card"} ${users.theme === "light" ? "light_shadow" : "dark_shadow"}`}
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
                        <div>
                            <input type="checkbox"
                                onChange={(e) => {
                                    console.log(e.target.checked);


                                    setcompleteFilter(e.target.checked)
                                }}
                            />

                        </div>
                    </div> */}


                    <div className={styles.taskStatusContainer}>

                        <button className={btn === "all" ? styles.active : users.theme === "light" ? "light" : "dark"} onClick={() => setbtn("all")}>All
                        </button>
                        <button className={btn === "pending" ? styles.active : users.theme === "light" ? "light" : "dark"} onClick={() => setbtn("pending")}>Pending

                        </button>
                        <button className={btn === "completed" ? styles.active : users.theme === "light" ? "light" : "dark"} onClick={() => setbtn("completed")}>Completed

                        </button>

                        <button className={btn === "complete" ? styles.active : users.theme === "light" ? "light" : "dark"}
                            onClick={() => {
                                if (completeFilter) {
                                    setbtn("applyfilter")

                                }

                                else {
                                    setbtn(null)
                                }


                            }}><ListSortDescending /> <div className={styles.num}> </div>

                        </button>

                    </div>
                    <div className={styles.todoListContainer}

                    >
                        {/* <div className={`${styles.todoListBox} ${users.theme === "light" ? "light_card" : "dark_card"} ${users.theme === "light" ? "light_shadow" : "dark_shadow"}`}> */}
                        <div className={`${styles.todoListBox} `}>


                            {visibleTodo.map((item) => {
                                console.log(item)

                                const categoryColor = categories.find(
                                    (cat) =>
                                        cat?.name === item.category
                                ) || {
                                    name: "Other",
                                    icon: CircleEllipsis,
                                    color: "#6f7b93", // Gray
                                }
                                console.log(categoryColor);

                                if (!categoryColor) return null;
                                const priorityColor = priorities.find(
                                    (par) =>
                                        par?.name === item.priority
                                ) || {
                                    name: "Normal",
                                    color: "#959662", // Gray

                                }

                                if (!priorityColor) return null;

                                console.log(categoryColor);
                                const Icon = categoryColor?.icon
                                return (
                                    <>
                                        <div className={`${styles.list} ${users.theme === "light" ? "light_card" : "dark_card"} ${users.theme === "light" ? "light_shadow" : "dark_shadow"}`} key={item.id}>
                                            {/* <div className={styles.list} key={item.id}> */}

                                            <div className={styles.listFirst}>
                                                {editDailogue === item.id && <div className={`${styles.absolute} ${users.theme === "light" ? "light_card" : "dark_card"} ${users.theme === "light" ? "light_shadow" : "dark_shadow"}`}>
                                                    <div className={styles.editBtn}
                                                        onClick={() => {
                                                            setEdit(item.id)
                                                            setVal(item.task)
                                                            setdisc(item.description)
                                                            setDate(item.date)
                                                            setTime(item.time)
                                                            navigate("/edit")
                                                        }}
                                                    >
                                                        <Edit size={15} />
                                                        <button
                                                            className={styles.edit}
                                                        >
                                                            Edit
                                                        </button>
                                                    </div>
                                                    <div className={styles.deleteBtn}
                                                        onClick={() => deleteTodo(item.id)}
                                                    >
                                                        <Trash2 size={15} />
                                                        <button
                                                            className={styles.delete}

                                                        >
                                                            Delete
                                                        </button>
                                                    </div>
                                                </div>}
                                                <input
                                                    type="checkbox"
                                                    className={styles.completeInput}
                                                    checked={item.complete}
                                                    onChange={() => {

                                                        toggleComplete(item.id, !item.complete)
                                                    }}

                                                />
                                                <div className={styles.taskSection}>

                                                    <div className={`${styles.task} ${item.complete ? styles.complete : ""}`}>
                                                        {item.task.split(" ").slice(0, 6).map((item) => (
                                                            <span> {item}</span>
                                                        ))}

                                                    </div>
                                                    <div className={styles.taskDateSection}>

                                                        <div className={styles.date}>
                                                            <Calendar size={14} />
                                                            <div className={styles.dateChild}>
                                                                {new Date(`${item.date}T${item.time}`).getDate()}
                                                            </div>

                                                            <div className={styles.dateChild}>
                                                                {months[`${new Date(`${item.date}T${item.time}`).getMonth()}`]}
                                                            </div>



                                                        </div>
                                                        <div className={styles.priority}
                                                            style={{
                                                                // background: `${priorityColor?.color}35`,
                                                                color: priorityColor?.color
                                                            }}
                                                        >{priorityColor?.name}</div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className={styles.listSecond}>


                                                {/* <button
                                                    onClick={() => {
                                                        addUnderTodo(item.id, val, disc, date, time, category, priority)
                                                        navigate("/addTask")
                                                    }}
                                                >getId</button> */}

                                                <label className={styles.pin}>
                                                    {!item.pin ? <Pin fill={users.theme === "light" ? "light" : "dark"} /> : <PinOffIcon fill={users.theme === "light" ? "light" : "dark"} />}
                                                    <input
                                                        type="checkbox"
                                                        className={styles.pinInput}
                                                        checked={item.pin}
                                                        onChange={() => {
                                                            onPin(item.id, !item.pin)
                                                        }}
                                                    />

                                                </label>
                                                <div className={styles.Threedot}
                                                    onClick={() => {
                                                        onDot(item.id, !item.dot)

                                                        setEditDailogue(editDailogue === item.id ? null : item.id)


                                                    }}
                                                    style={{
                                                        background: editDailogue === item.id ? "#234" : "",
                                                        color: editDailogue === item.id ? "rgb(214, 221, 227)" : "",
                                                    }}>
                                                    <EllipsisVertical />

                                                </div>
                                            </div>






                                        </div >
                                    </>

                                )
                            }

                            )}
                            {filterdList.length > 5 && (
                                <>
                                    <button
                                        className={styles.showBtn}
                                        onClick={() => setshow(!show)}
                                    >
                                        <div>
                                            {show ? "Show Less" : "Show More"}</div>
                                        <ChevronDown />

                                    </button>
                                </>

                            )}
                        </div >
                    </div>




                </div >

            </div >

        </>
    )

}

export default React.memo(App);