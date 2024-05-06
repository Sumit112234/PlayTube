import react from 'react';
import { Link } from 'react-router-dom'

export default function RelatedVideosGrid({ RelatedVideos, Loading }) {

  // console.log(RelatedVideos)
  function calculateDuration(oldDate) {
    // console.log(oldDate)
    const timeDifference = Date.now() - new Date(oldDate);

    const units = [
      { interval: 1000 * 60 * 60 * 24 * 365, label: "year" },
      { interval: 1000 * 60 * 60 * 24 * 30, label: "month" },
      { interval: 1000 * 60 * 60 * 24 * 7, label: "week" },
      { interval: 1000 * 60 * 60 * 24, label: "day" },
      { interval: 1000 * 60 * 60, label: "hour" },
      { interval: 1000 * 60, label: "minute" },
    ];

    let time = "" ;


    for (const unit of units) {
      const interval = Math.floor(timeDifference / unit.interval);
      if (interval >= 1) {
         time = `${interval} ${unit.label}${interval === 1 ? "" : "s"}`;
         if(time === "54 years")
         {
            return "Today"
         }
         return time + " ago";
         
         
      }
    }
    // console.log("Time->  ", time)
      
      
    return "Less than a minute";
  }

  return      (
      <div className="right w-full flex flex-col sm:p-2 space-y-3 ">
        {RelatedVideos?.map((vedio, idx) => {
          return (
            <Link
              to={`/play/:${vedio?.id?.videoId}`}
              key={idx}
              className="recommendataion rounded-md h-72 sm:h-36 space-y-2 flex sm:flex-row flex-col "
            >
              <div className="sm:w-48 h-full sm:mr-3 rounded-lg overflow-hidden sm:hover:w-56">
                <img
                  src={
                    vedio?.snippet?.thumbnails?.high?.url
                      ? vedio?.snippet?.thumbnails?.high?.url
                      : vedio?.snippet?.thumbnails?.medium?.url
                  }
                  alt="image"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="desktop sm:flex hidden flex-col justify-between py-1 font-sm w-52 ">
                <p className="text-gray-700 font-semibold">
                  {(vedio?.snippet?.title).length > 37
                    ? (vedio?.snippet?.title).slice(0, 37) + "..."
                    : vedio?.snippet?.title}{" "}
                </p>
                <span className="text-gray-500 opacity-50 font-bold">
                  {vedio?.snippet?.channelTitle}{" "}

                </span>
                <p>
                  {
                    calculateDuration(vedio?.snippet?.publishTime
                    ) 
                    
                  }

                </p>
              </div>

              <div className="Mobile  sm:hidden  flex  space-x-2 font-sm ">
                <div className="logo  flex items-center w-fit  ">
                  <img
                    src={
                      vedio?.snippet?.thumbnails?.high?.url
                        ? vedio?.snippet?.thumbnails?.high?.url
                        : vedio?.snippet?.thumbnails?.medium?.url
                    }
                    alt="Image"
                    className="w-12 h-12 object-cover rounded-full"
                  />
                </div>
                <div className="flex flex-col w-full  justify-evenly">
                  <div className="title w-full">
                    <p className="text-gray-700 font-semibold">
                      {(vedio?.snippet?.title).length > 37
                        ? (vedio?.snippet?.title).slice(0, 37) + "..."
                        : vedio?.snippet?.title}{" "}
                    </p>
                  </div>
                  <div className="stats w-full flex space-x-2">
                    <span className="text-gray-500 opacity-50 font-bold ">
                      {vedio?.snippet?.snippet?.channelTitle}{" "}
                    </span>
                    <p>
                      {
                        calculateDuration(vedio?.snippet?.publishTime
                        ) 
                      }
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    )
}