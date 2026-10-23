import SideBar from "../SideBar/sideBar.jsx";
import Styles from "./projectInput.module.css"
import { userContext } from "../../userContext.jsx"
import { useContext, useState } from "react";
import { priorities } from "../Dashboard/category.jsx";
import { supabase } from "../../supabase.js"
import { useNavigate } from "react-router-dom";
function WorkSpace({ form }) {
    const { projecttitle,
        setprojectTitle,
        projectDescription,
        setprojectDescription,
        projectPriority,
        setprojectPriority,
        projectCategory,
        setprojectCategory,
        projectImgUrl,
        setprojectImgUrl } = form

    const { workspace, projects, addProjects, loading, deleteWorkSpace, } = useContext(userContext)
    const navigate = useNavigate()
    console.log(projects, workspace);
    //    const s = {
    //         projectTitle: "Website Redesign",
    //         description: "Redesign the client website",
    //         workspace_id: "workspace123",
    //         uid: "user123",
    //         status: "active",
    //         priority: "high",
    //         color: "#6366f1",
    //         imageUrl: "",
    //         createdAt: serverTimestamp(),
    //         updatedAt: serverTimestamp(),
    //         dueDate: null,
    //         isArchived: false,
    //         client: "Rohan",
    //         budget: 25000
    //     }


    const uploadImage = async (file) => {
        const filePath = `projects${file.name}`
        const { data, error } = await supabase.storage.from("projects").upload(filePath, file)
        console.log(data, error);
        const result = supabase.storage.from("projects").getPublicUrl(filePath, file)
        console.log(result);

        setprojectImgUrl(result.data.publicUrl)
    }

    return (
        <>


            <div className={Styles.WorkSpaceContainer}>
                <div className={Styles.WorkSpaceSidebar}>
                    <SideBar />

                </div>

                <div className={Styles.dashboard}>

                    {workspace.length !== 0
                        ?

                        (<div className={Styles.WorkSpaceDashboard}>
                            {projects.map((item) => (
                                <h1 key={item.projects_id}
                                    onClick={() => navigate(`/project/${item.projects_id}`)}
                                >{item.title}{item.description}{item.priority} </h1>


                            ))}
                            {projectImgUrl && <img src={projectImgUrl}
                                style={{
                                    width: "200px",
                                    height: "200px"
                                }}
                                alt="" />}

                            <input type="text"
                                onChange={(e) => {
                                    setprojectTitle(e.target.value)
                                }}
                            />

                            <input type="text"
                                onChange={(e) => {
                                    setprojectDescription(e.target.value)
                                }}
                            />
                            <select
                                onChange={(e) => {
                                    setprojectPriority(e.target.value)
                                }}
                            >
                                {priorities.map((item) => (
                                    <option key={item.name} value={item.name}>{item.name}</option>
                                ))}
                            </select>

                            <input type="file" onChange={(e) => {
                                uploadImage(e.target.files[0])
                            }} />

                            <button
                                onClick={() => {
                                    if (projecttitle) {
                                        const currentWorkspace = workspace.find(item => item.selected === true)

                                        addProjects(
                                            currentWorkspace?.workspace_id,
                                            projecttitle,
                                            projectDescription,
                                            projectPriority,
                                            projectImgUrl
                                        )
                                    }

                                }}
                            >Create Projects</button>
                            {loading && "Creating Organisation"}
                            <button
                                onClick={() => {
                                    const selectedworkspace = workspace.find(item => item.selected == true)
                                    deleteWorkSpace(selectedworkspace)

                                }}
                            >deleteWorkSpace</button>

                        </div>)


                        :

                        "Please create workspace first"}
                </div>


            </div>


        </>
    )
}

export default WorkSpace;