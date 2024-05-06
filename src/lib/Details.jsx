import { useState } from 'react'

export default function Details() {
    const [tabs, setTabs] = useState("Details")
    return (
        <div className="h-fit">
            <div className="img h-[40%] w-full flex flex-col items-center bg-gradient-to-b from-green-100 to-green-400 ">
                <div className='w-full h-[25%] text-center'>

                    <img src="https://w.forfun.com/fetch/d5/d5015f825822f074879627bac3d1e644.jpeg" alt="no image"  className='w-[40%] h-full rounded-md mx-auto'/>
                </div>
                <div className='font-serif font-bold text-xl mt-3'>
                    Tulsi
                </div>
            </div>

            <div className="content ">


                <div className=" mx-auto  w-[70%] text-sm font-medium text-center text-gray-500 border-b border-gray-200 ">
                    <ul className="flex justify-evenly">
                        <li className="me-2">
                          
                            <button onClick={()=>setTabs("Details")}  className={`inline-block p-4 ${tabs === 'Details' ? "text-blue-600  border-blue-600 active" : "border-transparent hover:text-gray-600  hover:border-gray-300"} border-b-2 rounded-t-lg ` }   aria-current="page">Details</button>
                        </li>
                        <li className="me-2">
                          
                            <button onClick={()=>setTabs("Benifits")}  className={`inline-block p-4 ${tabs === 'Benifits' ? "text-blue-600  border-blue-600 active" : "border-transparent hover:text-gray-600  hover:border-gray-300"} border-b-2 rounded-t-lg ` }   aria-current="page">Benifits</button>
                        </li>
                        <li className="me-2">
                          
                            <button onClick={()=>setTabs("Weather Condition")}  className={`inline-block p-4 ${tabs === 'Weather Condition' ? "text-blue-600  border-blue-600 active" : "border-transparent hover:text-gray-600  hover:border-gray-300"} border-b-2 rounded-t-lg ` }   aria-current="page">Weather Condition</button>
                        </li>
                        <li className="me-2">
                          
                            <button onClick={()=>setTabs("Ways to grow")}  className={`inline-block p-4 ${tabs === 'Ways to grow' ? "text-blue-600  border-blue-600 active" : "border-transparent hover:text-gray-600  hover:border-gray-300"} border-b-2 rounded-t-lg ` }   aria-current="page">Ways to grow</button>
                        </li>
                        
                       
                    </ul>
                </div>

                <div className="details">
                    In Complete!!!!!!!!!!
                </div>

            </div>
        </div>
    )
}