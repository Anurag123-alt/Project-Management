import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { userContext } from "../../userContext.jsx";

import Lime from "../milestone/limestoneInput.jsx";
import { collection, doc, getDoc, getDocs, onSnapshot, query, where } from "firebase/firestore";
import { auth, db } from "../../firebase.js";
import { onAuthStateChanged } from "firebase/auth";
function ProjectDetails() {

    const { id } = useParams();
    const { workspace, allUsers } = useContext(userContext)
    const [singleprojects, setSingleProjects] = useState({})
    const wsId = workspace.find(item => item.selected == true)
    useEffect(() => {
        if (!wsId && !id && !singleprojects) {
            return
        }



        const fetchProject = async () => {
            try {

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
            }


            catch (err) {
                console.log(err);

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