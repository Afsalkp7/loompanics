import React from 'react'
import './browseBooksSection.css'
import { MdOutlineRocketLaunch } from "react-icons/md";
import { useNavigate } from 'react-router-dom';

function BrowseBooksSection() {
  const navigate = useNavigate()
  return (
    <div className='browseBookSection'>
        <span className='browseHead'>Browse Our <span className='brouse500'>500+</span> Latest Books</span><br  />
        <span className='browseSubHead'>Discover and explore over 500 of latest books across various gernes to find your next read</span>
        <button className='exploreButton' onClick={()=>navigate('/books')}><span className='exploreButtonText'> Explore Now <MdOutlineRocketLaunch /> </span></button>
    </div>
  )
}

export default BrowseBooksSection