import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { userContext } from "../../userContext.jsx";

import Lime from "../milestone/limestoneInput.jsx";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase.js";
function ProjectDetails() {

    const { id } = useParams();
    const { workspace } = useContext(userContext)
    const wsId = workspace.find(item => item.selected == true)
    // const { singleprojects } = useSingleProjects(id, wsId)
    const [singleprojects, setSingleProjects] = useState({})

    useEffect(() => {
        if (!wsId && !id && !singleprojects) {
            return
        }



        const fetchProject = async () => {
            const docRef = doc(db, "projects", id);
            const snapshot = await getDoc(docRef);
            if (!snapshot.exists()) {
                setSingleProjects(null)
                return
            }
            if (snapshot.exists() &&
                snapshot.data().workspace_id == wsId.workspace_id
                && snapshot.data().uid == wsId.uid) {
                setSingleProjects({
                    project_id: snapshot.id,
                    ...snapshot.data()
                });
            }
            else {
                setSingleProjects(null)
            }
        };

        fetchProject();



    }, [wsId, id]);


    console.log(singleprojects);

    return (
        <div>
            <Lime />
            {!singleprojects || !wsId || !id ? <p>Loading...</p> :
                <div>

                    <h2>Project ID: {singleprojects.project_id}</h2>
                    <p>Title: {singleprojects.title}</p>
                    <p>Description: {singleprojects.description}</p>
                </div>}
        </div>
    );
}

export default ProjectDetails;