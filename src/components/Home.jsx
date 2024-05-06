import React from 'react'
import MainGrid from './MainGrid'


const Home = ({selectedCategory,setselectedCategory, mic}) => {
  return (
    <div>
        <MainGrid selectedCategory={selectedCategory} setselectedCategory={setselectedCategory} mic={mic}/>
    </div>
  )
}

export default Home
