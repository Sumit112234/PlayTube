import VedioCard from "./VedioCard"


  
  export default function DataGird({vedios,mic, gridLayout}) {
    return (
      <div className={` bg-black ${mic==="ON" ? "opacity-40" : ""}`}>
        <div className="w-full bg-balck p-2">
            
          {gridLayout === "grid-cols-3" && <div className="mt-2 grid grid-cols-1 gap-x-2 gap-y-8  lg:grid-cols-3 text-white">
            {vedios.map((vedio,idx) => (
             <VedioCard key={idx} vedio = {vedio}/>
            ))}
          </div>}
          {gridLayout === "grid-cols-4" && <div className="mt-2 grid grid-cols-1 gap-x-2 gap-y-8  lg:grid-cols-4 text-white">
            {vedios.map((vedio,idx) => (
             <VedioCard key={idx} vedio = {vedio}/>
            ))}
          </div>}
          {gridLayout === "grid-cols-2" && <div className="mt-2 grid grid-cols-1 gap-x-2 gap-y-8  lg:grid-cols-2 text-white">
            {vedios.map((vedio,idx) => (
             <VedioCard key={idx} vedio = {vedio}/>
            ))}
          </div>}
        </div>
      </div>
    )
        
    
  }
  