import { Fragment, useEffect, useState } from 'react'
import { Dialog, Disclosure, Menu, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { ChevronDownIcon, FunnelIcon, MinusIcon, PlusIcon, Squares2X2Icon } from '@heroicons/react/20/solid'
import DataGrid from './videoGrid'
import fetchApi from './Api'
import CategoryButtons from './sub-components/CategoryButtons'
import { IoIosHome } from "react-icons/io";
import { SiYoutubeshorts } from "react-icons/si";
import { MdSubscriptions } from "react-icons/md";
import { RiPlayList2Fill } from "react-icons/ri";
import {Link } from 'react-router-dom'
import CardLoadingSkeletion from './sub-components/CardLoadingSkeleton'                   
import InfiniteScroll from 'react-infinite-scroller';
import ReactLoading from "react-loading";


export default function MainGrid({selectedCategory, setselectedCategory,mic}) {

  const sortOptions = [
    { name: '1 Hour'  ,func: (value)=>{setFilterQueries({"url":"&order_by=last_hour", "idx":1})}, current: false },
    { name: 'Today'  ,func: (value)=>{setFilterQueries({"url":"&order_by=today", "idx":2})}, current: false },
    { name: '1 Week'  ,func: (value)=>{setFilterQueries({"url":"&order_by=this_week", "idx":3})}, current: false },
    { name: '1 Month'  ,func: (value)=>{setFilterQueries({"url":"&order_by=this_month", "idx":4})}, current: false },
    { name: '1 year'  ,func: (value)=>{setFilterQueries({"url":"&order_by=this_year", "idx":5})}, current: false},
  ]



  const SidebarOptions = [
    { name: 'Most Popular'  ,func: (value)=>setselectedCategory(value), current: true },
    { name: 'Best Rating',func: (value)=>setselectedCategory(value), current: false },
    { name: 'Newest',func: (value)=>setselectedCategory(value), current: false },
    { name: 'Price: Low to High',func: (value)=>setselectedCategory(value), current: false },
    { name: 'Price: High to Low',func: (value)=>setselectedCategory(value), current: false },
  ]
  
  const subCategories = [
    { name: 'All',func: (value)=>setselectedCategory(value) },
    { name: 'Food',func: (value)=>setselectedCategory(value) },
    { name: 'CodeWithHarry',func: (value)=>setselectedCategory(value) },
    { name: 'Politics',func: (value)=>setselectedCategory(value) },
    { name: 'ReactJs',func: (value)=>setselectedCategory(value) },
    { name: 'Windows',func: (value)=>setselectedCategory(value) },
    { name: 'News',func: (value)=>setselectedCategory(value) },
    { name: 'Entertainment',func: (value)=>setselectedCategory(value) },
  ]

const filters = [
  {
    id: 'category',
    name: 'Category',
    options: [
      { value: 'new-arrivals', label: 'New Arrivals', checked: false },
      { value: 'sale', label: 'Sale', checked: false },
      { value: 'travel', label: 'Travel', checked: true },
      { value: 'organization', label: 'Organization', checked: false },
      { value: 'accessories', label: 'Accessories', checked: false },
    ],
  },
 
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

let layout = ['grid-cols-3', 'grid-cols-4', 'grid-cols-2']
const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
const [filterQueries, setFilterQueries] = useState({})
const [gridLayout, setGridLayout] = useState("grid-cols-3");

const [VedioArr, setVedioArr] = useState([])
const [Loading, setLoading] = useState(true)
const [page, setPage] = useState(1);
const changeLayout = ()=>{
    let idx = layout.findIndex((value)=> value === gridLayout);
    // console.log(gridLayout)
    // console.log(idx);
    if(idx === 2)
      idx = 0;
    else
      idx++;

    setGridLayout(layout[idx]);
    
}
  
  
  useEffect(()=>{
    // console.log("MainGrid" ,selectedCategory, setselectedCategory, mic)

    try{

    
    setLoading(true)
        fetchApi('search/?part=snippet','&country=in&query='+selectedCategory+(filterQueries.url ?? "")+ `&page=${page}`)
      .then((videos)=>{
        
        // console.log(videos.data.videos)
        setVedioArr(videos.data.videos);
        setLoading(false)
      })
    }
    catch(e)
    {
      console.log("e for error " , e);
    }
    
    
  },[selectedCategory, filterQueries, page])

  const [hasMore, setHasMore] = useState(true);
   
  
    const loadMoreItems = page => {
        // console.log("load More Items")
        setHasMore(false)
        fetchApi('search/?part=snippet&country=in&query='+selectedCategory+(filterQueries.url ?? "")+ `&page=${page}`)
        .then((videos)=>{
          
          // console.log(videos.data.videos)
          setVedioArr(prev => [...prev, ...videos.data.videos]);
          setTimeout(()=>{
            setHasMore(true)
            

            },5000)
          // console.log(VedioArr.length , " length")
          return true
        })
    
    }; 
 
  return (
    <div className="bg-white">
     <div>
        {/* Mobile filter dialog */}
        <Transition.Root show={mobileFiltersOpen} as={Fragment}>
          <Dialog as="div" className="relative z-40 lg:hidden" onClose={setMobileFiltersOpen}>
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black bg-opacity-25" />
            </Transition.Child>

            <div className="fixed inset-0 z-40 flex">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
                  <div className="flex items-center justify-between px-4">
                    <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                    <button
                      type="button"
                      className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                      onClick={() => setMobileFiltersOpen(false)}
                    >
                      <span className="sr-only">Close menu</span>
                      <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>

                  {/* Filters */}
                  <form onSubmit={(e)=>e.preventDefault()} className="mt-4 border-t border-gray-200">
                    <h3 className="sr-only">Categories</h3>
                    <ul role="list" className="px-2 py-3 font-medium text-gray-900">
                      {subCategories.map((category) => (
                        <li className="hover:bg-red-700 w-full text-start focus:bg-red-700 focus:text-white" key={category.name}>
                          <button onClick={ ()=>category.func(category.name)} className="block px-2 py-3 hover:bg-red-700 focus:bg-red-700 ">
                            {category.name}
                          </button>
                        </li>
                      ))}
                    </ul>

                    {filters.map((section) => (
                      <Disclosure as="div" key={section.id} className="border-t border-gray-200 px-4 py-6">
                        {({ open }) => (
                          <>
                            <h3 className="-mx-2 -my-3 flow-root">
                              <Disclosure.Button className="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                                <span className="font-medium text-gray-900">{section.name}</span>
                                <span className="ml-6 flex items-center">
                                  {open ? (
                                    <MinusIcon className="h-5 w-5" aria-hidden="true" />
                                  ) : (
                                    <PlusIcon className="h-5 w-5" aria-hidden="true" />
                                  )}
                                </span>
                              </Disclosure.Button>
                            </h3>
                            <Disclosure.Panel className="pt-6">
                              <div className="space-y-6">
                                {section.options.map((option, optionIdx) => (
                                  <div key={option.value} className="flex items-center">
                                    <input
                                      id={`filter-mobile-${section.id}-${optionIdx}`}
                                      name={`${section.id}[]`}
                                      defaultValue={option.value}
                                      type="checkbox"
                                      defaultChecked={option.checked}
                                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                    />
                                    <label
                                      htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                                      className="ml-3 min-w-0 flex-1 text-gray-500"
                                    >
                                      {option.label}
                                    </label>
                                  </div>
                                ))}
                              </div>
                            </Disclosure.Panel>
                          </>
                        )}
                      </Disclosure>
                    ))}
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>
        

          <CategoryButtons category={selectedCategory} setCategory={setselectedCategory} />
         

        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 ">
            <div onClick={()=>{setPage(page+1)}} className="text-xl font-semibold tracking-tight text-gray-900 flex w-fit">Results for : <p className='text-red-500 ml-2 '>{`${selectedCategory}`}</p></div>

            <div className="flex items-center">
              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <Menu.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                    Sort
                    <ChevronDownIcon
                      className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                      aria-hidden="true"
                    />
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
                  <Menu.Items className="absolute cursor-pointer bg-white right-0 z-10 mt-2 w-40 origin-top-right rounded-md  shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className=" w-full">
                      {sortOptions.map((option) => (
                        <Menu.Item key={option.name}>
                          {({ active }) => (
                            <button
                              onClick={()=>{
                                option.func();
                                option.current = true;
                              }}
                              className={classNames(
                                option.current ? 'w-[100%] text-start font-medium text-gray-900' : 'w-[100%] text-start font-medium text-gray-900',
                                active ? 'bg-gray-100' : '',
                                'block px-4 py-2 text-sm'
                              )}
                            >
                              {option.name}
                            </button>
                          )}
                        </Menu.Item>
                      ))}
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>

              <button type="button" onClick={()=>changeLayout()} className="-m-2 ml-5 p-2 hidden sm:block text-gray-400 hover:text-gray-500 sm:ml-7">
                <span className="sr-only">View grid</span>
                <Squares2X2Icon className="h-5 w-5" aria-hidden="true" />
              </button>
              <button
                type="button"
                className="-m-2 ml-4 p-2  text-red-400 hover:text-gray-500 sm:ml-6 lg:hidden"
                onClick={() => setMobileFiltersOpen(true)}
              >
                <span className="sr-only">Filters</span>
                <FunnelIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </div>

          <section aria-labelledby="products-heading" className="pb-24 pt-6">
            <h2 id="products-heading" className="sr-only">
              Products
            </h2>

            {/* <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-5"> */}
            <div className=" gap-x-8 gap-y-10 flex justify-between ">
              {/* Filters */}
              {/* <form className="hidden lg:block">
                <h3 className="sr-only">Categories</h3>
                <ul role="list" className="space-y-4 border-b border-gray-200 pb-6 text-sm font-medium text-gray-900">
                  {subCategories.map((category) => (
                    <li  className="hover:bg-red-300 focus:bg-red-500 focus:text-white" key={category.name}>
                      <a href={category.href}>{"hello"}</a>
                    </li>
                  ))}
                </ul>

                {filters.map((section) => (
                  <Disclosure as="div" key={section.id} className="border-b border-gray-200 py-6">
                    {({ open }) => (
                      <>
                        <h3 className="-my-3 flow-root">
                          <Disclosure.Button className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                            <span className="font-medium text-gray-900">{section.name}</span>
                            <span className="ml-6 flex items-center">
                              {open ? (
                                <MinusIcon className="h-5 w-5" aria-hidden="true" />
                              ) : (
                                <PlusIcon className="h-5 w-5" aria-hidden="true" />
                              )}
                            </span>
                          </Disclosure.Button>
                        </h3>
                        <Disclosure.Panel className="pt-6">
                          <div className="space-y-4">
                            {section.options.map((option, optionIdx) => (
                              <div key={option.value} className="flex items-center">
                                <input
                                  id={`filter-${section.id}-${optionIdx}`}
                                  name={`${section.id}[]`}
                                  defaultValue={option.value}
                                  type="checkbox"
                                  defaultChecked={option.checked}
                                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                />
                                <label
                                  htmlFor={`filter-${section.id}-${optionIdx}`}
                                  className="ml-3 text-sm text-gray-600"
                                >
                                  {option.label}
                                </label>
                              </div>
                            ))}
                          </div>
                        </Disclosure.Panel>
                      </>
                    )}
                  </Disclosure>
                ))} 
              </form> */}

                  <div className=' flex-col mx-2 my-3  w-20 sm:flex hidden'>
                  
                    <Link to='/home'> <button className="text-4xl text-red-500 m-3 hover:text-red-700 rounded-md focus:text-red-700 "><IoIosHome /></button></Link>
                    <Link to='/shorts'> <button className="text-4xl text-red-500 m-3 hover:text-red-700 rounded-md focus:text-red-700 "><SiYoutubeshorts /></button></Link>
                    <Link to='/playlist'> <button className="text-4xl text-red-500 m-3 hover:text-red-700 rounded-md focus:text-red-700 "><MdSubscriptions /></button></Link>
                    <Link to='/about'> <button className="text-4xl text-red-500 m-3 hover:text-red-700 rounded-md focus:text-red-700 "><RiPlayList2Fill /></button></Link>
                  </div>
              

              {/* Product grid */}
              <div className="">
                { Loading ? <div className={` w-[83vw] grid grid-cols-1 gap-x-2 gap-y-8  lg:${gridLayout} text-white`}>
                  <CardLoadingSkeletion></CardLoadingSkeletion>
                  <CardLoadingSkeletion></CardLoadingSkeletion>
                  <CardLoadingSkeletion></CardLoadingSkeletion>
                  <CardLoadingSkeletion></CardLoadingSkeletion>
                  <CardLoadingSkeletion></CardLoadingSkeletion>
                  <CardLoadingSkeletion></CardLoadingSkeletion>
                  
                  <CardLoadingSkeletion></CardLoadingSkeletion>
                  <CardLoadingSkeletion></CardLoadingSkeletion>
                
                  
                </div>
                :

                <div className=''>
                <InfiniteScroll
                  className='bg-pink-500'
                  pageStart={0}
                  loadMore={VedioArr.length > 0 && loadMoreItems}
                  hasMore={hasMore}
                  loader={   <div className=' bg-black'>
                                <ReactLoading className="mx-auto" type={'balls'} color={'white'} height={'5%'} width={'5%'} />
                            </div>}
                >
                  <DataGrid gridLayout = {gridLayout} vedios = {VedioArr} mic={mic} />
                  {/* {VedioArr.map((item, index) => {
                    return (
                    <div key={index}>{item.title}</div>
                  )})}
                   */}
                </InfiniteScroll>
             
                </div>
                }
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  )
}