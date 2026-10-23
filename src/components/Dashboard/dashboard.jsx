import { useNavigate } from "react-router-dom"
import SideBar from "../SideBar/sideBar.jsx"
import styles from "./dashboard.module.css"
import { Home, Blocks, NotebookPen, Sidebar, SquareCheckBigIcon, BarChartIcon, StickyNoteOffIcon, Bell, Settings, Trash, Trash2, Trash2Icon, LucideTrash, Delete, DeleteIcon, LogOut, Calendar, Search, Hand, HandFist, HandGrabIcon, Plus, ListTodo, ListCheck, ListChecks, CheckCheck, CheckCircle2, CircleDashed, Clock1, Clock3, AlarmCheck, AlarmClock, TriangleAlert, CalendarX, ArrowBigLeft, ArrowRight, ArrowBigRight, ArrowBigLeftDash, ArrowRightCircle } from "lucide-react"
import { auth, db } from "../../firebase.js"
import { getDoc, doc } from "firebase/firestore"
import { onAuthStateChanged } from "firebase/auth"
import { userContext } from '../../userContext.jsx'
import { useContext, useEffect, useState } from "react"
import { priorities } from "./category.jsx"
import SIdeBarMenu from "../SideBar/bar.jsx"
function Dashboard({ todo, user }) {
    // Uncaught (in promise) FirebaseError: Expected type 'Query', but it was: a custom DocumentReference object
    const { allUsers, SetsidebarOpen, sidebarOpen } = useContext(userContext)
    console.log(user);
    console.log(allUsers);

    console.log(sidebarOpen);



    const naviagte = useNavigate()
    return (
        <>
            <div className={styles.container}>
                <div className={styles.sidebar}>
                    <SideBar />

                </div>
                <div className={styles.dashboardContainer}>
                    <div className={styles.dashboardHeader}>
                        <div className={styles.dashboardTitle}>
                            <div
                                className={styles.barDiv}
                            > 
                            
                             <SIdeBarMenu />
                            </div>

                            Dashboard</div>
                        <div className={styles.dashboardAccountCon}>
                            <div className={`${styles.dashboardSearchContainer} ${user.theme === "light" ? "light_card" : "dark_card"} ${user.theme === "light" ? "light_shadow" : "dark_shadow"}`}>

                                <div className={`${styles.dashboardSearchBox} `} >
                                    <Search size={18.5} />

                                </div>
                                <input type="text" placeholder="Search Tasks..." className={`${styles.dashboardSearch} ${user.theme === "light" ? "light_card" : "dark_card"} `} />
                            </div>


                            <div className={`${styles.dashboardNotificationBox} ${user.theme === "light" ? "light_card" : "dark_card"} ${user.theme === "light" ? "light_shadow" : "dark_shadow"}`} >

                                <Bell size={18.5} />
                            </div>
                            <div className={`${styles.dashboardAccountBox} ${user.theme === "light" ? "light_card" : "dark_card"} ${user.theme === "light" ? "light_shadow" : "dark_shadow"}`}>
                                <img className={styles.dashboardImg} src={user.userimageUrl} srcset="" />

                            </div>
                        </div>

                    </div>
                    <div className={styles.UserInfoContainer}>
                        <div className={styles.UserInfobox}>
                            <div className={styles.UserInfoTitle}>
                                Hello, {user?.firstname}👏
                            </div>
                            <div className={styles.UserInfoDescription}>Here's what's happening with your tasks today.</div>


                        </div>
                        <div className={styles.taskbtnContainer}>
                            <div className={styles.taskbtnBox}
                                onClick={() => {
                                    naviagte("/addTask")
                                }}
                            >


                                <Plus />

                                <button

                                    className={styles.taskbtn}>Add Tasks</button>

                            </div>

                        </div>

                    </div>
                    <div className={styles.tasksStatusContainer}>
                        <div className={`${styles.tasksStatusBox} ${user.theme === "light" ? "light_card" : "dark_card"} ${user.theme === "light" ? "light_shadow" : "dark_shadow"}`}>
                            <div className={styles.tasksStatusIcon}>
                                <div className={`${styles.tasksIcon} ${styles.taskColor1}`}>
                                    <ListCheck />
                                </div>

                            </div>
                            <div className={styles.tasksStatusDesc}>
                                <div className={styles.tasksStatusTitle}>Total Tasks</div>
                                <div className={styles.tasksStatusNumber}>
                                    {todo.length}
                                </div>


                            </div>


                        </div>
                        <div className={`${styles.tasksStatusBox} ${user.theme === "light" ? "light_card" : "dark_card"} ${user.theme === "light" ? "light_shadow" : "dark_shadow"}`}>
                            <div className={styles.tasksStatusIcon}>
                                <div className={`${styles.tasksIcon} ${styles.taskColor2}`}>
                                    <CheckCircle2 />
                                </div>

                            </div>
                            <div className={styles.tasksStatusDesc}>
                                <div className={styles.tasksStatusTitle}>Completed</div>
                                <div className={styles.tasksStatusNumber}>
                                    {todo.filter(item => item.complete).length}


                                </div>


                            </div>


                        </div>
                        <div className={`${styles.tasksStatusBox} ${user.theme === "light" ? "light_card" : "dark_card"} ${user.theme === "light" ? "light_shadow" : "dark_shadow"}`}>
                            <div className={styles.tasksStatusIcon}>
                                <div className={`${styles.tasksIcon} ${styles.taskColor3}`}>

                                    <Clock3 />
                                </div>

                            </div>
                            <div className={styles.tasksStatusDesc}>
                                <div className={styles.tasksStatusTitle}>Pending</div>
                                <div className={styles.tasksStatusNumber}>
                                    {todo.filter(item => !item.complete).length}

                                </div>


                            </div>


                        </div>
                        <div className={`${styles.tasksStatusBox} ${user.theme === "light" ? "light_card" : "dark_card"} ${user.theme === "light" ? "light_shadow" : "dark_shadow"}`}>
                            <div className={styles.tasksStatusIcon}>
                                <div className={`${styles.tasksIcon} ${styles.taskColor4}`}>

                                    <CalendarX />
                                </div>

                            </div>
                            <div className={styles.tasksStatusDesc}>
                                <div className={styles.tasksStatusTitle}>Overdue</div>
                                <div className={styles.tasksStatusNumber}>
                                    {/* {new Date().getHours()} */}
                                    {/* {(item.date.split("-")[2] === new Date().getHours() + 1) && item.time.split(":")[1] < new Date().getMinutes()} */}
                                    {todo.filter((item) => !item.complete && new Date() > new Date(`${item.date}T${item.time}`)).length}

                                </div>


                            </div>


                        </div>
                    </div>
                    <div className={styles.gridContainer}>


                        <div className={`${styles.recentTaskAndStatusContaoner} ${user.theme === "light" ? "light_card" : "dark_card"} ${user.theme === "light" ? "light_shadow" : "dark_shadow"}`}>
                            <div className={styles.taskTitleContainer}>
                                <div className={styles.taskTitle}>Today's Tasks</div>
                                <div
                                    onClick={() => {
                                        naviagte('/todo')
                                    }}
                                    className={styles.allTaskbtn}>View all
                                    {/* <ArrowRightCircle size={20} style={{ marginLeft: "10px" }} /> */}
                                </div>
                            </div>

                            {todo.slice(0, 5).map((item) => {
                                const priorityFilter = priorities.find(par => par.name == item.priority)
                                if (!priorityFilter) return null
                                // return new Date(`${item.date}T${item.time}`).getDate() < new Date().getDate() && 


                                return (
                                    <div className={styles.recentTaskContainer}>
                                        <div className={styles.recentTaskList}>

                                            <div className={styles.task}>{item.task}</div>
                                            <div className={styles.category}>
                                                {item.category}
                                            </div>

                                        </div>
                                        <div className={styles.statusContainer}>
                                            <div className={styles.priority}
                                                style={{
                                                    background: `${priorityFilter?.color}38`,
                                                    color: `${priorityFilter?.color}`
                                                }}
                                            >
                                                {priorityFilter?.name}

                                            </div>
                                        </div>
                                        <div className={styles.time}>
                                            {12 < new Date(`${item.date}T${item.time}`).getHours() ? new Date(`${item.date}T${item.time}`).getHours() - 12 : new Date(`${item.date}T${item.time}`).getHours()}:{new Date(`${item.date}T${item.time}`).getMinutes()} {12 < new Date(`${item.date}T${item.time}`).getHours() - 12 ? "Am" : "PM"}

                                        </div>
                                    </div>

                                )

                            })}



                        </div>
                        <div className={`${styles.userList} ${user.theme === "light" ? "light_card" : "dark_card"} ${user.theme === "light" ? "light_shadow" : "dark_shadow"}`}>
                            <div className={styles.userTitleContainer}>
                                <div className={styles.userTitle}>Today's Tasks</div>

                                <div
                                    onClick={() => {
                                        naviagte('/todo')
                                    }}
                                    className={styles.allUserbtn}>View all
                                    {/* <ArrowRightCircle size={20} style={{ marginLeft: "10px" }} /> */}
                                </div>
                            </div>

                            {allUsers.slice(0, 8).map((item) => {



                                return (
                                    <div className={styles.recentUserContainer}>
                                        <div className={styles.recentUserList}>

                                            <div className={styles.task}>{item.firstname}</div>
                                            <div className={styles.category}>
                                                {/* {item.category} */}
                                            </div>

                                        </div>
                                        <div className={styles.statusContainer}>

                                        </div>

                                    </div>

                                )

                            })}



                        </div>
                    </div>

                </div>

                {/* <button
                   
                >click</button> */}
            </div >
        </>
    )
}

export default Dashboard;