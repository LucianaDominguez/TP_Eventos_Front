import React from 'react';
import './App.css';
import Eventos from './components/Eventos';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Register from "./components/Register"
import Login from "./components/LogIn"
import DetailEvent from './components/DetailEvent';
import CreateEvent from './components/CreateEvent';
import EditEvent from './components/EditEvent';
import Locations from './components/Locations'; 
import CreateLocation from './components/CreateLocation';
import { AuthProvider } from "./context/AuthContext.jsx";




function App() {
  return (
    <>
    <AuthProvider>
    <BrowserRouter>
    <Routes>
      <Route path="/" element = {<Login/>}> </Route>
      <Route path="/register" element = {<Register/>}> </Route>
      <Route path="/events" element = {<Eventos/>}> </Route>
      <Route path="/event/:id" element={<DetailEvent />} />
      <Route path="/event/create" element={<CreateEvent />} />
      <Route path="/event/edit/:id" element={<EditEvent />} />
      <Route path="/event/locations" element={<Locations />} />
      <Route path="/event/locations/create" element={<CreateLocation />}></Route>


    </Routes>
    </BrowserRouter>
    </AuthProvider>


    </>
  );
}


export default App;

