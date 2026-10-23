import { useContext, useState } from "react";
import { auth, db } from "../../firebase.js"
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth"
import { useNavigate } from "react-router-dom";
import { setDoc, doc } from "firebase/firestore";
import SideBar from "../SideBar/sideBar.jsx";
import { userContext } from "../../userContext.jsx";
import Styles from "../UserProile/signUp.module.css";
import { supabase } from "../../supabase.js"
import { Loader, Loader2, Loader2Icon, LoaderCircle, LoaderIcon, LoaderPinwheel } from "lucide-react";





function SignUp({ setData }) {

    const { theme, users, userimageUrl, setuserImageUrl, loading, setloading, } = useContext(userContext)
    const navigate = useNavigate();
    const [email, setEmail] = useState("")
    const [firstname, setFirstName] = useState("")
    const [lastname, setLastName] = useState("")
    const [type, setType] = useState("")
    // const userType = ["client", "devloper"]




    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const currUser = auth.currentUser

    const handleUpload = async (file) => {
        // const { data: bucketData, error: bucketError } = await supabase.storage.createBucket("profile", {
        //     public: true,
        //     allowedMimeTypes: ["image/*"],
        //     fileSizeLimit: "1MB"
        // })

        // if (bucketData && bucketError == "The resource already exists") {
        //     return
        // }
        // console.log(bucketData, bucketError);
        console.log("file =", file);
        console.log("name =", file?.name);
        console.log("type =", file?.type);

        const filePath = `profile/${file.name}`
        const { data, error } = await supabase.storage.from("profile").upload(filePath, file)
        console.log(data, error);

        const result = supabase.storage.from("profile").getPublicUrl(filePath, file)
        setuserImageUrl(result.data.publicUrl)
        console.log(result.data.publicUrl);

    }

    const handleUser = async () => {

        try {
            setloading(true)
            const user = await createUserWithEmailAndPassword(
                auth,
                email,
                password
            )
            await updateProfile(user.user, {
                displayName: `${firstname} ${lastname}`
            })
            // await setDoc(doc(db, "users", user.user.uid), {
            //     firstname,
            //     lastname,
            //     displayName: `${firstname} ${lastname}`,
            //     email: user.user.email,

            // });

            setData(firstname,
                lastname,
                user.user.displayName,
                user.user.email,
                user.user.uid, theme, userimageUrl)

            console.log(user);
            console.log(user.user);

            navigate("/dashboard")
        }

        catch (err) {
            console.log(err.code);
            // auth / invalid - email

            if (err.code === "auth/email-already-in-use") {
                setError("email is already in use try sign in")
            }

            else if (err.code === "auth/invalid-email") {
                setError("Invalid email write proper email in formate")

            }

            else {
                setError("sdjbjsbjs")
            }
            console.log(err.message);

        }
        finally {
            setloading(false)

        }

    }


    const handleType = (e) => {
        setType(e.target.value)
    }
    console.log(type)


    return (
        <div className={Styles.container}>
            <div className={Styles.sidebar}>
                <SideBar />

            </div>
            <div className={`${Styles.dashboard} ${users.theme == "light" ? "light" : "dark"} `}>

                <div className={`${Styles.box} ${users.theme == "light" ? "light_card" : "dark_card"} ${users.theme == "light" ? "light_shadow" : "dark_shadow"}`}>

                    <div className={Styles.HeadingTitle}>
                        <div className={Styles.title}>Welcome Back!</div>
                        <div className={Styles.description}>Sign in to continue to your account</div>

                    </div>

                    <div style={{ display: 'flex', flexDirection: "column" }}>

                        <h2 className={Styles.heading}>Sign up</h2>
                        <div className={Styles.nameInput}>

                            <input
                                type="text"
                                placeholder="First name"
                                className={`${Styles.input} ${users.theme == "light" ? "light_card" : "dark_card"} `}

                                onChange={(e) => setFirstName(e.target.value)}
                            />

                            <input
                                type="text"
                                placeholder="Last name"
                                className={`${Styles.input} ${users.theme == "light" ? "light_card" : "dark_card"} `}

                                onChange={(e) => setLastName(e.target.value)}
                            />
                        </div>

                        <input
                            type="email"
                            placeholder="Email"
                            className={`${Styles.input} ${users.theme == "light" ? "light_card" : "dark_card"} `}

                            onChange={(e) => setEmail(e.target.value)}
                        />

                        {error && <div className={Styles.error}>{error}</div>}

                        <input
                            type="password"
                            placeholder="Password"
                            className={`${Styles.input} ${users.theme == "light" ? "light_card" : "dark_card"} `}

                            onChange={(e) => setPassword(e.target.value)}
                        />

                        {/* <select
                            onChange={handleType}
                            className={Styles.userType}                        >
                            {userType.map((item) => (
                                <option
                                    onChange={() => {
                                        setType(item)

                                    }}
                                >{item}</option>
                            ))}
                        </select> */}
                        {userimageUrl && (
                            <img
                                style={{
                                    width: "200px",
                                    height: "200px",
                                    background: "red"
                                }}
                                src={userimageUrl}
                                alt="Uploaded"

                            />
                        )}

                        <input type="file"
                            onChange={(e) => {
                                handleUpload(e.target.files[0])

                            }}
                        />
                        <div
                            className={`${Styles.buttonContainer} ${users.theme == "light" ? "light" : "dark"} `}
                            onClick={() => {

                                handleUser()
                            }}>
                            <div className={Styles.loaderBtn}>
                                {loading && <Loader2 />}
                            </div>
                            <div className={Styles.submitBtn}>
                                Submit

                            </div>
                        </div>
                        {

                        }
                        <button
                            className={`${Styles.signinButton} ${users.theme == "light" ? "light_card" : "dark_card"}`}
                            onClick={() => navigate("/signin")}>
                            Already have an account? Sign in
                        </button>
                    </div>
                </div>
            </div>

        </div>
    );



}

export default SignUp