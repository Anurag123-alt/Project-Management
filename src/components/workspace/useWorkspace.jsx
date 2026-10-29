import { auth, db } from "../../firebase.js"
import { addDoc, collection, getDocs, query, updateDoc, where, doc, onSnapshot, deleteDoc, arrayUnion, setDoc, FieldPath, or } from "firebase/firestore"
import { onAuthStateChanged } from "firebase/auth"
import { useContext, useEffect, useState } from "react"
import { AwardIcon } from "lucide-react"
import { userContext } from "../../userContext.jsx"
function useWorkspace() {

    const [workspace, setworkspace] = useState([])

    const [loading, setloading] = useState(false)

    const wsId = workspace.find(item => item.selected == true)

    useEffect(() => {
        const unsubauth = onAuthStateChanged(auth, async (user) => {

            if (!user) {
                setworkspace([]);
                return

            }

            const q = query(collection(db, "workspace"),
                or(
                    where("uid", "==", user.uid),

                    where("membersuid", "array-contains", user.uid)
                )

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

    const addWorkSpace = async (imageUrl, workspacename, type) => {
        try {
            setloading(true)
            await addDoc(collection(db, "workspace"), {
                uid: auth?.currentUser?.uid,
                imageUrl,
                workspacename,
                type
            })
        }
        catch (err) {
            console.log(err);

        }
        finally {
            setloading(false)


        }

    }

    const updateWSpaceMember = async (email, role, workspace_id, userUid) => {
        console.log(email, role, workspace_id, userUid);

        try {
            await updateDoc(doc(db, "workspace", workspace_id), {
                membersuid: arrayUnion(userUid),

            }
            )
        }

        catch (err) {
            console.log(err);

        }


    }

    const addWsInvitaion = async (selectUser, selectRole, workspace_id, workspacename) => {
        try {
            if (selectRole == "manager") {

                await addDoc(collection(db, "invitation"), {
                    uid: auth.currentUser.uid,
                    workspace_id: workspace_id,
                    email: selectUser,
                    role: selectRole,
                    status: false,
                    invitedBy: auth.currentUser.uid,
                    workspacename: workspacename

                })
                console.log("success");

            }


        }

        catch (err) {
            console.log(err);

        }


    }

    const updateWsInvitaion = async (id) => {
        try {

            await updateDoc(doc(db, "invitation", id), {
                status: true,

            })
            console.log("success");



        }

        catch (err) {
            console.log(err);

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

            const queryProject = query(collection(db, "projects"),
                where("uid", "==", workspace.uid),
                where("workspace_id", "==", workspace.workspace_id)

            )
            const snapshotProject = await getDocs(queryProject)
            for (const project of snapshotProject.docs) {


                const queryMilestone = query(collection(db, "milestone"),
                    where("uid", "==", workspace.uid),
                    where("workspace_id", "==", workspace.workspace_id),
                    where("project_id", "==", project.id)

                )
                const snapshotMilestone = await getDocs(queryMilestone)
                for (const milestone of snapshotMilestone.docs) {

                    const queryTodo = query(collection(db, "todos"),
                        where("uid", "==", workspace.uid),
                        where("workspace_id", "==", workspace.workspace_id),
                        where("project_id", "==", project.id),
                        where("milestone_id", "==", milestone.id),


                    )

                    const snapshotTodo = await getDocs(queryTodo)


                    for (const todo of snapshotTodo.docs) {
                        await deleteDoc(todo.ref)

                    }
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
        addWsInvitaion,
        updateWSpaceMember,
        updateWsInvitaion,
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