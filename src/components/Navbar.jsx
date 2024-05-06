import { Fragment, useState, useEffect } from 'react'

import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { LuSearch } from "react-icons/lu";
import { FaMicrophone } from "react-icons/fa";
import { BiSearchAlt2 } from "react-icons/bi";
import { IoMicSharp } from "react-icons/io5";
import { Link, useNavigate } from 'react-router-dom';
import { FaSquareXmark } from "react-icons/fa6";

// const navigation = [
//   { name: 'Dashboard', href: '#', current: true },
//   { name: 'Team', href: '#', current: false },
//   { name: 'Projects', href: '#', current: false },
//   { name: 'Calendar', href: '#', current: false },
// ]


function classNames(...classes) { 
  return classes.filter(Boolean).join(' ')
}

export default function Navbar({ setselectedCategory, setMic }) {



  let navigate = useNavigate();
  const [searchValue, setsearchValue] = useState('');

  const [transcript, setTranscript] = useState('')
  const [mobileSearch, allowMobileSearch] = useState(false)

  const [selectedImage, setSelectedImage] = useState("https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80");

  const changePic = (event) => {





    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      setSelectedImage(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };



 
  const submitInput = (e) => {
    allowMobileSearch(false)

    
    navigate('/')
    setselectedCategory(searchValue);
    setsearchValue("")
    
  }

  function startListening() {

    if (typeof window === 'undefined') {
      alert("There is no support for speech!");
    }
    else if (!window.webkitSpeechRecognition) {
      alert("Sorry! Your PC doesn't support for speech.")
    }
    else {
      const recognition = new window.webkitSpeechRecognition();
      let speech = "";

      recognition.start();

      recognition.onstart = () => {
        // console.log('Recognition started');
      };

      recognition.onresult = (event) => {
        speech = event.results[0][0].transcript;
        setsearchValue(event.results[0][0].transcript)
      };

      recognition.onerror = (event) => {
        console.error('Recognition error:', event.error);
      };

      recognition.onend = () => {
        // console.log('Recognition ended');
        toggleMic(0);
        setselectedCategory(speech);

      };
    }
  }

  const toggleMic = (flag) => {
    if (flag) {
      document.getElementById('cross1').classList.remove('none');
      document.getElementById('mic1').classList.remove('none');
      setMic("ON");
      startListening();
    }
    else {
      document.getElementById('cross1').classList.add('none');
      document.getElementById('mic1').classList.add('none');
      setMic("OFF");

    }

  }

  return (
    <Disclosure as="nav" className="bg-gray-800">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8   ">
            <div className="relative flex h-16 items-center justify-between ">
              {/* <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
               
                <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div> */}
              <div className="flex w-full items-center   justify-between">
                <Link to='/' className="flex flex-shrink-0 items-center">
                  <img
                    className="h-8 w-auto"
                    src="Playtubelogo.webp"
                    alt="PLAYTUBE" />
                  <span className="font-extrabold text-white">PLAY-TUBE</span>
                </Link>


                {/* for Mobile */}
                <form onSubmit={(e) => { e.preventDefault(); (searchValue !== "" && submitInput() )}} className="sm:hidden mr-4">
                  <button onClick={() => { allowMobileSearch(!mobileSearch) }}><BiSearchAlt2 className="h-8 w-8 text-white font-bold rounded-full" /></button>

                  {mobileSearch && <div className='absolute top-2 text-center left-0 w-full h-[100vh] bg-black'>
                    <input type="text" onChange={(e) => setsearchValue(e.target.value)} value={searchValue} className='border bg-gray-500 text-white  border-red-500 rounded-md mx-2 py-3 focus:border-red-800   w-[90%] px-5 mt-6 shadow-lg' placeholder='search...' />
                    <button onClick={() => { allowMobileSearch(!mobileSearch) }}><FaSquareXmark className='absolute top-1 right-1 hover:bg-red-600 bg-red-400  text-2xl' /></button>
                  </div>}

                </form>



                <form onSubmit={(e) => { e.preventDefault(); submitInput() }} className="input sm:w-[55%] sm:flex hidden">
                  <input type="text" onChange={(e) => setsearchValue(e.target.value)} value={searchValue} className='border  border-red-500 rounded-l-full h-10 focus:border-red-800   w-full px-5 shadow-lg' placeholder='search...' />
                  <LuSearch onClick={() => { setselectedCategory(searchValue); setsearchValue(""); submitInput() }} className=' text-sm p-2 hover:bg-red-300 w-12 h-10 font-bold bg-white  rounded-r-full  border-red-500' />
                  <FaMicrophone onClick={() => toggleMic(1)} className='ml-8  rounded-full bg-red-400 hover:bg-red-500 p-1 w-9 h-9 text-white' />
                </form>

                {/* for Mic */}

                <button id="cross1" onClick={() => toggleMic(0)} className="absolute z-50 top-[16.5rem] left-[47.5rem] text-xl p-1 bg-red-300 hover:bg-red-500 none" type="button">X</button>
                <div id="mic1" className="mic z-40 h-48 w-60 bg-white rounded-md shadow-xl absolute top-[16rem] left-[34rem] flex justify-center items-center none">
                  <div className=' top-9 flex justify-center items-center w-10 h-10 rounded-full bg-red-300  speak-container'>
                    <IoMicSharp className='text-4xl text-red-700' />
                    <p>Speak</p>
                  </div>
                </div>


                {/* <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4">
                    {navigation.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className={classNames(
                          item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                          'rounded-md px-3 py-2 text-sm font-medium'
                        )}
                        aria-current={item.current ? 'page' : undefined}
                      >
                        {item.name}
                      </a>
                    ))}
                  </div>
                </div> */}

                <div className="absolute  hidden sm:flex inset-y-0 right-0  items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">



                  <Menu as="div" className="relative ml-3  ">
                    <div>
                      <Menu.Button className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                        <span className="absolute -inset-1.5" />
                        <span className="sr-only">Open user menu</span>

                        {selectedImage ? (
                          <div>
                            <img src={selectedImage} alt="Selected" className="h-8 w-8 rounded-full" />
                          </div>
                        ) : (<img
                          className="h-8 w-8 rounded-full"
                          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                          alt=""
                        />)}
                      </Menu.Button>
                    </div>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="absolute text-white bg-black top-[8rem] right-[26rem] z-10 mt-2 w-[26rem] h-[28rem]  rounded-md  py-6 px-3 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <Menu.Item>
                          {({ active }) => (
                            <div className='w-full flex flex-col justify-center items-center spaxe-y-2'>
                              <img
                                id="imgId"
                                className="h-20 w-20 rounded-full"
                                src={selectedImage}
                                alt="No Image"

                              />
                              <input onChange={() => changePic()} type="file" id='fileData' alt="" />
                            </div>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              onClick={() => changePic()}

                              className={classNames(active ? 'bg-gray-100' : '', 'w-full text-start px-4 py-2 text-sm text-gray-700')}
                            >
                              Change Pic

                            </button>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <div

                              className={classNames(active ? 'bg-gray-100' : '', 'block h-50 w-50 bg-black text-white px-4 py-2 text-sm ')}
                            >
                              Settings
                            </div>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <a
                              href="#"
                              className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                            >
                              Sign out
                            </a>
                          )}
                        </Menu.Item>
                      </Menu.Items>
                    </Transition>
                  </Menu>


                </div>

              </div>
            </div>
          </div>

          {/* <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                    'block rounded-md px-3 py-2 text-base font-medium'
                  )}
                  aria-current={item.current ? 'page' : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel> */}

        </>
      )}
    </Disclosure>
  )
}
