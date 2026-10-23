import { useReducer, useEffect, useState } from "react";
// import Reducer from "./reducerTodo.jsx";
import { addDoc, collection, deleteDoc, doc, onSnapshot, query, updateDoc, where } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

import { auth, db, storage } from "../../firebase.js"

function useTodo(mid, pid, wsId) {


    const [todo, setTodo] = useState([])


    useEffect(() => {
        const unsubAuth = onAuthStateChanged(auth, (user) => {
            if (!user) return
            const q = query(
                collection(db, "todos"),
                where("uid", "==", user.uid),
                where("milestone_id", "==", mid),
                where("workspace_id", "==", wsId.workspace_id),
                where("project_id", "==", pid)





            )

            const unsubTodo = onSnapshot(q, (snapshot) => {

                const data = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }))
                setTodo(data)

            })


            return () => unsubTodo;




        })
        return () => unsubAuth;

    }, [])


    const addTodo = async (task, description, date, time, category, priority, mid, pid, wsId) => {
        const user = auth.currentUser;

        if (!user) {
            throw new Error("User is not logged in");
        }
        await addDoc(collection(db, "todos"), {
            workspace_id: wsId.workspace_id,
            project_id: pid,
            milestone_id: mid,
            task,
            description,
            date,
            time,
            category,
            priority,
            uid: auth?.currentUser?.uid
        })

    }




    const deleteTodo = async (id) => {
        await deleteDoc(doc(db, "todos", id))

    };

    const updateTodo = async (id, task, description, date, time, category, priority) => {

        await updateDoc(doc(db, "todos", id), {
            task,
            description,
            date,
            time,
            category,
            priority
        })

    };

    const toggleComplete = async (id, complete) => {
        await updateDoc(doc(db, "todos", id), {
            complete
        })

    };

    const onPin = async (id, pin) => {
        await updateDoc(doc(db, "todos", id), {
            pin
        })

    };
    const onDot = async (id, dot) => {
        await updateDoc(doc(db, "todos", id), {
            dot
        })



    };

    const onTogg = async (id, willOpen) => {
        await updateDoc(doc(db, "todos", id), {
            willOpen
        })
    }

    return {
        todo,
        addTodo,
        deleteTodo,
        updateTodo,
        toggleComplete,
        onPin,
        onDot,
        onTogg
    };
}

export default useTodo;