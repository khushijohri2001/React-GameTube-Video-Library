import "../styles/auth.css";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";
import { useState } from "react";
const Signup = () =>{
const { signupHandler } = useAuth();
const [newUser, setNewUser ] = useState({fname : "", lname : "", email : "", password : ""})

const signupForm = (event) =>{
event.preventDefault();
signupHandler(newUser);
}
return (
<div className="App">
    <main className="form-main sign">
        <div className="form-container">

            <form action="" className="signup-form" onSubmit={signupForm}>
                <h2 class="form-head">SignUp Form</h2>
                <fieldset>
                    <legend for="fname" className="label-inp">Firstname*</legend>
                    <input type="text" className="input" id="fname" placeholder="Billie" value={newUser.fname}
                        onChange={(e)=> setNewUser({...newUser, fname : e.target.value})} required autofocus />
                </fieldset>
                <fieldset>
                    <legend for="lname" className="legend-inp">Lastname</legend>
                    <input type="text" className="input" id="lname" placeholder="Jean" value={newUser.lname} onChange={(e)=>
                    setNewUser({...newUser, lname : e.target.value})} required/>
                </fieldset>
                <fieldset>
                    <legend for="email" className="legend-inp">Email address*</legend>
                    <input type="text" className="email-id-input input" id="email" placeholder="billiejean@gmail.com"
                        required value={newUser.email} onChange={(e)=> setNewUser({...newUser, email : e.target.value})}
                    />
                </fieldset>
                <fieldset>
                    <legend for="password" className="legend-inp">Password*</legend>
                    <input type="password" className="input" placeholder="1234567" id="password" required
                        value={newUser.password} onChange={(e)=> setNewUser({...newUser, password : e.target.value})} />
                </fieldset>
                <label for="">
                    <input type="checkbox" id="t-c" required />
                    I accept all the terms and conditions.
                </label>
                <div className="btn-div">
                    <button className="login-btn" type="submit">Signup</button>
                    <Link to="/login" className="link-style">
                    <button className="new-ac-btn"> Already have an account</button>
                    </Link>
                </div>



            </form>
        </div>
    </main>
</div>
);
}

export { Signup }