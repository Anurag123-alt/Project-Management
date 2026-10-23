import { useEffect, useState } from "react";
import { auth, db } from "../../firebase";
import {
    doc,
    getDoc,
    onSnapshot,
    setDoc,
    updateDoc,
    collection,
    getDocs
} from "firebase/firestore";

import { onAuthStateChanged } from "firebase/auth";

function useUser() {

    const [users, setUser] = useState({});

    const [allUsers, setallUsers] = useState([]);

    // Get current logged-in user's data
    useEffect(() => {
        let unsubUser, unallUsers;

        const unsubAuth = onAuthStateChanged(auth, async (user) => {
            // pehle purane listeners clean karo (agar user switch hua ho)
            if (unsubUser) unsubUser();
            if (unallUsers) unallUsers();

            if (!user) {
                setUser({});
                setallUsers([]);
                return;
            }
            const userRef = doc(db, "users", user.uid);
            unsubUser = onSnapshot(userRef, (snapShot) => {
                setUser(snapShot.exists() ? snapShot.data() : {});

            });


            const allUserRef = collection(db, "users");
            unallUsers = onSnapshot(allUserRef, (snapShot) => {
                const data = snapShot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setallUsers(data);
            });
        });

        return () => {
            unsubAuth();
            // if (unsubUser) unsubUser();
            if (unallUsers) unallUsers();
        };
    }, []);


    // Create user document
    const setData = async (firstname, lastname, displayName, email, uid, theme, userimageUrl) => {

        try {

            await setDoc(doc(db, "users", uid), {
                firstname,
                lastname,
                displayName,
                email,
                uid,
                theme,
                userimageUrl
            });

            // Immediately update React state


        } catch (error) {
            console.error("Error setting user data:", error);
        }

    };


    // Update theme
    const updateTheme = async (uid, newTheme) => {

        if (!uid) return;

        try {

            await updateDoc(
                doc(db, "users", uid),
                {
                    theme: newTheme
                }
            );

            // Immediately update UI state


        } catch (error) {
            console.error("Error updating theme:", error);
        }

    };


    return {
        users,
        allUsers,
        setData,
        updateTheme
    };
}

export default useUser;