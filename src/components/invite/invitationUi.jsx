import { useState, useEffect, useContext } from "react"
import { onAuthStateChanged } from "firebase/auth"
import { query, collection, getDocs, where, onSnapshot, doc, updateDoc } from "firebase/firestore"
import { db, auth } from "../../firebase"
import styles from "./invitation.module.css"
import { userContext } from "../../userContext"
function InvitaitonUi() {
    const { updateWsInvitaion, workspace, updateWSpaceMember, users } = useContext(userContext)
    const [invitation, setInvition] = useState([])
    const wsId = workspace.find(item => item.selected == true)
    const [member, setMember] = useState({})
    console.log(users);

    const invitaionTest = () => {
        onAuthStateChanged(auth, async (user) => {

            const invitationQuery = query(collection(db, "invitation"),
                where("email", "==", user.email)
            )

            const invitationSnapshot = await getDocs(invitationQuery)

            const data = invitationSnapshot.docs.map(doc => ({
                invitationId: doc.id,
                ...doc.data()
            }))


            setInvition(
                data
            );
            console.log(data);





            // const mq = collection(db, "members")


            // const snapshotm = onSnapshot(mq, (snapshot) => {
            //     const data = snapshot.docs.map((doc) => ({
            //         member_id: doc.id,
            //         ...doc.data()
            //     }))




            // const q = query(
            //   collection(db, "workspaceMembers"),
            //   where("uid", "==", memberUid)
            // );

            // const snapshot = await getDocs(q);

            // const workspaces = await Promise.all(
            //   snapshot.docs.map(async (memberDoc) => {
            //     const { workspaceId, role } = memberDoc.data();

            //     const workspaceSnap = await getDoc(
            //       doc(db, "workspaces", workspaceId)
            //     );

            //     if (!workspaceSnap.exists()) return null;

            //     return {
            //       id: workspaceSnap.id,
            //       ...workspaceSnap.data(),
            //       role
            //     };
            //   })
            // );

            // console.log(workspaces.filter(Boolean));



            // setMember(data)


        })

        // return () => snapshotm()
        // })
    }
    // console.log(member);

    useEffect(() => {
        invitaionTest()

    }, [])

    return (
        <>
            {
                invitation.map((item) => (
                    <>
                        <div className={styles.invitationModal} key={item.invitationId}>

                            {item.workspacename}
                            <button
                                onClick={() => {
                                    updateWsInvitaion(item.invitationId)
                                    updateWSpaceMember(item.email, item.role, item.workspace_id, users.uid)
                                }}
                            >Accept</button>

                        </div>
                    </>
                ))
            }
            {
                console.log(invitation)
            }
        </>
    )
}

export default InvitaitonUi;


