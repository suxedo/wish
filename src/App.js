import React, { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Home";
import Header from "./Header";
import SideBar from "./SideBar";
import 'antd/dist/antd.css';
import useWindowSize from "./utils/useWindowSize";

import Modal from "./Modal";
import Cart from "./Cart";

import HeaderPhone from "./Phone/HeaderPhone";
import TabBar from "./Phone/TabBar";

import HeaderCart from "./Phone/HeaderCart";


import { Auth, DataStore, Hub } from "aws-amplify";
import AuthTab from "./AuthTab";
import { User } from "./models";
import Confimation from "./Confimation";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { addToBasket, reload } from "./redux/actions";
import Profile from "./Profile";
import WishList from "./WishList";
import HomePhone from "./Phone/HomePhone";
import CartMobile from "./Phone/CartMobile";
import HeaderProfilePhone from "./Phone/HeaderProfilePhone";
import ProductDetailsMobile from "./Phone/ProductDetailsMobile";
import HeaderDetails from "./Phone/HeaderDetails";
import HomeMain from "./HomeMain";
import DetailsMain from "./DetailsMain";
import HomeCart from "./HomeCart";
import ProfilePhone from "./Phone/ProfilePhone";

const randomImages = [
  "https://hieumobile.com/wp-content/uploads/avatar-among-us-2.jpg",
  "https://hieumobile.com/wp-content/uploads/avatar-among-us-3.jpg",
  "https://hieumobile.com/wp-content/uploads/avatar-among-us-6.jpg",
  "https://hieumobile.com/wp-content/uploads/avatar-among-us-9.jpg",
];

const getRandomImage = () => {
  return randomImages[Math.floor(Math.random() * randomImages.length)];
};

function App(props) {
  const [user, setUser] = useState(undefined);
  const {currentUser, reload, setIsOpen } = props;
 
  const [areUsersLoaded, setUsersLoaded] = useState(false);
  const { width } = useWindowSize();

  useEffect(() => {
    reload();
  }, [currentUser, reload]);

  const checkUser = async () => {
    try {
      const authUser = await Auth.currentAuthenticatedUser({
        bypassCache: true,
      });
      setUser(authUser);
    } catch (e) {
      setUser(null);
    }
  };
  useEffect(() => {
    checkUser();
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      // get currently authenticated user
      const userInfo = await Auth.currentAuthenticatedUser();
     
      if (!userInfo) {
        return;
      }

      // check if THE user exist in database
      const original = await DataStore.query(User, (cp) =>
        cp.userSub("eq", userInfo.attributes.sub)
      );
      const data= original[0]

      if (data) {
        console.log("User already exists in database");
        return;
      }

      // if it doesn't (it's newly registered user)
      // then, create a new user in database
      DataStore.save(
        new User({
          userSub: userInfo.attributes.sub,
          firstname: "",
          lastname: "",
          username: userInfo.username,
          email: userInfo.attributes.email,
          profile: getRandomImage(),
        })
      );
    };

    fetchUser();
  }, []);

  useEffect(() => {
    const listener = (data) => {
      if (data.payload.event === "signIn" || data.payload.event === "signOut") {
        checkUser();
      }
    };

    Hub.listen("auth", listener);
    return () => Hub.remove("auth", listener);
  }, []);


  if (user === undefined) {
    return (
      <div style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <p>loading.....</p>
      </div>
    );
  }
  


  return (
  
       <div className="app">
      <Routes>
        {user ? (
          <>
            <Route
              exact
              path="/"
              element={
                
                <div className="">

             
              <div className="home__web" >
                  <Header/>
                  <SideBar/>
                  <Home/>
                
                    
                  </div>
                 
                    
                  
               
               
                 
                  <div className="home__mobile">
                  <HomeMain/>
                    
                  </div>
                  
                 
              
                
                    
              
                </div>
              }
            />
            <Route
              path="/feed/:name"
              element={
                <div>
                     <div className="home__web" >
                  <Header/>
                  <SideBar/>
                  <Home/>
                
                    
                  </div>
                  <div className="home__mobile">
                  <HomeMain/>
                    
                  </div>
                  
           
          
                        
                 

                </div>
              }
            />
            <Route
              path="/feed/product/:name"
              element={
                <div>
                  <div className="home__web" >
                  <Header/>
                  <SideBar/>
                  <Home/>
                  <Modal setIsOpen={setIsOpen} />
                    
                  </div>
                  <div className="home__mobile">
                    <DetailsMain/>
                    
                  </div>

                  
                  
              
                  
                </div>
              }
            />

            <Route
              path="/cart"
              element={
                <div>
                <div className="home__web" >
                <Header/>
                <SideBar/>
                <Cart/>
                  
                </div>
                <div className="home__mobile">
                  <HomeCart/>                
                  
                </div>

                
                
            
                
              </div>
              }
            />

            <Route
              path="/profile/:id"
              element={
                <div>
                <div className="home__web" >
                <Header />
                  <SideBar />
                  <Profile areUsersLoaded={areUsersLoaded}/>
                </div>
                <div className="home__mobile">
                  <ProfilePhone/>                
                  
                </div>

                
                
            
                
              </div>
                
  
              }
            />
                 <Route
              path="/wishlist/:id"
              element={
                <div  className='ho'>
                  <Header />
                  <SideBar />
                  <WishList/>
                </div>
              }
            />
          </>
        ) : (
          <>
            <Route
              exact
              path="/"
              element={
                <div>
                  <AuthTab />
                </div>
              }
            />
            <Route
              exact
              path="/confirm/:name"
              element={
                <div>
                  <Confimation />
                </div>
              }
            />

            
          </>
        )}
      </Routes>
    </div>
   
   
  );
}

const mapStateToProps = (store) => ({
  baskets: store.basketsState.baskets,
  currentUser: store.userState.currentUser,
});

const mapDispatchProps = (dispatch) =>
  bindActionCreators({ addToBasket, reload }, dispatch);

export default connect(mapStateToProps, mapDispatchProps)(App);
