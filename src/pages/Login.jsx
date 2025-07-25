import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser, signupUser } from '../reducer/slices/authSlice';
import { loginFormSchema, loginInitialValues, signupFormSchema, signupInitialValues } from '../config/loginConfig';

import Form from '../components/form/form';

const Login = () => {
    const [isLogin, setIsLogin] = useState(true); 

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const status  = useSelector((state) => state.auth.status); 
    const errorMessage = useSelector((state) => state.auth.error);

    const handleSubmit = (loginData) => {
        if (isLogin) {
            dispatch(loginUser(loginData)) 
                .unwrap() 
                .then(() => { navigate('/'); }) 
                .catch((err) => { console.error("Login fehlgeschlagen:", err); });
        } else {
            dispatch(signupUser(loginData)) 
                .unwrap() 
                .then(() => { navigate('/'); }) 
                .catch((err) => { console.error("Registrierung fehlgeschlagen:", err); });
        }
    }

    const handleFormSwitch = () => {
        if (isLogin) {
            setIsLogin(false);
        } else {
            setIsLogin(true);
        }
    }

    let content;
    if (status === 'loading') {
        content = <p className="StandardParagraph">Einen Moment bitte...</p>
    } else if (status === 'failed') {
        content = <p className="ErrorParagraph">{errorMessage}</p>
    };

    return (
        <div className="StandardWrapper">
            <h2 className="StandardParagraph">{isLogin ? 'Login' : 'Registrieren'}</h2>
            {isLogin ? (
                <Form 
                    key='login-form'
                    schema={loginFormSchema}
                    initialValues={loginInitialValues}
                    onSubmit={handleSubmit}
                    name="Anmelden"
                />
            ) : (
                <Form 
                    key='signupForm'
                    schema={signupFormSchema}
                    initialValues={signupInitialValues}
                    onSubmit={handleSubmit}
                    name="Registrieren"
                />
            )}
            {content}
            {isLogin ? (
                <>
                    <p className="StandardParagraph">Noch kein Konto?</p>
                    <button className="StandardButton" onClick={handleFormSwitch}>Jetzt Registrieren</button>
                </>
            ) : (
                <>
                    <p className="StandardParagraph">Schon ein Konto erstellt?</p>
                    <button className="StandardButton" onClick={handleFormSwitch}>Jetzt Anmelden</button>
                </>
            )}
        </div>
    )
}

export default Login;