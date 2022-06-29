import { Auth, DataStore, SortDirection } from "aws-amplify";
import React, { useState, useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { Link, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";

import "./ProfilePhone.css";
import { User, UserFollowing, WishProducts, WishRooms } from "../models";
import { addToBasket, fetchData, fetchProductData, reload } from "../redux/actions";
import WishListItemImage from "../components/WishListItemImage";
function ProfilePhone(props) {
  const [user, setUser] = useState([]);
  const [testuser, setTestUser] = useState([]);
  const [wishRoom, setWishRoom] = useState([]);
  const [wishProducts, setWishProducts] = useState([]);
  const [userIds, setUserIds] = useState([]);
  const [Ids, setIds] = useState([]);
  const [deleteIds, setDeleteIds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [myfollowing, setMyFollowing] = useState(false);
  const [myfollower, setMyFollower] = useState(false);
  const [following, setFollowing] = useState(false);
  const [isOpenWish, setIsOpenWish] = useState(false);
  const [isFollowerModel, setIsFollowerModel] = useState(false);
  const [isFollowingModel, setIsFollowingModel] = useState(false);
  const { id } = useParams();
  const { control, handleSubmit, watch, reset } = useForm({});
  const { areUsersLoaded, products } = props;
  const dispatch = useDispatch();
  const [refresh, setRefresh] = useState(false);
  const [room, setRoom] = useState([]);
  const [image, setImage] = useState([]);
  const [postId, setPostId] = useState("");
  useEffect(() => {
    const { currentUser, following, rooms } = props;

    const getMyFollower = async () => {
      const userData = await Auth.currentAuthenticatedUser();

      if (id === userData.attributes.sub) {
        const user = await Auth.currentAuthenticatedUser();
        await DataStore.query(UserFollowing, (u) =>
          u.userId("eq", user.attributes.sub)
        ).then((data) => {
          let myfollower = data.map((doc) => {
            const id = doc.userSub;
            return id;
          });
          setMyFollower(myfollower);
        });
      } else {
        await DataStore.query(UserFollowing, (u) => u.userId("eq", id)).then(
          (data) => {
            let myfollower = data.map((doc) => {
              const id = doc.userSub;
              return id;
            });
            setMyFollower(myfollower);
          }
        );
      }
    };
    getMyFollower();
  }, [props.currentUser, props.following]);

  useEffect(() => {
    const { currentUser, following, rooms } = props;
    getWishProductImage()

    const getMyFollowing = async () => {
      const userData = await Auth.currentAuthenticatedUser();

      if (id === userData.attributes.sub) {
        const user = await Auth.currentAuthenticatedUser();
        await DataStore.query(UserFollowing, (u) =>
          u.userSub("eq", user.attributes.sub)
        ).then((data) => {
          let myfollowing = data.map((doc) => {
            const id = doc.userId;
            return id;
          });
          setMyFollowing(myfollowing);
        });
      } else {
        await DataStore.query(UserFollowing, (u) => u.userSub("eq", id)).then(
          (data) => {
            let myfollowing = data.map((doc) => {
              const id = doc.userId;
              return id;
            });
            setMyFollowing(myfollowing);
          }
        );
      }
    };
    getMyFollowing();
    console.log(wishProducts);
  }, [props.currentUser, props.following]);

  function getRoomProducts(id) {
    let productList = wishProducts.filter((a) => a.roomId === id);
    console.log(productList);

    return <div className="WishlistCollection__Size">item:{productList.length}</div>;
  }

  const getWishProduct = () => {
    DataStore.query(WishProducts).then((snapshot) => {
      let room = snapshot.map((doc) => {
        const data = doc;
        const id = doc.id;
        return { id, ...data };
      });
      setWishProducts(room);
    });
  };
  const getWishProductImage = () => {
    if (id !== postId || refresh) {
      DataStore.query(WishProducts, (u) => u.roomId("eq", id)).then(
        (snapshot) => {
          let room = snapshot.map((doc) => {
            const data = doc;
            const id = doc.id;
            return { id, ...data };
          });

          matchProductToRoom(room);
        }
      );

      setPostId(id);
    } else {
      matchProductToRoom(room);
    }
  };
  const matchProductToRoom = (room) => {
    for (let i = 0; i < room.length; i++) {
      if (room[i].hasOwnProperty("product")) {
        continue;
      }

      const product = products[0].find((x) => x.id === room[i].productId);

      if (product === undefined) {
        fetchProductData(room[i].productId, false);
      } else {
        room[i].product = product;
      }
    }
    setRoom(room);

    setRefresh(false);
  };
  

  const getCurrentUserWishList = async () => {
    const userData = await Auth.currentAuthenticatedUser();

    if (id === userData.attributes.sub) {
      await DataStore.query(
        WishRooms,
        (u) => u.userSub("eq", userData.attributes.sub),
        {
          sort: (u) => u.createdAt(SortDirection.DESCENDING),
        }
      ).then((data) => {
        let rooms = data.map((doc) => {
          const id = doc.userId;
          return { id, ...doc };
        });
        setWishRoom(rooms);

        setLoading(false);
      });
      setUserIds(userData.attributes.sub);
      setLoading(false);
    } else {
      await DataStore.query(WishRooms, (u) => u.userSub("eq", id)).then(
        (data) => {
          let rooms = data.map((doc) => {
            const id = doc.userId;
            return { id, ...doc };
          });
          setWishRoom(rooms);

          setLoading(false);
        }
      );
    }
  };

  useEffect(() => {
    const subscription = DataStore.observe(WishRooms).subscribe((msg) => {
      // console.log(msg.model, msg.opType, msg.element);
      if (msg.model === WishRooms && msg.opType === "INSERT") {
        getCurrentUserWishList();
      }
      if (msg.model === WishRooms && msg.opType === "DELETE") {
        getCurrentUserWishList();
      }
    });

    return () => subscription.unsubscribe();
  }, []);
 

  useEffect(() => {
    getCurrentUserWishList();
    getWishProduct();
    console.log(room);
    
  }, [props.currentUser, props.following]);

  useEffect(() => {
    const getCurrentUser = async () => {
      const userData = await Auth.currentAuthenticatedUser();

      if (id === userData.attributes.sub) {
        const user = await Auth.currentAuthenticatedUser();
        await DataStore.query(User, (u) =>
          u.userSub("eq", user.attributes.sub)
        ).then((data) => {
          if (data) {
            setUser({ uid: id, ...data });
          }
        });

        setUserIds(userData.attributes.sub);
        setLoading(false);
      } else {
        await DataStore.query(User, (u) => u.userSub("eq", id)).then((data) => {
          if (data) {
            setUser({ uid: id, ...data });
            console.log({ uid: id, ...data });
          }
          setLoading(false);
        });
      }
    };
    getCurrentUser();

    if (props.following.indexOf(id) > -1) {
      setFollowing(true);
    } else {
      setFollowing(false);
    }
    const getCurrentId = async () => {
      const user = await Auth.currentAuthenticatedUser();
      await DataStore.query(UserFollowing, (u) =>
        u.userSub("eq", user.attributes.sub).userId("eq", id)
      ).then((data) => {
        let del = data.map((doc) => {
          const all = doc.id;

          return all;
        });

        setDeleteIds(del[0]);
      });
    };
    getCurrentId();
  }, [props.currentUser, props.following]);

  if (loading) {
    return <div>loading.....</div>;
  }
  if (user === null) {
    return <div>loDING....</div>;
  }
  const onFollow = async () => {
    const userData = await Auth.currentAuthenticatedUser();

    DataStore.save(
      new UserFollowing({
        userSub: userData.attributes.sub,
        userId: id,
      })
    );
  };
  const onSavePressed = async (data) => {
    const { wishname } = data;

    const userData = await Auth.currentAuthenticatedUser();
    // create a new order
    DataStore.save(
      new WishRooms({
        userSub: userData.attributes.sub,
        name: wishname,
      })
    );
    console.log("saved");
    reset({
      wishname: "",
    });
  };
  function getProductDetails(id) {
    let serviceDetails = room.filter((a) => a.product.id === id);
    if (serviceDetails.length > 0) {
      return serviceDetails.map((item) => {
        return (
          <div className='dff'>

                 </div>
        );
      });

    }
  }
  

  
  
  return (
    <div className="ProfilePage__Wrapper">
      <div className="ProfileInfo__Wrapper">
        <div className="ProfileInfo__ProfileInfoContainer">
          <div className="ProfilePicture__ProfileWrapper"> {user[0]?.username[0].toUpperCase()}</div>
          <div className="ProfileInfo__Name">{user[0]?.username}</div>
          <div className="ProfileInfo__Country">US</div>
          <div className="ProfileInfo__ProfileStatWrapper">
            <div className="ProfileInfo__StatWrapper">
              <div className="ProfileInfo__StatNumber">{wishRoom?.length}</div>
              <div className="ProfileInfo__StatText">Saves</div>
            </div>
            <div
              to="/profile/followers?uid=5e1e1d3dfc997c86ab6692e8"
              className="ProfileInfo__StatWrapper"
            >
              <div className="ProfileInfo__StatNumber">{myfollower?.length}</div>
              <div className="ProfileInfo__StatText">Followers</div>
            </div>
            <a
              className="ProfileInfo__StatWrapper"
              href="/profile/following?uid=5e1e1d3dfc997c86ab6692e8"
            >
              <div className="ProfileInfo__StatNumber">{myfollowing?.length}</div>
              <div className="ProfileInfo__StatText">Following</div>
            </a>
          </div>
        </div>
      </div>
      <div></div>
      <div className="ProfilePage__WishlistsContainerWrapper">
        <div tabindex="0" className="WishButtons__WishButton">
          <svg viewBox="0 0 18 18" style={{ width: "15px", height: "15px" }}>
            <g fill="none" fill-rule="evenodd">
              <path d="M0 0h18v18H0z"></path>
              <path
                fill="#2fb7ec"
                d="M10.0909091 9.81818182h4.5c.2181818 0 .4090909-.19090909.4090909-.40909091v-.81818182c0-.21818182-.1909091-.40909091-.4090909-.40909091h-4.5c-.16363637 0-.27272728-.10909091-.27272728-.27272727v-4.5C9.81818182 3.19090909 9.62727273 3 9.40909091 3h-.81818182c-.21818182 0-.40909091.19090909-.40909091.40909091v4.5c0 .16363636-.10909091.27272727-.27272727.27272727h-4.5C3.19090909 8.18181818 3 8.37272727 3 8.59090909v.81818182c0 .21818182.19090909.40909091.40909091.40909091h4.5c.16363636 0 .27272727.10909091.27272727.27272728v4.5c0 .2181818.19090909.4090909.40909091.4090909h.81818182c.21818182 0 .40909091-.1909091.40909091-.4090909v-4.5c0-.16363637.10909091-.27272728.27272728-.27272728z"
              ></path>
            </g>
          </svg>
          <div className="ProfilePage__CreateWishlistText">
            Create New Wishlist
          </div>
        </div>
        <div></div>
        {wishRoom?.length !== 0 ? (
          <div>
            {wishRoom.map((item) => {
              return (
                <Link
                  to={`/wishlist/` + item?.id}
                >
                  <div className="WishlistCollection__Wrapper">
                    <div className="WishlistCollection__Header">
                      <div className="WishlistCollection__HeaderMainRow">
                        <div
                          className="WishlistCollection__Name"
                         
                        >
                          {item.name}
                        </div>
                        <div className="WishlistCollection__IconSection">
                          <svg
                            viewBox="0 0 4 16"
                            class="WishlistCollection__KebabMenuImg"
                          >
                            <path
                              d="M2 4c1.1 0 2-.899 2-2 0-1.1-.9-2-2-2S0 .9 0 2c0 1.101.9 2 2 2m0 2C.9 6 0 6.9 0 8c0 1.101.9 2 2 2s2-.899 2-2c0-1.1-.9-2-2-2m0 6c-1.1 0-2 .9-2 2 0 1.101.9 2 2 2s2-.899 2-2c0-1.1-.9-2-2-2"
                              fill="#192A32"
                              fill-rule="evenodd"
                            ></path>
                          </svg>
                        </div>
                      </div>
                      <div
                        className="WishlistCollection__Size"
                      
                      >
                         {getRoomProducts(item.id)}
                        
                      </div>
                    </div>
                    {!item?.id ? <div
                      className="WishlistCollection__PreviewLink"
                      
                    >
                      <div className="WishlistCollection__PreviewImage"></div>
                      <div className="WishlistCollection__PreviewImage"></div>
                      <div className="WishlistCollection__PreviewImage"></div>
                      <div className="WishlistCollection__PreviewImage"></div>
                      <div className="WishlistCollection__PreviewImage"></div>
                      <div className="WishlistCollection__PreviewImage"></div>
                    </div>:  <WishListItemImage ids={item.id} />}
                    
                  </div>
                </Link>
              );
            })}
          </div>
        ) : (
          <div>dd</div>
        )}

     
      </div>
    </div>
  );
}

const mapStateToProps = (store) => ({
  baskets: store.basketsState.baskets,
  currentUser: store.userState.currentUser,
  following: store.userState.following,
  follower: store.userState.follower,
  rooms: store.usersState.rooms,
  products: store.usersState.products,
});

const mapDispatchProps = (dispatch) =>
  bindActionCreators({ addToBasket, reload, fetchData }, dispatch);

export default connect(mapStateToProps, mapDispatchProps)(ProfilePhone);
