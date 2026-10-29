
import { auth } from "../../firebase.js";
import { reload, sendEmailVerification } from "firebase/auth";
import { useNavigate } from "react-router-dom";

function VerifyEmail() {
    const navigate = useNavigate();

    const checkVerification = async () => {
        const user = auth.currentUser

        if (!user) {
            navigate("/signin")
            return
        }
        await reload(user)
        if (user.emailVerified) {
            navigate("/dashboard")
        }
        else {
            alert("first verify your email")
        }
    }

    const resendVerification = async () => {
        try {
            const user = auth.currentUser
            if (!user) {
                return
            }
            const actionCodeSetting = {
                url: "https://project-management-eosin-three.vercel.app/dashboard",
                handleCodeInApp: false
            }
            await sendEmailVerification(user, actionCodeSetting)
            alert("verification email send again.")

        }
        catch (err) {
            console.log(err);

        }



    }

    return (
        <div>
            <h2>Verify your email</h2>
            <p>
                Check your inbox and click the
                verification link.
            </p>

            <button onClick={checkVerification}>
                I have verified my email
            </button>

            <button onClick={resendVerification}>
                Resend verification email
            </button>
        </div>
    );
}

export default VerifyEmail;
