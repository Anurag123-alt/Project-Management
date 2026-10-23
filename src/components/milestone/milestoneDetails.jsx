import { useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { userContext } from "../../userContext.jsx";
import useTodo from "../Todo/useTodo.jsx";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase.js";
function MilestoneDetails() {
    const navigate = useNavigate()
    const { workspace } = useContext(userContext)

    const { mid, pid } = useParams();
    const wsId = workspace.find(item => item.selected == true)
    const [singleMilestone, setSingleMilestone] = useState({})
    const { todo } = useTodo(mid, pid, wsId)
    console.log(todo);

    useEffect(() => {
        if (!wsId && !id && !singleprojects) {
            return
        }



        const fetchProject = async () => {
            const docRef = doc(db, "milestone", mid);
            const snapshot = await getDoc(docRef);
            if (!snapshot.exists()) {
                setSingleMilestone(null)
                return
            }
            if (snapshot.exists() &&
                snapshot.data().workspace_id == wsId.workspace_id
                && snapshot.data().uid == wsId.uid) {
                setSingleMilestone({
                    milestone_id: snapshot.id,
                    ...snapshot.data()
                });
            }
            else {
                setSingleMilestone(null)
            }
        };

        fetchProject();



    }, [wsId, mid]);



    return (
        <div>


            <div>{singleMilestone.milestone_id}</div>
            <div>{singleMilestone.project_id}</div>
            <div>{singleMilestone.workspace_id}</div>
            <div>{singleMilestone.title}</div>
            {todo.map((item) => (
                <h1 style={{ color: "red" }}>{item.task}</h1>
            ))}
            <button
                onClick={() => {
                    navigate(`/addTask/${singleMilestone.milestone_id}/${singleMilestone.project_id}`)
                }}
            >Add Task</button>

        </div>
    );
}


export default MilestoneDetails;