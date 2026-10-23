
import { auth } from "../../firebase.js";
import { reload, sendEmailVerification } from "firebase/auth";
import { useNavigate } from "react-router-dom";

function VerifyEmail() {
    const navigate = useNavigate();

    const checkVerification = async () => {
        try {
            const user = auth.currentUser;

            if (!user) {
                navigate("/signin");
                return;
            }

            const res = await reload(user);
            console.log(res);

            if (user.emailVerified) {
                navigate("/dashboard");
            } else {
                alert("Please verify your email first.");
            }
        } catch (err) {
            console.log(err.code, err.message);
        }
    };

    const resendVerification = async () => {
        try {
            const user = auth.currentUser;

            if (!user) return;

            await sendEmailVerification(user);
            alert("Verification email sent again.");
        } catch (err) {
            console.log(err.code, err.message);
        }
    };

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
