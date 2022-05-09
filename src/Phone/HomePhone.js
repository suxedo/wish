import React, { useState, useEffect } from "react";
import "./HomePhone.css";

import { Link, useParams } from "react-router-dom";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { Auth, DataStore, Hub } from "aws-amplify";

import ProductsPage from "../ProductsPage";
import { User } from "../models";

function HomePhone(props) {
  const { name } = useParams();
  const [all, setAll] = useState([]);

  const [isLoaded, setLoaded] = useState(false);
  const [areUsersLoaded, setUsersLoaded] = useState(false);

  const [isOpen, setIsOpen] = useState(false);
  const { baskets, addToBasket, currentUser, reload } = props;
  const randomImages = [
    "https://hieumobile.com/wp-content/uploads/avatar-among-us-2.jpg",
    "https://hieumobile.com/wp-content/uploads/avatar-among-us-3.jpg",
    "https://hieumobile.com/wp-content/uploads/avatar-among-us-6.jpg",
    "https://hieumobile.com/wp-content/uploads/avatar-among-us-9.jpg",
  ];

  const getRandomImage = () => {
    return randomImages[Math.floor(Math.random() * randomImages.length)];
  };

  useEffect(() => {
    const listener = Hub.listen("datastore", async (capsule) => {
      const {
        payload: { event, data },
      } = capsule;
      console.log("DataStore event", event, data);

      if (event === "ready") {
        setLoaded(true);
      }
      if (event === "modelSynced" && data.model.name === "User") {
        setUsersLoaded(true);
      }
    });
    return () => listener();
  }, []);

  useEffect(() => {
    const getAllUser = async () => {
      const data = await DataStore.query(User);
      setAll(data);
    };
    getAllUser();
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
      const data = original[0];

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

  const SignOut = async () => {
    Auth.signOut();
  };

  function renderPage() {
    if (areUsersLoaded === false) {
      return (
        <div
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <p>DataStore uuser is loading</p>
        </div>
      );
    }
  }

  return (
    <div className="homephone">
      <div className="homephone__wrapper">
        <div className="homephone__products">
          {name && (
            <div className="home__res">
              Results for <h5>'{name}'</h5>
            </div>
          )}
          <ProductsPage />
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (store) => ({
  baskets: store.basketsState.baskets,
  currentUser: store.userState.currentUser,
});

const mapDispatchProps = (dispatch) => bindActionCreators({}, dispatch);

export default connect(mapStateToProps, mapDispatchProps)(HomePhone);
