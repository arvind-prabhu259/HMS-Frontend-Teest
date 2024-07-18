import React from 'react'
// import { BrowserRouter, Routes, Route} from "react-router-dom";
import DropDownItem from "../components/dropDownItem";
import { Button } from "@aws-amplify/ui-react";

import './header.css'
import { signOut } from 'aws-amplify/auth';

const Header=()=>(
    <header className='header'>
        <nav>
            <ul className='nav-list'>
                <li id='header-bar-site-name'>HOSTEL MANAGEMENT SYSTEM</li>
                {/* <li><DropDownItem path={"/login"} text={"Login"}/></li> */}
                <li><DropDownItem path={"/home"} text={"Home"}/></li>
                <li><DropDownItem path={"/hostel"} text={"Hostels"}/></li>
                <li><DropDownItem path={"/room"} text={"View Rooms"}/></li>
                <li><DropDownItem path={"/booking"} text={"Booking"}/></li>
                <li><DropDownItem path={"/cancel"} text={"Cancel booking"}/></li>
                <li><Button onClick={signOut}>Sign Out</Button></li>
            </ul>
        </nav>
    </header>
);
export default Header;