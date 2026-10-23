import React, { useContext, useState } from "react";
import useTodo from "./useTodo.jsx"
import styles from "./inputTodo.module.css"
import SideBar from "../SideBar/sideBar.jsx"

import { useNavigate, useParams } from "react-router-dom";
import { categories, priorities } from "../Dashboard/category.jsx";
import { userContext } from "../../userContext.jsx";

function App({ todo, form, addTodo, addUnderTodo }) {



    const { users, workspace } = useContext(userContext)
    const { mid, pid } = useParams()
    const wsId = workspace.find(item => item.selected == true)
    const { setVal, val, setdisc, disc, inputRef, setDate, date, setTime, time, setCategory, category, setPriority, priority } = form;
    const navigate = useNavigate();
    console.log("input");


    let minDate = new Date().toISOString().split("T")[0]
    let minTime = new Date().toTimeString().slice(0, 5)

    console.log(minTime);

    return (
        <>
            <div className={styles.container}>
                <div className={styles.sidebar}>
                    <SideBar />

                </div>
                <div className={styles.dashboard} >
                    <div className={styles.inputBox}>
                        <h2 className={styles.heading}>Add a new task</h2>

                        <div className={`${styles.field}`}>
                            <label>Task</label>
                            <input
                                type="text"
                                placeholder="e.g. Finish project report"
                                value={val}
                                onChange={(e) => setVal(e.target.value)}
                                ref={inputRef}
                                className={`${users.theme == "light" ? "light" : "dark"}`}
                            />
                        </div>

                        <div className={`${styles.field}`}>
                            <label>Description</label>
                            <input
                                type="text"
                                placeholder="Add more details"
                                value={disc}
                                onChange={(e) => setdisc(e.target.value)}
                                className={`${users.theme == "light" ? "light" : "dark"}`}

                            />
                        </div>

                        <div className={styles.row}>
                            <div className={`${styles.field}`}>
                                <label>Date</label>
                                <input
                                    type="date"
                                    value={date}
                                    min={minDate}
                                    onChange={(e) => setDate(e.target.value)}
                                    className={`${users.theme == "light" ? "light" : "dark"}`}

                                />
                            </div>

                            <div className={`${styles.field}`}>
                                <label>Time</label>
                                <input
                                    type="time"
                                    value={time}
                                    min={minTime}
                                    onChange={(e) => setTime(e.target.value)}
                                    className={`${users.theme == "light" ? "light" : "dark"}`}

                                />
                            </div>
                        </div>

                        <div className={styles.row}>
                            <div className={`${styles.field}`}>
                                <label>Category</label>
                                <select
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                    className={`${users.theme == "light" ? "light" : "dark"}`}

                                >
                                    {categories.map((item) => (
                                        <option key={item.name} value={item.name}>
                                            {item.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className={`${styles.field}`}>
                                <label>Priority</label>
                                <select
                                    value={priority}
                                    onChange={(e) => setPriority(e.target.value)}
                                    className={`${users.theme == "light" ? "light" : "dark"}`}

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
                                if (val.trim() && disc.trim() && date && time) {
                                    addTodo(val, disc, date, time, category, priority, mid, pid, wsId);
                                    navigate("/todo");
                                    setVal("");
                                    setdisc("");
                                }
                            }}
                        >
                            Add Task
                        </button>
                    </div>
                </div>
            </div>

        </>
    );

}

export default React.memo(App);