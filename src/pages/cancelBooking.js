import {useState, useEffect} from 'react'
import { Navigate } from "react-router-dom";
import Header from '../components/header';

const Cancel = () =>{
    const [authenticated, setAuthenticated] = useState(false);
    const [checkingTokens, setCheckingTokens] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');

    const [message, setMessage] = useState("");
    const [confirmation, setConfirmation] = useState("");
    const [backendData, setBackendData] = useState([{}]);
    const [bookingActive, setBookingActive] = useState(false);
    
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // alert("confirmation status: "+confirmation);
        if(confirmation !== "on" || confirmation == null){
            alert("Confirm Room Cancellation.");
        }else{
            let requestData = {
                confirmation: confirmation
            }
            // console.log(confirmation);
            fetch("/cancel",{
                method: 'POST',
                headers: {"Content-Type":"application/json"},
                body: JSON.stringify(requestData)
            }).then(
                response=>response.json()
            ).then(data=>{
                setMessage(data)
            })
            // alert(message);
            // console.log(message);
            window.location.reload();
        }
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

    useEffect(()=>{
        if(authenticated){
            fetch("/currentBooking").then(
                response =>response.json()
            ).then(
                data =>{
                    setBackendData(data)
                }
            ).catch(error => console.error("Error fetching data: ", error));
        }
    },[authenticated]); 

    useEffect(()=>{
        if(backendData[0].ERROR_MESSAGE){
            setBookingActive(false);
        }
        else if(backendData[0].STATE !== 'ACTIVE'){{
            setBookingActive(false);
            console.log(backendData);
        }}
        else if(backendData[0].STATE=='ACTIVE'){
            console.log(backendData);
            setBookingActive(true);
        }
        // alert(bookingActive);
    },[backendData]);

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
                    {bookingActive?(
                        <div>
                            <h1>Cancel Booking.</h1>
                            <form onSubmit={handleSubmit}>
                                <label><input type='checkbox' onChange={(e)=>{setConfirmation(e.target.value);console.log(e.target.value);}}/> Confirm cancellation</label><br/>
                                <button type='submit' disabled={!confirmation}>Submit</button>
                            </form>
                        </div>
                    ):(
                        <div>
                            <h1>No active bookings.</h1>
                        </div>
                    )}
                    <div>
                        <div className='hostel-div'>
                            <h1>Current booking.</h1>
                            <div className='table-container'>
                                <table className='hostel-table'>
                                    <tr className='hostel-table-headers'>
                                        <th>Room Number</th>
                                        <th>Floor Number</th>
                                        <th>Room Type</th>
                                        <th>Hostel Building</th>
                                        <th>Allotment Date:</th>
                                        <th>Completion Date</th>
                                        <th>Booking Status</th>
                                    </tr>
                                    {backendData.map((row, key) => {
                                        return(
                                        <tr key={key}>
                                            <td>{row.ROOM_NUMBER}</td>
                                            <td>{row.FLOOR_NUMBER}</td>
                                            <td>{row.ROOM_TYPE}</td>
                                            <td>{row.HOSTEL_NAME}</td>
                                            <td>{formatDate(row.ALLOTMENT_DATE)}</td>
                                            <td>{(!row.COMPLETION_DATE?("Present"):(formatDate(row.COMPLETION_DATE)))}</td>
                                            <td>{row.STATE}</td>
                                        </tr>
                                        )
                                    })}
                                    
                                </table>
                            </div>
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

export default Cancel;