import React from 'react'
import './CustomBtn.css'
function CustomButton({onPress, text, type = 'PRIMARY', bgColor, fgColor}) {
  return (
    <div onClick={onPress} className="containerbtn" style={bgColor ?{backgroundColor:bgColor}:{}}>
        <p>
            {text}
        </p>


    </div>
  )
}

export default CustomButton