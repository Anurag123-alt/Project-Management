import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth, db } from "../../firebase";
import { addDoc, collection, onSnapshot, query, where } from "firebase/firestore";

function usemilestone(id, wsId) {
    console.log(id, wsId);

    const [milestone, setmilestone] = useState([])
    console.log(milestone);

    useEffect(() => {
        const unsubscribeAuth = onAuthStateChanged(auth, async (user) => {

            if (!id || !wsId || !user) {
                setmilestone([])
                return
            }

            const milestoneQuery = query(
                collection(db, "milestone"),
                where("uid", "==", user.uid),
                where("workspace_id", "==", wsId.workspace_id),
                where("project_id", "==", id)


            )
            const unsubscribeSnapshot = onSnapshot(milestoneQuery, (snapshot) => {
                const data = snapshot.docs.map((doc) => ({
                    milestone_id: doc.id,
                    ...doc.data()
                }))
                setmilestone(data)

            })


            return () => unsubscribeSnapshot();



        })

        return () => unsubscribeAuth();

    }, [id, wsId?.workspace_id])



    const addLimeStone = async (id, title) => {

        if (!id || !wsId?.workspace_id || !title?.trim() || !auth?.currentUser) {
            return;
        }
        try {
            await addDoc(collection(db, "milestone"), {
                uid: auth?.currentUser?.uid,
                project_id: id,
                workspace_id: wsId.workspace_id,
                title,
            })
        }
        catch (err) {
            console.log(err);

        }

    }

    return {
        milestone,
        addLimeStone
    }

}

export default usemilestone;