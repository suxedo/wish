import React from 'react'

function ProductBtnSlide({text, onPress}) {
  return (
    <div onClick={onPress}  style={{ display:'flex', flexDirection:'column', marginBottom:'18px'}}>
        <div style={{display:'flex', flexDirection:'row', placeContent:'center space-between', marginBottom:'16px'}}>
            <h2 style={{fontSize:'16px',  fontWeight:'700', color:'rgb(25, 42, 50);', whiteSpace:'normal'}}>{text}</h2>
            <svg width="12px" height="12px" viewBox="0 0 6 10" xmlns="http://www.w3.org/2000/svg" style={{transform: "rotate(0deg)", transition: 'all 0.25s ease 0s'}}><path d="M1 1l4 4.01L1 9" stroke="#afc7d1" stroke-width="1.5" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round"></path></svg>
        </div>

    </div>
  )
}

export default ProductBtnSlide