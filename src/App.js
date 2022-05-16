import React, { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Home";
import Header from "./Header";
import SideBar from "./SideBar";

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
                
                <div>
                  <div>
                    <div className="header__web">
                    <Header/>
                      
                    </div>
                    <div className="header__mobile">
                      <HeaderPhone/>
                    </div>

                 
                    
                  </div>
                  <div className="sidebar">
                    <div className="sidebar__mobile">
                      <TabBar/>
                      
                    </div>
                    <div className="sidebar__web">
                    <SideBar />
                      
                    </div>

                  

                  </div>
                  <div>
                    <div className="home__web">
                    <Home/>
                      
                    </div>
                    <div className="home__mobile">
                      <HomePhone/>
                    </div>
                 
                    
                  </div>
                 
              
                
                    
              
                </div>
              }
            />
            <Route
              path="/feed/:name"
              element={
                <div>
           
           <div>
                    <div className="header__web">
                    <Header/>
                      
                    </div>
                    <div className="header__mobile">
                      <HeaderPhone/>
                    </div>

                 
                    
                  </div>
                  <div className="sidebar">
                    <div className="sidebar__mobile">
                      <TabBar/>
                      
                    </div>
                    <div className="sidebar__web">
                    <SideBar />
                      
                    </div>

                  

                  </div>
                  <div>
                    <div className="home__web">
                    <Home/>
                      
                    </div>
                    <div className="home__mobile">
                      <HomePhone/>
                    </div>
                 
                    
                  </div>
                        
                 

                </div>
              }
            />
            <Route
              path="/feed/product/:name"
              element={
                <div>

                  <div>
                    <div className="header__web">
                    <Header/>
                      
                    </div>
                    <div className="header__mobile">
                      <HeaderDetails/>
                    </div>

                 
                    
                  </div>
                  <div>
                    <div className="home__web">
                    <Home/>
                      
                    </div>
                    <div className="home__mobile">
                      <ProductDetailsMobile/>
                      
                    </div>
                    
                  
                  </div>

                  <div  className="home__web">
                  <Modal setIsOpen={setIsOpen} />
                    
                  </div>
                  
              
                  
                </div>
              }
            />

            <Route
              path="/cart"
              element={
                <div>
                  <div>
                    <div className="header__web">
                    <Header />
                      
                      
                    </div>
                    <div className="header__mobile">
                      <HeaderCart/>
                      
                    </div>


                  </div>
                  <div>
                    <div className="header__web">
                    <SideBar />
                      
                    </div>
                  </div>

                  <div>
                    <div className="header__web">
                    <Cart/>
                      
                      
                    </div>
                    <div className="header__mobile">
                      <CartMobile/>
                      
                    </div>


                  </div>
             
               
                 
                </div>
              }
            />

            <Route
              path="/profile/:id"
              element={
                
                <div>
                  
                  <Header />
                  <SideBar />
                  <Profile areUsersLoaded={areUsersLoaded}/>
                  
                </div>
              }
            />
                 <Route
              path="/wishlist/:id"
              element={
                <div>
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
