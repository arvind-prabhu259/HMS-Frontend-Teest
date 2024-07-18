import {useState, useEffect} from 'react'
import { Navigate } from "react-router-dom";
import Header from '../components/header';
import './hostelStyles.css'

const Hostel = () =>{
    const [backendData, setBackendData] = useState([{}]);

    return(
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
    );
};

export default Hostel;