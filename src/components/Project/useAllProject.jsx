import { auth, db } from "../../firebase.js"
import { addDoc, collection, getDocs, query, updateDoc, where, doc, onSnapshot, serverTimestamp, and, or } from "firebase/firestore"
import { onAuthStateChanged } from "firebase/auth"
import { useContext, useEffect, useState } from "react"
import { AwardIcon } from "lucide-react"
import { userContext } from "../../userContext.jsx"
import { priorities } from "../Dashboard/category.jsx"
function useProjects() {
    const [projects, setProjects] = useState([])

    console.log(serverTimestamp());

    useEffect(() => {
        const unsubauth = onAuthStateChanged(auth, async (user) => {
            if (!user) {
                setProjects([]);
                return
            }


            const queryWorkpace = query(collection(db, "workspace"),
                or(
                    where("uid", "==", user.uid),
                    where("membersuid", "array-contains", user.uid),

                )

            )


            const workspaceSnap = onSnapshot(queryWorkpace, (snapshotitem) => {
                const data = snapshotitem.docs.map((doc) => ({
                    workspace_id: doc.id,
                    ...doc.data()
                }))
                console.log(data);

                const currentWorkspace = data.find(item => item.selected === true)

                if (!currentWorkspace) {
                    setProjects([])

                    return
                }

                

                const queryProjects = query(collection(db, "projects"),

                    // where("uid", "==", user.uid),
                    where("workspace_id", "==", currentWorkspace.workspace_id)

                )

                const projectSnap = onSnapshot(queryProjects, (snapshot) => {
                    const data = snapshot.docs.map((doc) => ({
                        workspace_id: currentWorkspace.workspace_id,
                        projects_id: doc.id,

                        ...doc.data()
                    }))

                    setProjects(data)

                })
                return () => projectSnap()
            })
            return () => workspaceSnap()
        })
        return () => unsubauth()
    }, [])

    const addProjects = async (id, title, description, priority, image) => {
        try {
            await addDoc(collection(db, "projects"), {
                uid: auth?.currentUser?.uid,
                workspace_id: id,
                title,
                description,
                priority,
                image
            })
        }
        catch (err) {
            console.log(err);

        }

    }



    return {

        addProjects,
        projects,
    }

}

export default useProjects