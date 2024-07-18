import React from 'react'
import { BrowserRouter, Routes, Route} from "react-router-dom";
import Home from "./AppPages/home";
import Booking from "./AppPages/booking";
import Cancel from "./AppPages/cancelBooking";
import Hostel from "./AppPages/hostel";
import Room from "./AppPages/room";    
import NoPage from "./AppPages/noPage";
// import Login from "./pages/login";
// import Header from './components/header';
import './App.css'

import "@aws-amplify/ui-react/styles.css";
import {
  withAuthenticator,
  Button,
  Heading,
  Image,
  View,
  Card,
} from "@aws-amplify/ui-react";

function App({ signOut }){
    return (
        <BrowserRouter>
        <main>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="home" element={<Home />} />
                <Route path="booking" element={<Booking />} />
                <Route path="cancel" element={<Cancel />} />
                <Route path="hostel" element={<Hostel />} />
                <Route path="room" element={<Room />} />
                <Route path = "*" element = {<NoPage/>}/>
            </Routes>
        </main>
        </BrowserRouter>
      );
}
export default withAuthenticator(App);


// function App({ signOut }) {
//     return (
//       <View className="App">
//         <Card>
//           <Image src={logo} className="App-logo" alt="logo" />
//           <Heading level={1}>We now have Auth!</Heading>
//         </Card>
//         <Button onClick={signOut}>Sign Out</Button>
//       </View>
//     );
//   }