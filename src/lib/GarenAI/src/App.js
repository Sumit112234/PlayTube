// src/App.js
import React from 'react';
// import './style.css'; // Import your external CSS file
// import ChatArea from './components/ChatArea';
import ChatArea from './components/ChatArea';
import Header from './components/Header';
import Navbar from './components/Navbar';
import { BrowserRouter } from 'react-router-dom';
import { Routes,Route } from 'react-router-dom';
import Home from './components/Home';
import About from './components/About';
import Details from './components/DetailsPage';


function App() {
    return (
<>
<BrowserRouter>
        <div className="">
        <Header/>
<Routes>
           <Route  path='/' element = {<Home/>}/>
           <Route path='/about' element = {<About/>}/>
           <Route path='/detail/:id' element={<Details />}/>
           <Route path='/chat' element={<ChatArea/>}/>
           

</Routes>
        </div>
</BrowserRouter>
            
</>
    );
}

export default App;
