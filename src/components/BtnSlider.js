import React from 'react'
import './Slider.css'
function BtnSlider({ direction, moveSlide }) {
  return (
    <button onClick={moveSlide}
    className={direction === "next" ? "btn-slide next" : "btn-slide prev"}>
      <img style={{width:'50px', height:'50px'}} alt='rightArrow' src={direction === "next" ? 'https://cdns.iconmonstr.com/wp-content/releases/preview/2018/240/iconmonstr-arrow-right-thin.png' : 'https://www.pinclipart.com/picdir/middle/110-1106984_long-arrow-left-svg-png-icon-free-download.png'}/>
    </button>
  )
}

export default BtnSlider