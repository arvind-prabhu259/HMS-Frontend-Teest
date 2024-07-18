import {useState, useEffect} from 'react'
import { Navigate } from "react-router-dom";
import Header from '../components/header';

const Cancel = () =>{
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
            
            window.location.reload();
        }
    }

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

    return(
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
    );
};

export default Cancel;