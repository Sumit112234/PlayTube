import React, { useEffect, useState } from 'react'
import fetchApi from '../Api'
import { useParams } from "react-router-dom";
import fetchApi2 from '../FetchData';

const CommentsSection = ({commentsId}) => {

  let { id } = useParams();
  const [comments, setComments] = useState(null);
  
  const [commentsData, setCommentsData] = useState([]);
  const [showComment, setshowComment] = useState(false);
  
  function calculateDuration(oldDate) {

    
    const timeDifference = Date.now() - new Date(oldDate);

    const units = [
      { interval: 1000 * 60 * 60 * 24 * 365, label: "year" },
      { interval: 1000 * 60 * 60 * 24 * 30, label: "month" },
      { interval: 1000 * 60 * 60 * 24 * 7, label: "week" },
      { interval: 1000 * 60 * 60 * 24, label: "day" },
      { interval: 1000 * 60 * 60, label: "hour" },
      { interval: 1000 * 60, label: "minute" },
    ];

    for (const unit of units) {
      const interval = Math.floor(timeDifference / unit.interval);
      if (interval >= 1) {
        return `${interval} ${unit.label}${interval === 1 ? "" : "s"}`;
      }
    }

    return "Less than a minute";
  }

  
 
  
  const fetchData = async (start) => {
    try {
      // const details = await fetchApi(`commentThreads?videoId=${id.slice(1)}&maxResults=100`, "","v3");
      
      const details = await fetchApi2("commentThreads?part=snippet&",`videoId=${id.slice(1)}&maxResults=100`);
      // console.log(details)
      setCommentsData(details?.items);

      // // const details = await detailsResponse.json();
      // const Ids = [];
      // const comArr = [];

      // Ids.push(details);
      // for (let i = start; i < start + 2; i++) {
      //   const dataResponse = await fetchApi2(`comments?id=${details?.items[i]?.id}`, "");
      //   // const data = await dataResponse.json();
      //   comArr.push(dataResponse?.data?.items[0]?.snippet);
      //   setCommentsData((prevCommentsData) => [...prevCommentsData, dataResponse?.data?.items[0]?.snippet]);
      // }

      // console.log(comArr, commentsData);
      // // setCommentsData(comArr);
      // // setCommentsIds(Ids);

     
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

 


  useEffect(() => {
    // console.log('Component mounted');
    
    setTimeout(()=>{
      fetchData(0);
    },1500)
    
    return () => {
      // fetchData(0);
      // console.log('Component unmounted');
      // Perform cleanup if necessary
    };
  }, [id]);


  const [showComments, setShowComments] = useState(false);
  const [loading, setLoading] = useState(true);
  const Ids =[]
  const addComments = ()=>{
      let comArr = [];
    // setLoading(true);
        fetchApi(`commentThreads?videoId=${id.slice(1)}&maxResults=100`,"")
            .then((details)=>{
              
                Ids.push(details)
                    
                      for(let i = 0; i< 4; i++)
                      {

              
                              fetchApi(`comments?id=${details?.data?.items[i]?.id}`, "&part=snippet")
                                    .then((data)=>{
                                          comArr.push(data?.data?.items[0]?.snippet);
                                          // setCommentsData([...commentsData,data?.data?.items[0]?.snippet] )
                                      })
                        }
                            console.log(comArr);
                            setCommentsData(comArr);
                            setTimeout(()=>{
                                setLoading(false)
                            }, 1000);
                            // setCommentsIds(Ids)
                })
            setShowComments(!showComments)
  }


  return (
    

    
    <div className=" p-3 my-3 flex space-y-2 flex-col " >


           
      <div className=" text-md sm:text-xl font-bold text-start">{commentsData?.length ? ((commentsData?.length < 100) ? commentsData?.length  : "100+") + " Comments" : "Please reload for comments..."}  </div>
      {commentsData?.length && <button className='text-start text-sm  w-fit px-1 rounded-md hover:bg-gray-500' onClick={()=>setshowComment(!showComment)}>{showComment ? "Hide" : "Show"} </button>}
      
      {showComment && commentsData?.length > 0 && commentsData?.map((comment,idx)=>{
          return ( 
            
             <div key={idx} className="main flex space-x-2 my-2 shadow-lg">

            <div className="left   w-20  ">
                      <img
                        src={comment?.snippet?.topLevelComment?.snippet?.authorProfileImageUrl}
                        alt=""
                        className="w-12 h-12 object-cover rounded-full"
                      />
              </div>
              <div className="comments flex flex-col">

              <div className='flex  font-sm space-x-2 mb-2'>
                      <p className=" opacity-70 w-fit  font-bold ">

                        {comment?.snippet?.topLevelComment?.snippet?.authorDisplayName}
                      </p>

                      <p className='opacity-40 font-semibold'>{calculateDuration(comment?.snippet?.topLevelComment?.snippet?.publishedAt)}</p>

              </div>
              <div className="text font-bold text-md  w-3/4">
                  {comment?.snippet?.topLevelComment?.snippet?.textOriginal}
              </div>



                <div className="stats mt-2 ">
                  <p className='text-sm opacity-70'>{comment?.snippet?.topLevelComment?.snippet?.likeCount } Likes</p>
                </div>
            </div>
          </div>
          )

      })  }    
  
  
  

      
        
      </div> 
    
    
  )
}

export default CommentsSection
