


// src/components/Navbar.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { IoClose } from "react-icons/io5";
import { IoMenu } from "react-icons/io5";
import { HiOutlineChatAlt } from "react-icons/hi";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [Xtoggle, setXtoggle] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };


  const [tabs, setTabs] = useState("home")
  const apiCall = ()=>{
    console.log("hello ji")
  }


  return (




    <div className='main flex justify-between sm:h-24 h-16   bg-gradient-to-b from-green-100 to-green-400'>

      <div className='logo '>
        <img src='GarenLogo.png' className="sm:h-24 h-16 w-fit" alt='image' />
      </div>







      {/* for mobile */}
      <div className='block sm:hidden'>
        {Xtoggle ?
          <button onClick={() => setXtoggle(!Xtoggle)} className='icon h-fit mr-3 mt-3 bg-green-400'>
            <IoClose className='text-3xl ' />

          </button>
          :
          <button onClick={() => setXtoggle(!Xtoggle)} className='icon h-fit mr-3 mt-3 bg-green-400'>

            <IoMenu className='text-3xl ' />

          </button>
        }

        {Xtoggle && (
          <div className="absolute cursor-pointer flex flex-col top-10 right-10 mt-2 w-fit  bg-white shadow-lg rounded-md border border-gray-200">

            <Link to='/' className="px-4  py-2 hover:bg-gray-400 cursor-pointer">Home</Link>
            <Link to='/about' className="px-4  py-2 hover:bg-gray-400 cursor-pointer">About Us</Link>
            <Link to='/askfordoubt' className="px-4  py-2 hover:bg-gray-400 cursor-pointer">askfordoubt</Link>

          </div>
        )}
      </div>

      <div className=" hidden sm:block text-sm font-medium text-center w-[80%] mt-5 text-gray-500 border-b border-gray-200 ">
        <ul className="flex space-x-16 justify-end mr-5 font-semibold">
          <Link to='/' className="me-2">

            <button onClick={() => setTabs("home")} className={`inline-block p-4 ${tabs === 'home' ? "text-blue-600  border-blue-600 active" : "border-transparent hover:text-gray-600  hover:border-gray-300"} border-b-2 rounded-t-lg `} aria-current="page">Home</button>
          </Link >
          <Link to='/about' className="me-2">

            <button onClick={() => {setTabs("About") ;apiCall()}} className={`inline-block p-4 ${tabs === 'About' ? "text-blue-600  border-blue-600 active" : "border-transparent hover:text-gray-600  hover:border-gray-300"} border-b-2 rounded-t-lg `} aria-current="page">About us</button>
          </Link >


          <Link to='/chat' className='mt-2 flex justify-center items-center space-x-2 text-white bg-gradient-to-r from-red-300 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2'>
          <HiOutlineChatAlt className='text-xl' />
          <div>Chat</div>
          
            {/* <button className='bg-red-300 hover:bg-red-500 px-2 py-4'>Chat</button> */}
          </Link>

          <div className="relative drop mt-3">
            <button
              onClick={toggleDropdown}
              className="bg-green-300 hover:bg-green-500 focus:bg-green-500 text-white px-4 py-2 rounded focus:outline-none focus:ring focus:ring-blue-300"
            >
              Dropdown
            </button>
            {isOpen && (
              <div className="absolute cursor-pointer flex flex-col top-full -left-10 mt-2 w-fit  bg-white shadow-lg rounded-md border border-gray-200">

                <Link to='/detail/rose' className="px-4  py-2 hover:bg-gray-400 cursor-pointer">Rose</Link>
                <Link to='/detail/rose' className="px-4  py-2 hover:bg-gray-400 cursor-pointer">Tulsi</Link>
                <Link to='/detail/rose' className="px-4  py-2 hover:bg-gray-400 cursor-pointer">Money Plant</Link>

              </div>
            )}
          </div>



        </ul>
      </div>



    </div>


  )


  // return (
  //   <nav className="navbar">
  //     <Link to="/" className="nav-link">
  //       Home
  //     </Link>
  //     <Link to="/AskFromGaren" className="nav-link">
  //       Ask From Garen
  //     </Link>
  //     <Link to="/about" className="nav-link">
  //       About
  //     </Link>

  //   </nav>
  // );
};

export default Navbar;
