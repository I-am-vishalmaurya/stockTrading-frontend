import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Login from "./components/Login";
import { Routes ,Route } from 'react-router-dom';
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";

function App(){
    return(
        <div className="App">
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="dashboard" element={<Dashboard />} />
            </Routes>
            
        </div>
    )
}

export default App;
