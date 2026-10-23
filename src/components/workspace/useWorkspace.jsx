import { auth, db } from "../../firebase.js"
import { addDoc, collection, getDocs, query, updateDoc, where, doc, onSnapshot, deleteDoc } from "firebase/firestore"
import { onAuthStateChanged } from "firebase/auth"
import { useContext, useEffect, useState } from "react"
import { AwardIcon } from "lucide-react"
import { userContext } from "../../userContext.jsx"
function useWorkspace() {

    const [workspace, setworkspace] = useState([])
    const [loading, setloading] = useState(false)


    useEffect(() => {
        const unsubauth = onAuthStateChanged(auth, async (user) => {

            if (!user) {
                setworkspace([]);
                return

            }

            const q = query(collection(db, "workspace"),
                where("uid", "==", user.uid)
            )

            const snapshot = onSnapshot(q, (snapshot) => {

                const data = snapshot.docs.map((doc) => ({
                    workspace_id: doc.id,
                    ...doc.data()
                }))

                setworkspace(data)
            })
            return () => snapshot()
        })

        return () => unsubauth()
    }, [])

    const addWorkSpace = async (imageUrl, workspacename) => {
        try {
            setloading(true)
            await addDoc(collection(db, "workspace"), {
                uid: auth?.currentUser?.uid,
                imageUrl,
                workspacename
            })
        }
        catch (err) {
            console.log(err);

        }
        finally {
            setloading(false)

        }

    }

    const selectedWorkSpace = async (selectedId) => {
        for (const space of workspace) {
            await updateDoc(doc(db, "workspace", space.workspace_id), {
                selected: space.workspace_id === selectedId
            })
        }

    }



    const selectedSettingWorkSpace = async (selectedId) => {
        for (const space of workspace) {
            updateDoc(doc(db, "workspace", space.workspace_id), {
                sellectedSettingws: space.workspace_id === selectedId
            })

        }
    }


    const deleteWorkSpace = async (workspace) => {
        try {

            const q = query(collection(db, "projects"),
                where("uid", "==", workspace.uid),
                where("workspace_id", "==", workspace.workspace_id)

            )
            const snapshot = await getDocs(q)
            for (const project of snapshot.docs) {
               

                const qu = query(collection(db, "milestone"),
                    where("uid", "==", workspace.uid),
                    where("workspace_id", "==", workspace.workspace_id),
                    where("project_id", "==", project.id)

                )
                const snapshotq = await getDocs(qu)
                for (const milestone of snapshotq.docs) {
                    console.log(milestone.ref);

                    await deleteDoc(milestone.ref)
                }
                 console.log(project.ref);
                await deleteDoc(project.ref)
            }




            await deleteDoc(doc(db, "workspace", workspace.workspace_id));

        }
        catch (err) {
            console.log(err);

        }


    }

    return {
        addWorkSpace,
        workspace,
        selectedWorkSpace,
        loading,
        setloading,
        deleteWorkSpace,
        selectedSettingWorkSpace
    }

}

export default useWorkspace