import { signInWithEmailAndPassword } from "firebase/auth"
import { auth } from "../../firebase.js"
import { useNavigate } from "react-router-dom"
import { useContext, useState } from "react"
import Styles from "./signIn.module.css"
import { userContext } from "../../userContext.jsx"

import SideBar from "../SideBar/sideBar.jsx"
function SignIn() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()
    const { users } = useContext(userContext)
    const handleSignIn = async () => {

        try {
            const user = await signInWithEmailAndPassword(auth, email, password)
            console.log(user.user.uid);

            navigate("/dashboard")

        }

        catch (err) {
            console.log(err);

        }

    }






    return (
        <div className={Styles.container}>
            <div className={Styles.sidebar}>
                <SideBar />

            </div>
            <div className={`${Styles.dashboard} ${users.theme == "light" ? "light" : "dark"}`}>
                <div className={`${Styles.box} ${users.theme == "light" ? "light_card" : "dark_card"} ${users.theme == "light" ? "light_shadow" : "dark_shadow"}`}>
                    <div className={Styles.HeadingTitle}>
                        <div className={Styles.title}>Welcome Back!</div>
                        <div className={Styles.description}>Sign in to continue to your account</div>

                    </div>

                    <div style={{ display: 'flex', flexDirection: "column" }}>

                        <h2 className={Styles.heading}>Sign In</h2>

                        <input
                            type="email"
                            placeholder="Email"
                            className={`${Styles.input} ${users.theme == "light" ? "light_card" : "dark_card"}`}
                            onChange={(e) => setEmail(e.target.value)}
                        />

                        <input
                            type="password"
                            placeholder="Password"
                            className={`${Styles.input} ${users.theme == "light" ? "light_card" : "dark_card"}`}
                            onChange={(e) => setPassword(e.target.value)}
                        />

                        <div className={Styles.error}></div>

                        <button
                            className={`${Styles.button} ${users.theme == "light" ? "light" : "dark"}`}
                            onClick={handleSignIn}
                        >
                            Sign In
                        </button>

                        <button
                            className={`${Styles.signupButton} ${users.theme == "light" ? "light_card" : "dark_card"}`}
                            onClick={() => navigate("/")} // React Router
                        >
                            Create New Account
                        </button>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default SignIn;