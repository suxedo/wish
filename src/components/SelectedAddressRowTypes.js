import React,{useEffect, useState} from "react";
import "./SelectedAddressRowTypes.css";

function SelectedAddressRowTypes(props) {
  const { type, onPress, isSelected, iwish, productId } = props;
  const [currentRoom, setCurrentRoom] = useState(false)

  
  return (
    <div className="selectaddress">
   
      <div onClick={onPress}
        className={
          isSelected ? "selectaddress__IsSelected" : "selectaddress__NotSelected"
        }
      ></div>

      <div style={{marginLeft:'20px'}}>{`${type.firstname} ${type.lastname} ${type.addressline1} `}</div>

     
  </div>
   
  );
}

export default SelectedAddressRowTypes
