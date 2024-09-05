import React, { useEffect, useState } from 'react'
import './howToRead.css'
import howToImage from '../../../assets/howToImage.png'
const HowToRead = () => {
    const sequence = [
        { number: 1, label: 'Register an account' ,sub:'Create an account to unlock endless reading adventures and exclusive offers. Your journey to discovering new books starts here!'},
        { number: 2, label: 'Find your book' ,sub:'Discover your next great read with us. Explore a world of captivating stories and knowledge—your perfect book awaits you here.' },
        { number: 3, label: 'Make Order'  ,sub:'Place your order effortlessly and dive into a world of incredible books. Enjoy seamless shopping and prompt delivery right to your door.'},
      ];
    
      const [activeIndex, setActiveIndex] = useState(0);
    
      useEffect(() => {
        const interval = setInterval(() => {
          setActiveIndex((prevIndex) => (prevIndex + 1) % sequence.length);
        }, 1000);
        return () => clearInterval(interval);
    }, [sequence.length]);
  
  return (
    <>
    <div className="howToReadMain">
        <div className="howToReadText">
            <div className="howToReadHead">
                <span className='howToReadHeading'>How To Read</span><br />
                <span className='howToReadSubHeading'>Follow these simple steps ot place order and read quickly.</span>
            </div>
            <div className="vertical-circles-container">
      {sequence.map((item, index) => (
        <React.Fragment key={index}>
          <div className="circle-label-row">
            {/* Circle and label in the same line */}
            <div className={`circle ${activeIndex >= index ? 'active' : ''}`}>
              {item.number}
            </div>
            <span className="label">{item.label} <br /><span className='subLabel'>{item.sub}</span></span>
              
          </div>
          {/* Dotted line connecting circles vertically */}
          {index < sequence.length - 1 && (
            <div
              className={`dotted-line ${
                activeIndex > index ? 'active-line' : ''
              }`}
            ></div>
          )}
        </React.Fragment>
      ))}
    </div>
            
        </div>
        <div className="howToReadImage">
            <img src={howToImage} alt='how to read' />
        </div>
    </div>
    </>
  )
}

export default HowToRead