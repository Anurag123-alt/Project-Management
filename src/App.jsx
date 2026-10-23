import Todo from "./components/Todo/todo.jsx"
import InputTodo from "./components/Todo/inputTodo.jsx"
import Dashboard from "./components/Dashboard/dashboard.jsx"
import SignUp from "./components/UserProile/signUp.jsx"
import SignIn from "./components/UserProile/signIn.jsx"
import Edit from "./components/Todo/editPage.jsx"
import useTodo from "./components/Todo/useTodo.jsx"
import useWorkspace from "./components/workspace/useWorkspace.jsx"
import useAllProjects from "./components/Project/useAllProject.jsx"
import ProjectDetails from "./components/Project/projectDetails.jsx"

import styles from "./App.module.css"
import { userContext } from "./userContext.jsx"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { useState, useRef, useReducer, useEffect } from 'react'
import UserData from "./components/UserProile/useUser.jsx"

import Project from "./components/Project/projectInput.jsx"
import WorkSpaceUi from "./components/workspace/workSpaceUi.jsx"
import WorkspaceSetting from "./components/workspace/workspaceSetting.jsx"
import MilestoneDetails from "./components/milestone/milestoneDetails.jsx"

import "./App.css"

import {
    PieChart,
    Pie,
    Tooltip,
    Legend,
    Cell,
    ResponsiveContainer
} from "recharts";

function App() {



    const [workSpaceOpen, setworkSpaceOpen] = useState(false)
    const [workspaceimageUrl, setworkspaceImageUrl] = useState("");
    const [workspacename, setworkspacename] = useState('')


    const [val, setVal] = useState('')
    const [disc, setdisc] = useState('')
    const [edit, setEdit] = useState(null)
    const [date, setDate] = useState('')
    const [time, setTime] = useState('')
    const [category, setCategory] = useState("")
    const [priority, setPriority] = useState("")



    const [userimageUrl, setuserImageUrl] = useState("");

    const [sidebarOpen, SetsidebarOpen] = useState(false)


    const todoData = useTodo()




    const { workspace, addWorkSpace, selectedWorkSpace, selectedSettingWorkSpace, loading, setloading, deleteWorkSpace } = useWorkspace()
    const { projects, addProjects } = useAllProjects()
    const { users, allUsers, updateTheme, setData } = UserData()

    console.log(users, allUsers);


    const [projecttitle, setprojectTitle] = useState('')
    const [projectDescription, setprojectDescription] = useState('')
    const [projectPriority, setprojectPriority] = useState('')
    const [projectCategory, setprojectCategory] = useState('')
    const [projectImgUrl, setprojectImgUrl] = useState('')



    // const s = {
    //     projectTitle: "Website Redesign",
    //     description: "Redesign the client website",
    //     workspace_id: "workspace123",
    //     uid: "user123",
    //     status: "active",
    //     priority: "high",
    //     color: "#6366f1",
    //     imageUrl: "",
    //     createdAt: serverTimestamp(),
    //     updatedAt: serverTimestamp(),
    //     dueDate: null,
    //     isArchived: false,
    //     client: "Rohan",
    //     budget: 25000
    // }

    const inputRef = useRef(null)

    let form = {
        setVal,
        val,
        setdisc,
        disc,
        inputRef,
        setEdit,
        edit,
        setDate,
        date,
        setTime,
        time,
        setCategory,
        category,
        setPriority,
        priority,
        setworkspacename,
        workspacename,
        projecttitle,
        setprojectTitle,
        projectDescription,
        setprojectDescription,
        projectPriority,
        setprojectPriority,
        projectCategory,
        setprojectCategory,
        projectImgUrl,
        setprojectImgUrl
    }

    const inputfocus = () => {
        inputRef.current.focus()
    }

    const [theme, setTheme] = useState("light")

    const toggleTheme = () => {
        setTheme(pre => pre === "light" ? "light" : "dark")
    }



    return (
        <>
            <userContext.Provider value={{ setTheme, theme, workspace, addWorkSpace, selectedWorkSpace, selectedSettingWorkSpace, deleteWorkSpace, toggleTheme, updateTheme, users, allUsers, workspaceimageUrl, setworkspaceImageUrl, userimageUrl, setuserImageUrl, projects, addProjects, loading, setloading, setworkSpaceOpen, sidebarOpen, SetsidebarOpen }}>

                <BrowserRouter>
                    <div className={`${styles.app} ${users.theme === "light" ? "light" : "dark"}`}>
                        <div style={{ position: "absolute", zIndex: "1", top: "50%", left: "50%" }}>
                            {workSpaceOpen && <WorkSpaceUi form={form} />}
                        </div>
                        <Routes>
                            <Route path="/" element={<Project form={form} />} />
                            <Route path="/project/:id" element={<ProjectDetails />} />
                            <Route path="/milestonedetails/:mid/:pid" element={<MilestoneDetails />} />


                            {/* <Route path="/" element={<SignUp setData={setData} />} /> */}
                            <Route path="/workspacesetting" element={<WorkspaceSetting />} />

                            <Route path="/signin" element={<SignIn />} />
                            <Route path="/dashboard" element={<Dashboard todo={todoData.todo} user={users} />} />

                            <Route path="/addTask/:mid/:pid" element={<InputTodo todo={todoData.todo} form={form}
                                addTodo={todoData.addTodo} />} />

                            <Route path="/todo" element={<Todo form={form} todo={todoData.todo}
                                deleteTodo={todoData.deleteTodo}
                                updateTodo={todoData.updateTodo}
                                toggleComplete={todoData.toggleComplete} onPin={todoData.onPin} onDot={todoData.onDot} onTogg={todoData.onTogg} addUnderTodo={todoData.addUnderTodo} />} />


                            <Route path="/edit" element={<Edit form={form} updateTodo={todoData.updateTodo} />} />

                        </Routes>
                    </div>

                </BrowserRouter>

            </userContext.Provider>

        </>

    )



    // const data = [
    //     { name: "Completed", value: 240 },
    //     { name: "Pending", value: 50 },
    //     { name: "In Progress", value: 100 },
    //     { name: "All", value: 300 }

    // ];

    // const colours = ["#20bd44", "Orange", "red", "#936be4"]
    // return (
    //     <ResponsiveContainer width="100%" height={300}>

    //         <PieChart>
    //             <Pie
    //                 data={data}
    //                 dataKey="value"
    //                 nameKey="name"
    //                 cx="50%"
    //                 cy="50%"
    //                 outerRadius={100}
    //                 innerRadius={50}

    //             >
    //                 {data.map((entry, index) => (
    //                     <Cell key={index} fill={colours[index]} />
    //                 ))}
    //             </Pie>
    //             <Tooltip
    //                 contentStyle={{
    //                     backgroundColor: "#212121",
    //                     color: "#fff",
    //                     borderRadius: "10px",

    //                 }}

    //             />
    //             <Legend />

    //         </PieChart>
    //     </ResponsiveContainer>

    // );
}


export default App
