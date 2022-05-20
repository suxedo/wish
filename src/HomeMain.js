import React from 'react'
import HeaderPhone from "./Phone/HeaderPhone";
import TabBar from "./Phone/TabBar";
import HomePhone from "./Phone/HomePhone";
function HomeMain() {
  return (
    <div style={{overflow:'hidden', display:'flex', alignItems:'center', flexDirection:'column', width:'100%'}}  >
       <HeaderPhone/>
       <TabBar/>
       <HomePhone/>
   


  </div>
  )
}

export default HomeMain