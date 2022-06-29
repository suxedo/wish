import React,{useState, useRef, useEffect} from 'react'
import products from '../Products'
import BtnSlider from './BtnSlider'
import './Slider.css'


import { Carousel } from 'antd';
function Slider() {
    const [slideIndex, setSlideIndex] = useState(1)
    const [timeduration] = useState(4000)
    const [play, setPlay] = useState(true)
    const  [elap, setElap] = useState(1)

    useEffect(()=> {
        setSlideIndex(0)
      },[])
      useEffect(()=>{
        let timer
        let elap
        if(play) {
          timer = setInterval(()=>{
            setSlideIndex(prev=> prev+1)
            setElap(0)
          }, timeduration)
          elap = setInterval(()=>{
            setElap(prev=> prev +1)
          }, 1)
        }else {
          clearInterval(timer)
          clearInterval(elap)
          setElap(0)
         
    
        }
        return() => {
          clearInterval(timer)
          clearInterval(elap)
          setElap(0)
         
        }
      },[play, timeduration])

    
   
    
    const nextSlide = () => {
        if(slideIndex !== products.length){
            setSlideIndex(slideIndex + 1)
        } 
        else if (slideIndex ===  products.length){
            setSlideIndex(0)
        }
    }

    const prevSlide = () => {
        if(slideIndex !== 1){
            setSlideIndex(slideIndex - 1)
        }
        else if (slideIndex === 1){
            setSlideIndex( products.length)
        }
    }

    const moveDot = index => {
        setSlideIndex(index)
    }
  return (

    <div style={{ width:'900px', height:'176px'}}>
      <Carousel effect="fade" interval={3000}  autoplay={true} infiniteLoop={true} dots={true} dotPosition='bottom' showThumbs={false} showStatus={false} style={{ width:'900px', height:'176px'}}>
    {products.map((obj, index) => {
                return (
                    <div style={{width:'100%'}} className='slider__imageWrapper' key={obj.id}>
                        <img className='slider__image' src={obj.url} alt='slide'/>
                        
                    </div>
                        
                )
            })}
        

</Carousel>
   
          <div className="ItemCarousel__ArrowWrapper"><svg width="12px" height="12px" viewBox="0 0 6 10" xmlns="http://www.w3.org/2000/svg" style={{transform: 'rotate(0deg)', transition: 'all 0.25s ease 0s', cursor: 'pointer'}}><path d="M1 1l4 4.01L1 9" stroke="#192a32" stroke-width="1.5" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round"></path></svg></div>

<div className="ItemCarousel__ArrowWrapperHover"><svg width="12px" height="12px" viewBox="0 0 6 10" xmlns="http://www.w3.org/2000/svg" style={{transform: 'rotate(180deg)',transition: 'all 0.25s ease 0s', cursor: 'pointer'}}><path d="M1 1l4 4.01L1 9" stroke="#192a32" stroke-width="1.5" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round"></path></svg></div>
    </div>
    
         
   
   
   

  )
}

export default Slider