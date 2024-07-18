import {useState, useEffect} from 'react'
import Header from '../components/header';
import './roomStyles.css'

const Room = () =>{
    const [backendData, setBackendData] = useState([{}]);
    const [hostelId, setHostelId] = useState(-1);

    function handleForm(event){
        event.preventDefault();
        // alert(backendData.length);
        setBackendData([{}]);
        if(hostelId === -1){
            alert("Select a Hostel Building to view rooms.");
            return;
        }
        let choice = {
            hostelId:hostelId
        };
        // console.log(backendData);
    };

    return(
        <div>
            <Header />
            <div className='rooms-div'>
                <h1>View Rooms.</h1>
                <form onSubmit={handleForm}>
                    <label>Hostel building: </label>
                    <select id='room-select' name='hostelId'  onChange={(e)=>setHostelId(e.target.value)}>
                        <option value={-1} selected>Select Hostel Block</option>
                        <option value={1}>BLOCK 1</option>
                        <option value={2}>BLOCK 2</option>
                        <option value={3}>BLOCK 3</option>
                        <option value={4}>BLOCK 4</option>
                    </select>
                    <input type='submit' value = "View Rooms"/>
                </form>
                {backendData.length>1?(
                    <div className='table-container'>
                        <table className='rooms-table'>
                            <tr>
                                <th>Room Number</th>
                                <th>Floor Number</th>
                                <th>Available Bookings</th>
                                <th>Capacity</th>
                            </tr>
                            {backendData.map((row, index) => (
                                <tr key={index}>
                                    <td>{row.ROOM_NUMBER}</td>
                                    <td>{row.FLOOR_NUMBER}</td>
                                    <td>{row.AVAILABLE}</td>
                                    <td>{row.CAPACITY}</td>
                                    <td> <button>sdfdsd</button> </td>
                                </tr>
                            ))}
                            
                        </table>
                    </div>
                ):(
                    <></>
                )}
            </div>
        </div>
    );
};

export default Room;