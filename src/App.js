import { useState } from 'react';
import './App.css';
import Home from './components/Home';
import Navbar from './components/Navbar';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import VedioPlayer from './components/VedioPlayer';
import WorkingonIt from './components/WorkingonIt';
import { HomeIcon } from '@heroicons/react/20/solid';



function App() {

  const [selectedCategory, setselectedCategory] = useState("All");
  
  const [Mic , setMic] = useState("OFF");

  

  return (
   <>
   <BrowserRouter>
      <Navbar selectedCategory={selectedCategory} setselectedCategory={setselectedCategory} setMic={setMic}/>
      
      
      <Routes>
          <Route path='/' element={<Home selectedCategory={selectedCategory} setselectedCategory={setselectedCategory} mic={Mic}/>}></Route>

          <Route path='/play/:id' element={<VedioPlayer />}></Route>
          <Route path='/home' element={<WorkingonIt/>}></Route>
          <Route path='/shorts' element={<WorkingonIt/>}></Route>
          <Route path='/playlist' element={<WorkingonIt/>}></Route>
          <Route path='/about' element={<WorkingonIt/>}></Route>
   
          <Route path='/channelDetail/:id' element={<WorkingonIt/>}></Route>
          
      </Routes>

      
   </BrowserRouter>
   </>
   
   
  );
}

export default App;
