import React from 'react'
import { Link } from 'react-router-dom'

const About = () => {
  return (
    <div>
      <div className="container-about sm:mx-20 sm:my-4 py-4 px-6 rounded-md bg-green-200 font-serif ">
        <h1 className="text-4xl  text-center font-bold mb-6 ">About Our Project</h1>
        <p className="text-lg mb-4 text-center font-semibold ">
          Welcome to our project's About page! We're excited to share more details about what we've been working on.
        </p>
        <p className="text-lg mb-4">
          Our project aims to address the problems faced by a noob gardener when he/she starts to plant. Let us suppose , Mr. A wants to grow some vegetables in his garden but he has no idea that how to start and what precautions should he take for better gardenning. This is the problem might face by many people and the solution to address this proplem is <a to="/home" className='font-bold text-green-500'>Garen</a>
        </p>
        <p className="text-lg mb-4">
          Here are some key features of our project:
        </p>
        <ol className="list-disc pl-6 mb-4  font-semibold text-gray-500">
          <li className="text-lg">Feature 1: Provide details related to gardenning and also suggest ways to grow plants on the roof.</li>
          <li className="text-lg">Feature 2: Chat bot for query support.</li>
          <li className="text-lg">Feature 3: Fixes the problem that has been faced by many people during their first initiate towards gardenning.</li>

        </ol>
        <p className="text-lg mb-4">
          We're passionate about AI and its amazing features that has the ability to change the future, and we believe our project will make a positive impact by providing relevent information as per needs.
        </p>
        <span className="text-lg mb-4">
          Thank you for visiting our About page and learning more about our project. If you have any questions or feedback, feel free to ask on <p className='text-blue-500'>Sumitbaghel22@gmail.com, rohan.baghel.100@gmail.com,therohitpandey@gmail.com</p>
        </span>
      </div>
      
    </div>
  )
}

export default About