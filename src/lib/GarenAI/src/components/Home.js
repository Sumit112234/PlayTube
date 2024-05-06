import React from 'react'
import { LuSearch } from "react-icons/lu";
import {Link} from 'react-router-dom'
import { HiOutlineChatAlt } from "react-icons/hi";

const Home = () => {
  const handelSearch = ()=>{

  }

  const RecommendationData = [
    {"name": "Tulsi", "url" : 'https://w.forfun.com/fetch/d5/d5015f825822f074879627bac3d1e644.jpeg'},
    {"name": "Neem", "url" : 'https://w.forfun.com/fetch/d5/d5015f825822f074879627bac3d1e644.jpeg'},
    {"name": "Money Plant", "url" : 'https://w.forfun.com/fetch/d5/d5015f825822f074879627bac3d1e644.jpeg'},
    {"name": "Coriender", "url" : 'https://w.forfun.com/fetch/d5/d5015f825822f074879627bac3d1e644.jpeg'},
   
  ]
  
  return (
//    <div  className=' flex items-center justify-center h-[90vh] w-full bg-gradient-to-b from-green-100 to-green-400 ' >
      
//       <div  id='image' className='flex justify-between flex-col items-center space-y-10  w-full'>

//       <div className='mt-[9rem]'>
//           GAREN
//         </div>
     
      
//       </div>
//    </div>

  <div className='background-home '>
  <div className="container-home">
        <img src="GarenLogo.png"  alt="Garen Logo" className="hidden sm:block garen-logo"/>
        {/* <input type="text" id="searchbar" placeholder="Search Garen or Type Plant Name"/> */}
        <form className="w-full sm:w-1/3 p-3 flex">
        <input type="text" className='py-3 px-4 rounded-l-full w-full ' placeholder='Search for Plants' />
        
        <div className='w-14 h-12'>

            <LuSearch onClick={(e)=>{e.preventDefault();  handelSearch()}} className='text-sm h-12 p-3 w-12  font-bold hover:bg-gray-400 bg-white  rounded-r-full  border-red-500' />

        </div>

      </form>
        <button type="button" value="Garen Search" id="search_button">Garen Search</button>


        <Link to='/chat' className='sm:hidden mt-2 flex justify-center items-center space-x-2 text-white bg-gradient-to-r from-red-300 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2'>
          <HiOutlineChatAlt className='text-xl' />
          <div>Chat</div>
          
            {/* <button className='bg-red-300 hover:bg-red-500 px-2 py-4'>Chat</button> */}
          </Link>
        

        <div className="recommendations w-[45%] hidden  space-x-2 sm:flex flex-wrap justify-center mt-4 ">
        {RecommendationData.map((plant)=>{
          return (

            <a to="/details/3" className='h-28 w-28 bg-green-300 hover:bg-green-400 rounded-md flex flex-col justify-center items-center'>
                <img className='rounded-full w-12 h-12' src={plant.url} alt="hello" />
                <p className='font-serif font-semibold'>{plant.name}</p>        
            </a>
      )})}
       
      </div>


    </div>
    
 </div>

  )
}

export default Home;