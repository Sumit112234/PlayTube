import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import ReactLoading from "react-loading";
import fetchApi from './Api';


const WorkingonIt = () => {

    const [items, setItems] = useState([0,1,2,3,4,5,6,7,5,43,2,4,3,4,56,7,5,4,3,5,6,78,8,9,6,5,3,2,5,6,7]);
    const [hasMore, setHasMore] = useState(true);
    const [page, setPage] = useState(1);
    const [VedioArr, setVedioArr] = useState([]);
  
  



  

    const loadMoreItems = page => {
        console.log("load More Items")
        setHasMore(false)
        fetchApi('search/?part=snippet','&country=in&query=dance'+`&page=${page}`)
        .then((videos)=>{
          
          console.log(videos.data.videos)
          setVedioArr(prev => [...prev, ...videos.data.videos]);
          setHasMore(true)
          console.log(VedioArr.length , " length")
          return true
        })
    //   setTimeout(()=>{
    //     setItems(prevItems => [...prevItems, 0, 3, 5, 3, 42, 32, 2]);

    //   },1500)
    };

    
  return (
    <>

   
        
          
    <div className='h-[90vh] w-[100vw] flex items-center flex-col  justify-center text-3xl font-bold bg-red-300 text-white font-cursive'>
        <div className="w-[24rem] p-2 text-center ">
            Sorry for inconvenience!
            We are working on it.
        </div>
        <Link to='/' className='p-3  rounded-md w-fit font-bold text-xl hover:bg-gray-600 mt-4 bg-gray-400 text-red-500'>&lt;-  Back</Link>

    </div>

    </>
  )
}

export default WorkingonIt