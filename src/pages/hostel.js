import {useState, useEffect} from 'react'
import { Navigate } from "react-router-dom";
import Header from '../components/header';
import './hostelStyles.css'

const Hostel = () =>{
    const [backendData, setBackendData] = useState([{}]);

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

    useEffect(()=>{
        if(authenticated){
            fetch("/hostelList").then(
                response =>response.json()
            ).then(
                data =>{
                    setBackendData(data)
                }
            ).catch(error => console.error("Error fetching data: ", error));
        }
    },[authenticated]); 

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
                    <div className='hostel-div'>
                        <h1>View Hostel Buildings.</h1>
                        <div className='table-container'>
                            <table className='hostel-table'>
                                <tr className='hostel-table-headers'>
                                    <th>Hostel Name</th>
                                    <th>Location</th>
                                    <th>Available Rooms</th>
                                    <th>Total Rooms</th>
                                </tr>
                                {backendData.map((row, key) => {
                                    // console.log(row);
                                    return(
                                    <tr key={key}>
                                        <td>{row.HOSTEL_NAME}</td>
                                        <td>{row.LOCATION}</td>
                                        <td>{row.AVAILABLE}</td>
                                        <td>{row.NUM_ROOMS}</td>
                                    </tr>
                                    )
                                })}
                                
                            </table>
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
    );
};

export default Hostel;