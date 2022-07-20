import "../styles/auth.css";
import { Link } from "react-router-dom";
import { useAuth } from "../context/authContext";
import { useState } from "react";

const Login = () =>{
const { loginHandler } = useAuth();

const [loginDetails, setLoginDetails] = useState({email : "", password : ""});


const guestUserHandler = (event) => {
event.preventDefault();
setLoginDetails({
email: "adarshbalika@gmail.com",
password: "adarshBalika123",
})
}

const loginForm = (event) => {
event.preventDefault();
loginHandler(loginDetails);
}


return (
<div className="App">
    <main className="form-main">

        <div className="form-container">

            <form action="" className="login-form" onSubmit={loginForm}>
                <h2 class="form-head">Login Form</h2>
                <fieldset>
                    <legend for="email" className="label-inp">Email address*</legend>
                    <input type="text" className="input" id="email" placeholder="billiejean@gmail.com"
                        value={loginDetails.email} onChange={(e)=>setLoginDetails({...loginDetails, email :
                    e.target.value})} required />
                </fieldset>
                <fieldset>
                    <legend for="password" className="label-inp">Password*</legend>
                    <input type="password" className="input" id="password" placeholder="1234567"
                        value={loginDetails.password} onChange={(e)=>setLoginDetails({...loginDetails, password :
                    e.target.value})} required />
                </fieldset>

                <div class="pass-rem">
                    <label className="remem-me">
                        <input type="checkbox" />
                        Remember me
                    </label>
                    <button className="forgot-pass">Forgot your password?</button>
                </div>
                <div className="btn-div">
                    <button className="login-btn" onClick={guestUserHandler}>Add Guest Credentials</button>
                    <button className="login-btn" type="submit">Login</button>
                    <Link to="/signup" className="link-style">
                    <button className="new-ac-btn">Create new account </button>
                    </Link>
                </div>
            </form>
        </div>
    </main>
</div>
);
}

export { Login }