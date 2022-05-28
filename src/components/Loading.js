import React from "react";
import "./Loading.css";
import ReactLoading from 'react-loading';
function Loading({type, color}) {
  return (
  

    <ReactLoading type={type} color={color} height={50} width={50} />

   
  );
}

export default Loading;
