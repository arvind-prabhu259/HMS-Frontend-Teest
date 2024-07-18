import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import "./loginStyles.css";

const Login = ()=>{
    const [message, setMessage] = useState("");
    const [studEmail, setStudEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const [authenticated, setAuthenticated] = useState(false);
    const [checkingTokens, setCheckingTokens] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');

    // asynchronous function to make request to api for user auth
    const fetchData = (authData) => {
        return new Promise((resolve, reject) => {
            fetch("/login",{
                method: 'post',
                headers: {"Content-Type":"application/json"},
                body: JSON.stringify(authData)
            })
            .then(response => {
                if(response.ok){
                    return response.json();
                }else{
                    throw new Error("Timeout");
                }
            })
            .then(data => resolve(data))
            .catch(error => reject(error));
        });
    }

    const handleSubmit = (event) =>{
        event.preventDefault();
        let authData = {
            email: studEmail,
            pw: password
        };
        
        fetchData(authData)
        .then(data => {
            setMessage(data);
            if(data.status === "Logged in successfully"){
                setIsLoggedIn(true);
            }
        })
        .catch(error => {
            console.log("Error2:", error);
        })
        
    }

    useEffect(() => {
        const checkTokenStatus = async () =>{
            try{
                const response = await fetch('/protected',{
                    method:'GET',
                    credentials:'include',
                    headers:{
                        'Content-type': 'application/json'
                    }
                });
                if(response.ok){
                    const data = await response.json();
                    if(data.verified){
                        setAuthenticated(true);
                    }else{
                        setAuthenticated(false);
                        setErrorMessage('Unauthorized {dfsdfsdf');
                    }
                    // alert(authenticated);
                }else{
                    const errorData = await response.json();
                    setErrorMessage(errorData.message);
                }
            }
            catch(error){
                console.error("Error checking tokens: ", error);
                setErrorMessage('Error checking tokens');
            }finally{
                setCheckingTokens(false);
            }
        };
        checkTokenStatus();
    }, []);

    if(checkingTokens){
        return(
            <div>
                LOADING...
            </div>
        )
    }

    return (
        <div>
            {authenticated?(
                <Navigate to="/home" />
            ):(
                <div id="loginPage">
                    <div className="loginDiv">
                        {isLoggedIn?(
                            <Navigate to="/home" />
                        ):(
                            <form className="loginForm" onSubmit = {handleSubmit}>
                                <h1>Login</h1>
                                <div style={{display:"block"}}>
                                    <b>Email address:</b><br/>
                                    <input id="loginInput" type="email" placeholder="Email address" required onChange={(e)=>{setStudEmail(e.target.value)}}/><br/>
                                    <br/>
                                    <b>Password:</b><br/>
                                    <input id="loginInput" type="password" placeholder="Password" required onChange={(e)=>{setPassword(e.target.value)}}/><br/>
                                </div>
                                <button className="submitButton" type="submit">Login</button>
                                <p>{message.status}</p>
                            </form>
                        )}
                    </div>
                </div>
            )}
        </div>
    )
};
export default Login;