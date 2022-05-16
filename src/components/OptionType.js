import React,{useEffect, useState} from "react";
import "./RoomTypeRow.css";

function OptionType(props) {
  const { type, onPress, isSelected, iwish, productId } = props;
  const [currentRoom, setCurrentRoom] = useState(false)
  
  
  return (
    
        <div onClick={onPress}
     
      style={{
        backgroundColor: isSelected ? "rgb(240, 245, 247)" : "white",
      }} className="SelectionList__Wrapper">
                  <div className="SelectionList__OptionContent">
                    <div className="SelectionList__OptionContentWrapper">
                      <div className="SelectionList__OptionContentBadge"> 
                        
                      </div>
                      <div className="SelectionList__OptionContentSizeText">
                        {type}
                      </div>
                      <div className="SelectionList__OptionContentPriceContainer" >
                        <div className="SelectionList__OptionContentPriceWrapper">
                          <div  className="SelectionList__OptionContentPriceNo">
                            {type.price}
                          </div>
                          
                        </div>
                        
                      </div>
                    </div>
                  </div>
                  
                </div>
     
  
  );
}

export default OptionType;
