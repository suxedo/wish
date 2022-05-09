import React,{useEffect, useState} from "react";
import "./RoomTypeRow.css";

function RoomTypeRow(props) {
  const { type, onPress, isSelected, iwish, productId } = props;
  const [currentRoom, setCurrentRoom] = useState(false)
  useEffect(() => {

    if (iwish.indexOf(productId) > -1) {
      setCurrentRoom(true);
    } else {
      setCurrentRoom(false);
    }
   
  }, [])
  
  return (
    <div
      onClick={onPress}
      className="roomType__TabWrapper"
      style={{
        backgroundColor: isSelected ? "rgb(240, 245, 247)" : "white",
      }}
    >
      <div className="roomType__TabImage"></div>
      <div className="roomType__TabText">{type.name}</div>
      <div>
        
      </div>
      <div className="roomType__TabIcon">
        {isSelected ? (
          <svg viewBox="0 0 21 19" style={{ width: "24px", height: "23px" }}>
            <path
              d="M15.25 0C18.496 0 21 2.51 21 5.781c0 1.046-.26 2.053-.772 3.068-.677 1.341-1.751 2.663-3.544 4.477-.611.619-4.287 4.176-5.472 5.376-.1879198.190548-.4443764.2978205-.712.2978205-.2676236 0-.52408017-.1072725-.712-.2978205-1.185-1.2-4.86-4.757-5.472-5.376C2.523 11.512 1.45 10.19.772 8.849.261 7.834 0 6.827 0 5.78 0 2.511 2.504 0 5.75 0c1.831 0 3.606.88 4.75 2.251C11.643.88 13.417 0 15.25 0z"
              fill="#ec2f4d"
              fill-rule="nonzero"
            ></path>
          </svg>
        ) : (
          <svg viewBox="0 0 21 19" style={{ width: "24px", height: "23px" }}>
            <path
              fill="#7e9aa6"
              d="M15.25 0C18.496 0 21 2.51 21 5.781c0 1.046-.26 2.053-.772 3.068-.677 1.341-1.751 2.663-3.544 4.477-.611.619-4.287 4.176-5.472 5.376a1 1 0 0 1-1.424 0c-1.185-1.2-4.86-4.757-5.472-5.376C2.523 11.512 1.45 10.19.772 8.849.261 7.834 0 6.827 0 5.78 0 2.511 2.504 0 5.75 0c1.831 0 3.606.88 4.75 2.251C11.643.88 13.417 0 15.25 0zm.011 11.92c1.658-1.677 2.622-2.862 3.181-3.972.376-.746.558-1.448.558-2.167C19 3.614 17.39 2 15.25 2c-1.643 0-3.256 1.087-3.817 2.546-.328.855-1.538.855-1.866 0C9.006 3.087 7.392 2 5.75 2 3.61 2 2 3.614 2 5.781c0 .719.182 1.42.558 2.167.56 1.11 1.523 2.295 3.18 3.972.5.506 3.21 3.13 4.762 4.667 1.553-1.536 4.262-4.161 4.761-4.667z"
            ></path>
          </svg>
        )}
      </div>
    </div>
  );
}

export default RoomTypeRow;
