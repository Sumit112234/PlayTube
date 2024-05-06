import React from 'react'
import { Link } from 'react-router-dom'

const VedioCard = ({vedio}) => {


  function ShortNumber(number) {

    if (number >= 1000000) {
      return (number / 1000000).toFixed(1) + "M";
    } else if (number >= 1000) {
      return (number / 1000).toFixed(1) + "k";
    } else {
      return number.toString();
    }
  }
    // console.log(videoId, high, title)
  return (
            <Link  to={`/play/:${vedio.video_id}`}>
            
            <div  className="group  bg-black h-80 rounded-lg  ">
            <div className=" bg-black overflow-hidden rounded-lg bg-graye-200 lg:aspect-none group-hover:opacity-75 ">
            <img
                src={vedio?.thumbnails[1]?.url ?? vedio?.thumbnails[0]?.url}
                alt={vedio.title}
                className="max-h-48  w-full object-cover object-center lg:h-full lg:w-full"
            />
               
               <div className='badge text-end'>
                  <p className = "  text-sm font-bold  inline bg-black text-white z-20 px-1 relative bottom-7 mx-2  rounded-md">{vedio.video_length}</p>
               </div>
            </div>
            
            <div className="details flex  justify-between p-1">

                <div className="logo h-24 w-12  mr-3 ">
                <img className="rounded-full h-12 w-12" src={vedio?.thumbnails[1]?.url ?? vedio?.thumbnails[0]?.url} alt="" srcSet="" />
                </div>


                <div className="innerDetails flex flex-col justify-center space-y-2 ">
                <h1 className="text-xl font-serif font-normal" >{vedio.title.length > 40 ? vedio.title.slice(0,40)+"..." :vedio.title}</h1>
                
                <span className="font-sm font-light hidden sm:block text-gray-400">{vedio.author}</span>

                
                <div className="flex space-x-2">
                    <p className="font-sm text-gray-500">{ShortNumber(vedio.number_of_views)} views</p>
                    <p className="font-sm text-gray-500">{vedio.published_time}</p>
                </div>
                </div>
                
            </div>
        </div>

        </Link>
  )
}

export default VedioCard


// const VedioCard = ({vedio}) => {

//     function calculateDuration(oldDate) {
//         const timeDifference = Date.now() - new Date(oldDate);
    
//         const units = [
//           { interval: 1000 * 60 * 60 * 24 * 365, label: "year" },
//           { interval: 1000 * 60 * 60 * 24 * 30, label: "month" },
//           { interval: 1000 * 60 * 60 * 24 * 7, label: "week" },
//           { interval: 1000 * 60 * 60 * 24, label: "day" },
//           { interval: 1000 * 60 * 60, label: "hour" },
//           { interval: 1000 * 60, label: "minute" },
//         ];
    
//         for (const unit of units) {
//           const interval = Math.floor(timeDifference / unit.interval);
//           if (interval >= 1) {
//             return `${interval} ${unit.label}${interval === 1 ? "" : "s"}`;
//           }
//         }
    
//         return "Less than a minute";
//       }
//     const { id : {videoId} , snippet : {thumbnails : {high}, title, channelTitle, publishTime}} = vedio;

//     // console.log(videoId, high, title)
//   return (
//             <Link to={`/play/:${videoId}`}>
            
//             <div key={videoId} className="group  bg-black h-72 rounded-lg  ">
//             <div className=" bg-black overflow-hidden rounded-lg bg-graye-200 lg:aspect-none group-hover:opacity-75 ">
//             <img
//                 src={high.url}
//                 alt={title}
//                 className="max-h-36 w-full object-cover object-center lg:h-full lg:w-full"
//             />
//             </div>
            
//             <div className="details flex  justify-between p-1">

//                 <div className="logo h-8 w-10 mr-3 ">
//                 <img className="rounded-full" src="https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg" alt="" srcSet="" />
//                 </div>


//                 <div className="innerDetails flex flex-col justify-center space-y-2 ">
//                 <h1 className="text-xl font-serif font-normal" >{title.length > 40 ? title.slice(0,40)+"..." :title}</h1>
                
//                 <span className="font-sm font-light text-gray-400">{channelTitle}</span>

                
//                 <div className="flex">
//                     {/* <p className="font-sm text-gray-500">views</p> */}
//                     <p className="font-sm text-gray-500">{calculateDuration(publishTime)} ago</p>
//                 </div>
//                 </div>
                
//             </div>
//         </div>

//         </Link>
//   )
// }

// export default VedioCard
