import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import { useParams, Link } from "react-router-dom";
import fetchApi from "./Api";
import CommentsSection from "./sub-components/CommentsSection";
import SubVideos from "./sub-components/SubVideos";
import fetchApi2 from "./FetchData";
import RelatedVideosGrid from "./sub-components/RelatedVideosGrid";
import InfiniteScroll from 'react-infinite-scroller';
import ReactLoading from "react-loading";

const VedioPlayer = () => {
  let { id } = useParams();
  const [videoDetail , setvideoDetail ] = useState(null);
  const [RelatedVideos, setRelatedVideos] = useState(null);
  const [showMore, setShowMore] = useState(false);
  const [Loading, setLoading] = useState(false);
  const [Loading2, setLoading2] = useState(false);

  
  const [hasMore, setHasMore] = useState(true);
   
  
    const loadMoreItems = page => {
        console.log("load More Items")
        setHasMore(false)
         // setting Related Videos
        fetchData(`search?relatedToVideoId=${id.slice(1)}&part=id%2Csnippet&type=video&maxResults=50&page=${page}`,true)
        .then(()=>{
          
          setHasMore(true)
          console.log(RelatedVideos?.length , " length")
          return true
        })

        
    //   setTimeout(()=>{
    //     setItems(prevItems => [...prevItems, 0, 3, 5, 3, 42, 32, 2]);

    //   },1500)
    }; 

  function addBreakFunc(text) {

    // return text;
    // console.log(text)
    let data = text ? text.length === 0 ? text : text.split('\n').map((line, index) => <div key={index}>{line}</div>) : " ";
    return data;
    // let pattern = /^https:\/\//;

    //   // Iterate through the strings
    //   for (let i = 0; i < text.length; i++) {
    //       // Check if the string starts with "https://"
    //       if (pattern.test(text[i])) {
    //           // Add "\n" after the match
    //           text[i] += "\n";
    //       }
    //   }
    // text.forEach(string => console.log(string));
  }
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
  function ShortNumber(number) {
    if (number >= 1000000) {
      return (number / 1000000).toFixed(1) + "M";
    } else if (number >= 1000) {
      return (number / 1000).toFixed(1) + "k";
    } else {
      return number.toString();
    }
  }
  function formatNumber(num) {
    return new Intl.NumberFormat("en-IN").format(num);
  }

  let vidData = null;
  const fetchData = async (url, isInfinite) => {
    
    
    if(isInfinite)
    {      
      let response = await fetchApi2(url);
      setRelatedVideos((pre)=> [...RelatedVideos, ...response?.items ])
    }
    else{
          setLoading(true)
          let response = await fetchApi2(url);
          setRelatedVideos(response?.items);
          setLoading(false)
      }


  }

  useEffect(() => {


    try {
      setLoading2(true);
      if(!vidData)
      {

      
          fetchApi(`video/details?video_id=${id.slice(1)}`, "", "v2")
            .then((details) => {
              // console.log(details.data);
              // if(vidData.length !== 0)
              // console.log(vidData.length)
              setLoading2(false);


              setvideoDetail(details.data)
              vidData = details;
              // console.log("vidData",vidData)
              // vidData = vidData?.length === 0 ? details.data : setvideoDetail(vidData);

              // setvideoDetail((preDetail)=> [preDetail ?? {...preDetail},details.data ?? []]);
            })




          // setting Related Videos
            fetchData(`search?relatedToVideoId=${id.slice(1)}&part=id%2Csnippet&type=video&maxResults=50`)
      }

    }
    catch (e) {
      console.log("error ", e)
    }





  }, [id]);

  return (
    <div>
      <div className="main flex w-full sm:mx-2 sm:px-8 sm:py-2 sm:space-x-6  h-fit flex-col sm:flex-row ">



      
        {Loading2 ? ( <div className="skeleton  sm:w-2/3 w-full">
            <div role="status" className="flex items-center mb-2 justify-center h-[12rem] sm:h-[28rem] bg-gray-300 rounded-lg animate-pulse dark:bg-gray-700">
              <svg className="w-10 h-10 text-gray-200 dark:text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 20">
                <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.98 2.98 0 0 0 .13 5H5Z" />
                <path d="M14.066 0H7v5a2 2 0 0 1-2 2H0v11a1.97 1.97 0 0 0 1.934 2h12.132A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.934-2ZM9 13a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-2a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2Zm4 .382a1 1 0 0 1-1.447.894L10 13v-2l1.553-1.276a1 1 0 0 1 1.447.894v2.764Z" />
              </svg>
              <span className="sr-only">Loading...</span>
            </div>


            <div role="status" className="max-w-sm animate-pulse">
              <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
              <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px] mb-2.5"></div>
              <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
              <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[330px] mb-2.5"></div>
              <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[300px] mb-2.5"></div>
              <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px]"></div>
              <span className="sr-only">Loading...</span>
            </div>
          </div>) 

          
         
          :
          (<div className="left flex flex-col sm:w-2/3 w-full xs:sticky">
          <div className="video bg-gray-800 h-72 sm:h-[28rem] rounded-md">

            <iframe width="99%" height="99%" src={`https://www.youtube.com/embed/${id.slice(1)}?autoplay=1`} title="The Hindu Editorial Analysis | The Hindu Vocabulary by Santosh Ray | Vocabulary for Bank &amp; SSC Exams" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>



            {/* <ReactPlayer
              className="react-player"
              playing={true}
              url={`https://www.youtube.com/watch?v=${id.slice(1)}`}
              width="100%"
              height="100%"
            /> */}

          </div>


          <div className="details bg-gray-300 w-full h-fit ">
            <h1 className=" text-md sm:text-xl m-2 font-bold">
              {videoDetail?.title}
            </h1>

{          videoDetail ?  <div className="  w-full mx-2 flex sm:flex-row flex-col ">
              <div className="left  w-72 max-w-96 flex items-center mb-3 space-x-3 ">
               <Link to={`http://localhost:3000/channelDetail/:${videoDetail?.thumbnails[1]?.url}`}> <img
                  src={videoDetail?.thumbnails[1]?.url}
                  alt="Image"
                  className="w-12 h-12 object-cover rounded-full"
                /></Link>

                <p className="font-semibold opacity-70 w-36 max-w-64 ">
                  {videoDetail?.author}
                </p>
              </div>
            

              <div className="right flex justify-start sm:justify-end items-center  px-2 space-x-3 w-full font-semibold text-md ">
                <p>
                  {
                    formatNumber(videoDetail?.number_of_views) + " "
                  }
                  views
                </p>
                <div className="font-bold mx-2">l</div>
                <p>
                  {calculateDuration(videoDetail?.published_time) + " ago "}
                </p>
              </div>
            </div> : <div className="text-red-300 mx-4 text-xl">There is Some error. Please refresh.</div>}

            {/* Before Comments Part */}

            {videoDetail?.description && <div id="desc" className={`bg-gray-200 rounded-md m-2 p-2 text-sm ${(showMore) ? "h-fit" : " h-6 sm:h-24 overflow-hidden"}`}>
              
              {addBreakFunc( videoDetail?.description)}
            </div>}
           { videoDetail?.description && <div>
              <button className="ml-2 text-sm font-semibold px-1 hover:bg-gray-500" onClick={() => setShowMore(!showMore)}>{(showMore) ? "show less" : "show more..."}</button>
            
            </div>}


            <CommentsSection />
            {/* <SubVideos/> */}

          </div>
</div>)}


        <div className="sm:w-1/3 w-full">
          {Loading ? (<div className="flex flex-col w-full space-y-2  ">

            {[1, 2, 3, 4, 5].map((e) => {
              return (
                <div role="status" key={e} className="space-y-8 animate-pulse md:space-y-0 md:space-x-8 rtl:space-x-reverse md:flex md:items-center">
                  <div className="flex items-center justify-center w-full h-48 bg-gray-300 rounded sm:w-96 dark:bg-gray-700">
                    <svg className="w-10 h-10 text-gray-200 dark:text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                      <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
                    </svg>
                  </div>
                  <div className="w-full">
                    <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
                    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[480px] mb-2.5"></div>
                    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
                    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[440px] mb-2.5"></div>
                    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[460px] mb-2.5"></div>
                    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px]"></div>
                  </div>
                  <span className="sr-only">Loading...</span>
                </div>)
            })}

          </div>)
            :

            (<div className='RVideos '>
              <InfiniteScroll
                className=' '
                pageStart={0}
                loadMore={RelatedVideos?.length > 0 && loadMoreItems}
                hasMore={hasMore}
                loader={<ReactLoading type={'balls'} color={'white'} height={'5%'} width={'5%'} />}
              >
                
                <RelatedVideosGrid RelatedVideos={RelatedVideos} Loading={Loading} />
                
              </InfiniteScroll>

            </div>)
          }
        </div>



      </div>
    </div>
  );
};

export default VedioPlayer;
