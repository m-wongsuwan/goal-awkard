import { useAuth } from '../../hooks/useAuth';
import Button from "@mui/material/Button"
import { recaptchaVerifier } from '../../services/firebase';


function UnauthenticatedApp() {
    const { login } = useAuth();

    return (
        <>
            <h2>Log in!</h2>
            <div>
                {/* <button onClick={login} className="login">
                    Login with Google
                </button> */}
                <Button variant='contained' onClick={login}>Login with Google</Button>
                <div id='recaptcha-container'>

                </div>
            </div>
        </>
    );
}

export { UnauthenticatedApp };