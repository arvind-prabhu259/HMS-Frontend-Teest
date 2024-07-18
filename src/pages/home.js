import {useState, useEffect} from 'react'
import { Navigate } from "react-router-dom";
import Header from "../components/header";
import displayImg from '../assets/516663.jpg'
import './homeStyles.css'

const Home = () =>{
    const [authenticated, setAuthenticated] = useState(false);
    const [checkingTokens, setCheckingTokens] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        const checkTokenStatus = async () =>{
            try{
                const response = await fetch('/protected',{
                    method:'GET',
                    credentials:'include',
                    headers:{
                        'Content-Type': 'application/json'
                    }
                });
                console.log(response);
                if(response.ok){
                    const data = await response.json();
                    console.log(data);
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
                // alert(authenticated);
                // setTimeout(()=>console.log("sdsdfs"),10000);
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

    return(
        <div>
            {authenticated?(
                <div>
                    <Header />
                    <div className="home-container">
                        <h1>Welcome to Hostel Management System.</h1>
                        <p>This Hostel Management System is created to facilitate quick, easy and efficient allocation and deallocation of hostel rooms to students.</p>
                        <div className="img-container">
                            <img src={displayImg} alt="IMAGE" className="display-image"></img>
                            <p className="display-image-caption"> An image of the moon-blessed hunter </p>
                        </div>
                    </div>
                </div>
            ):(
                <div>
                    <h1>{errorMessage}</h1>
                    <Navigate to="/" />
                </div>
            )}
        </div>
    )
    // add info abt current room, block, etc.
};

export default Home;