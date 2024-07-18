import {useState, useEffect} from 'react'
import { Navigate } from "react-router-dom";
import Header from '../components/header';
import './bookingStyles.css'

const Booking = () =>{
    const [success, setSuccess] = useState(false);

    const [message, setMessage] = useState("");
    const [hostelId, setHostelId] = useState("");
    const [roomNo, setRoomNo] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
        // console.log(roomNo.toString().padStart(4,'0'));
        if(hostelId == -1){
            alert("Select hostel building");
            return -1;
        }
        let requestData = {
            hostelId: hostelId,
            roomNo: roomNo.toString().padStart(4,'0')
        }
        
        // console.log(message);
    }

    return(
        <div>
            <Header />
            <h1>Create Booking.</h1>
            <form onSubmit={handleSubmit}>
                <label>Hostel building: </label>
                {/* <input type='number' name = "hostelId" onChange={(e) => {setHostelId(e.target.value)}}/><br/> */}

                <select id='room-select' name='hostelId'  onChange={(e)=>setHostelId(e.target.value)}>
                    <option value={-1} selected>Select Hostel Block</option>
                    <option value={1}>BLOCK 1</option>
                    <option value={2}>BLOCK 2</option>
                    <option value={3}>BLOCK 3</option>
                    <option value={4}>BLOCK 4</option>
                </select>

                <label>Room number: </label>
                <input type='text' name = "roomNo" onChange={(e) => {setRoomNo(e.target.value)}}/><br/>
                <input type='submit' value = "Book Room"/><br/>
                {(message.ERROR_MESSAGE)?(
                    <p>{message.ERROR_MESSAGE}</p>
                ):(
                    <p>{message.SUCCESS_MESSAGE}</p>
                )}
                
            </form>
        </div>
    );
};

export default Booking;