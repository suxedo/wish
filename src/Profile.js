import { Auth, DataStore, SortDirection } from "aws-amplify";
import React, { useState, useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { addToBasket, fetchData, reload } from "./redux/actions";
import { Link, useParams } from "react-router-dom";
import "./Profile.css";
import { User, WishProducts } from "./models";
import { WishRooms } from "./models";
import { UserFollowing } from "./models";
import NewWishModel from "./components/NewWishModel";
import CustomInput from "./components/CustomInput";
import { useForm } from "react-hook-form";
import CustomButton from "./components/CustomButton";
import FollowerUsers from "./components/FollowerUsers";
import FollowingUsers from "./components/FollowingUsers";

function Profile(props) {
  const [user, setUser] = useState([]);
  const [testuser, setTestUser] = useState([]);
  const [wishRoom, setWishRoom] = useState([]);
  const [wishProducts, setWishProducts] = useState([]);
  const [userIds, setUserIds] = useState([]);
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
  const { areUsersLoaded } = props;
  const dispatch = useDispatch();

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
   

      let productList = wishProducts.filter(
        (a) => a.roomId === id
      );
      console.log(productList);
   
     
          return (
            <div>
               item:{productList.length}
            </div>
          ); 
      
  
  

  }

  const getWishProduct = () => {

      DataStore.query(WishProducts).then(
        (snapshot) => {
          let room = snapshot.map((doc) => {
            const data = doc;
            const id = doc.id;
            return { id, ...data };
          });
          setWishProducts(room)


         
        }
      );

    
  

  };

  const getCurrentUserWishList = async () => {
    const userData = await Auth.currentAuthenticatedUser();

    if (id === userData.attributes.sub) {
      await DataStore.query(WishRooms, (u) =>
        u.userSub("eq", userData.attributes.sub),
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
    getWishProduct()
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
  const onOpenModal = () => {
    setIsOpenWish(true);
  };
  const onUnfollow = async () => {
    const userData = await Auth.currentAuthenticatedUser();

    const modelToDelete = await DataStore.query(UserFollowing, deleteIds);

    DataStore.delete(modelToDelete);
  };

  return (
    <div className="profile">
      <div className="profile__panel">
        <div className="profile__picture">
          {user[0]?.username[0].toUpperCase()}
        </div>
        <div className="profile__name">{user[0]?.username}</div>

        <div className="profile__name">{user[0]?.createdAt.substring(0, 4)}</div>
       
        <div className="profile__country">NG</div>
        <div>
          {id === userIds ? (
            <div className="profile__btn">editprofile</div>
          ) : (
            <div>
              {following ? (
                <div className="profile__btn" onClick={onUnfollow}>
                  {" "}
                  following{" "}
                </div>
              ) : (
                <div className="profile__btn" onClick={onFollow}>
                  follow
                </div>
              )}
            </div>
          )}
        </div>

        <div className="profile__line"></div>
        <div className="profile__stateContainer">
          <div className="profile__state">
            <div  onClick={() => {
                      setIsFollowerModel(true);
                    }} className="profile__stateNo">{myfollower?.length}</div>
            Followers
          </div>
          <div onClick={() => {
                      setIsFollowingModel(true);
                    }} className="profile__state">
            <div className="profile__stateNo">{myfollowing?.length}</div>
            Following
          </div>
        </div>
      </div>

      <div className="profile__wishPanel">
        <div className="profile__wishPanelHeader">
          <h1 className="profile__wishPanelTitle">WishList</h1>
          {id === userIds && (
            <div>
              {wishRoom?.length !== 0 && (
                <div className="profile__wishPanelBtn">
                  <svg
                    viewBox="0 0 18 18"
                    style={{
                      width: "18px",
                      height: "18px",
                      color: "rgb(255, 255, 255)",
                    }}
                  >
                    <g fill="none" fill-rule="evenodd">
                      <path d="M0 0h18v18H0z"></path>
                      <path
                        fill="#fff"
                        d="M10.0909091 9.81818182h4.5c.2181818 0 .4090909-.19090909.4090909-.40909091v-.81818182c0-.21818182-.1909091-.40909091-.4090909-.40909091h-4.5c-.16363637 0-.27272728-.10909091-.27272728-.27272727v-4.5C9.81818182 3.19090909 9.62727273 3 9.40909091 3h-.81818182c-.21818182 0-.40909091.19090909-.40909091.40909091v4.5c0 .16363636-.10909091.27272727-.27272727.27272727h-4.5C3.19090909 8.18181818 3 8.37272727 3 8.59090909v.81818182c0 .21818182.19090909.40909091.40909091.40909091h4.5c.16363636 0 .27272727.10909091.27272727.27272728v4.5c0 .2181818.19090909.4090909.40909091.4090909h.81818182c.21818182 0 .40909091-.1909091.40909091-.4090909v-4.5c0-.16363637.10909091-.27272728.27272728-.27272728z"
                      ></path>
                    </g>
                  </svg>
                  <div
                    onClick={() => {
                      setIsOpenWish(true);
                    }}
                    className="profile__wishPanelBtnText"
                  >
                    Create Wishlist
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
        {wishRoom?.length !== 0 ? (
          <div className="profile__gridWrapper">
            {wishRoom.map((item) => {
              return (
                <div className="profile__wishPanelGridRow">
                  <Link
                    to={`/wishlist/` + item?.id}
                    className="profile__wishPanelCollection"
                  >
                    <div className="profile__wishPanelPreview">
                      <div className="profile__wishPanelImage">
                        <div className="profile__wishPanelImagePreview"></div>
                      </div>

                      <div className="profile__wishPanelImage">
                        <div className="profile__wishPanelImagePreview"></div>
                      </div>
                    </div>
                    <div className="profile__wishPanelCollectionDescription">
                      <div className="profile__wishPanelCollectionDescriptionName">
                        {item.name}
                      </div>
                      <div className="profile__wishPanelCollectionDescriptionNumber">
                        {getRoomProducts(item.id)}
                      </div>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
        ) : (
          <div>
            {id === userIds ? (
              <div className="profile__wishPanelEmptyList">
                <svg
                  id="EmptyWishlistPlaceholder_svg__Layer_1"
                  viewBox="0 0 261.4 236.3"
                  class="WishlistPage__EmptyWishlistImage-r3vrf4-14 kmzAKM"
                >
                  <path
                    class="EmptyWishlistPlaceholder_svg__st0"
                    d="M31.8.3h133.7c17.5 0 31.8 14.2 31.8 31.8V63H0V32C0 14.5 14.2.3 31.8.3z"
                  ></path>
                  <path
                    class="EmptyWishlistPlaceholder_svg__st0"
                    d="M31.8.3h133.7c17.5 0 31.8 14.2 31.8 31.8V63H0V32C0 14.5 14.2.3 31.8.3z"
                  ></path>
                  <path
                    class="EmptyWishlistPlaceholder_svg__st1"
                    d="M220.7 235c-13.9-3.7-23.5-16.3-23.5-30.7V31.8C197.2 14.2 183 0 165.5 0H32c17.5 0 31.7 14.2 31.7 31.8v172.6c0 17.5 14.2 31.8 31.8 31.8H229c-2.8-.1-5.6-.4-8.3-1.2z"
                  ></path>
                  <path
                    class="EmptyWishlistPlaceholder_svg__st1"
                    d="M220.7 235.2c-13.9-3.7-23.5-16.3-23.5-30.7V31.9C197.2 14.4 183 .1 165.4.1H32c17.5 0 31.7 14.2 31.7 31.8v172.6c0 17.5 14.2 31.8 31.8 31.8H229c-2.8 0-5.6-.4-8.3-1.1z"
                  ></path>
                  <path
                    class="EmptyWishlistPlaceholder_svg__st0"
                    d="M111.5 33.7h64.9v5.8h-64.9zM96.2 58.8c2.2-.1 4.1 1.6 4.2 3.8v.2c0 2.6-2.1 5.1-6.9 8.6l-.5.4-.6-.4c-4.7-3.5-6.9-6-6.9-8.6 0-2.2 1.8-4 4-4h.2c1.2 0 2.4.5 3.2 1.3 1-.8 2.1-1.3 3.3-1.3zm15.3 3.6h64.9v5.8h-64.9zM96.2 87.6c2.2-.1 4.1 1.6 4.2 3.8v.2c0 2.6-2.1 5.1-6.9 8.6l-.6.4-.6-.4c-4.7-3.5-6.9-6-6.9-8.6 0-2.2 1.8-4 4-4h.2c1.2 0 2.4.5 3.2 1.3 1.1-.9 2.2-1.3 3.4-1.3zm15.3 3.6h64.9V97h-64.9zm-15.3 25.1c2.2-.1 4.1 1.6 4.2 3.8v.2c0 2.6-2.1 5.1-6.9 8.6l-.6.4-.6-.4c-4.7-3.5-6.9-6-6.9-8.6 0-2.2 1.8-4 4-4h.2c1.2 0 2.4.5 3.2 1.3 1.1-.8 2.2-1.3 3.4-1.3zm15.3 3.6h64.9v5.8h-64.9zM96.2 145c2.2-.1 4.1 1.6 4.2 3.8v.2c0 2.6-2.1 5.1-6.9 8.6l-.6.4-.6-.4c-4.7-3.5-6.9-6-6.9-8.6 0-2.2 1.8-4 4-4h.2c1.2 0 2.4.5 3.2 1.3 1.1-.8 2.2-1.3 3.4-1.3zm15.3 3.6h64.9v5.9h-64.9zm-15.3 25.2c2.2-.1 4.1 1.6 4.2 3.8v.2c0 2.6-2.1 5.1-6.9 8.6l-.6.4-.6-.4c-4.7-3.5-6.9-6-6.9-8.6 0-2.2 1.8-4 4-4h.2c1.2 0 2.4.5 3.2 1.3 1.1-.9 2.2-1.3 3.4-1.3zm15.3 3.6h64.9v5.9h-64.9zm-15.3 25.1c2.2-.1 4.1 1.6 4.2 3.8v.2c0 2.6-2.1 5.1-6.9 8.6l-.6.4-.6-.4c-4.7-3.5-6.9-6-6.9-8.6 0-2.2 1.8-4 4-4h.2c1.2 0 2.4.5 3.2 1.3 1.1-.8 2.2-1.3 3.4-1.3zm15.3 3.6h64.9v5.9h-64.9z"
                  ></path>
                  <path
                    class="EmptyWishlistPlaceholder_svg__st0"
                    d="M261.3 201.2v2.9c0 17.5-14.2 31.7-31.7 31.8h-134c17.5 0 31.8-14.2 31.8-31.7v-2.9l133.9-.1z"
                  ></path>
                  <path
                    class="EmptyWishlistPlaceholder_svg__st1"
                    d="M190 104.9c-.1 0-.1 0 0 0-.1-.1-.1-.1 0 0z"
                  ></path>
                  <path
                    d="M213.8 84.6c-8.3 9.5-22.1 19.1-23.9 20.2l-.1.1s-.1 0-.1-.1c-1.8-1.2-15.6-10.7-23.9-20.2-8.8-10.2-9.3-17.1-8.8-21.4.6-4.2 3.6-13.3 14.8-15.3 10.5-1.9 17.2 4.6 18 5.4.8-.8 7.5-7.3 18-5.4 11.2 2 14.2 11.1 14.8 15.3.6 4.2.1 11.2-8.8 21.4z"
                    fill="#ec2f4d"
                  ></path>
                  <path
                    class="EmptyWishlistPlaceholder_svg__st0"
                    d="M98.3 39.1c-1.8 2.1-4.9 4.2-5.3 4.5-.4-.3-3.5-2.4-5.3-4.5-2-2.3-2.1-3.8-2-4.8.1-.9.8-3 3.3-3.4 2.3-.4 3.8 1 4 1.2.2-.2 1.7-1.6 4-1.2 2.5.5 3.2 2.5 3.3 3.4.1 1 0 2.6-2 4.8z"
                  ></path>
                  <path
                    class="EmptyWishlistPlaceholder_svg__st1"
                    d="M190 104.8z"
                  ></path>
                  <circle
                    transform="matrix(.00489 -1 1 .00489 81.01 263.24)"
                    cx="172.8"
                    cy="90.9"
                    fill="#2fb7ec"
                    r="10.4"
                  ></circle>
                  <path
                    d="M178.1 90.1h-4.4c-.1 0-.2-.1-.2-.2v-4.4c0-.1-.1-.2-.2-.2h-1.2c-.1 0-.2.1-.2.2v4.4c0 .1-.1.2-.2.2h-4.4c-.1 0-.2.1-.2.2v1.2c0 .1.1.2.2.2h4.4c.1 0 .2.1.2.2v4.4c0 .1.1.2.2.2h1.2c.1 0 .2-.1.2-.2v-4.4c0-.1.1-.2.2-.2h4.4c.1 0 .2-.1.2-.2v-1.2c0-.1-.1-.2-.2-.2z"
                    fill="#fff"
                  ></path>
                </svg>
                <div className="profile__wishPanelEmptyListTitle">
                  Your wishlist is empty!
                </div>
                <div className="profile__wishPanelEmptyListText">
                  Create a wishlist to save your favorite items
                </div>

                <CustomInput
                  name="wishname"
                  control={control}
                  rules={{
                    required: "Name is required",
                    minLength: {
                      value: 3,
                      message: "Name should be at least 3 characters long",
                    },
                    maxLength: {
                      value: 24,
                      message: "Name should be max 24 characters long",
                    },
                  }}
                />
                <CustomButton
                  text="Create Wishlist"
                  onPress={handleSubmit(onSavePressed)}
                />
              </div>
            ) : (
              <div className="profile__wishPanelEmptyList">
                <svg
                  id="EmptyWishlistPlaceholder_svg__Layer_1"
                  viewBox="0 0 261.4 236.3"
                  class="WishlistPage__EmptyWishlistImage-r3vrf4-14 kmzAKM"
                >
                  <path
                    class="EmptyWishlistPlaceholder_svg__st0"
                    d="M31.8.3h133.7c17.5 0 31.8 14.2 31.8 31.8V63H0V32C0 14.5 14.2.3 31.8.3z"
                  ></path>
                  <path
                    class="EmptyWishlistPlaceholder_svg__st0"
                    d="M31.8.3h133.7c17.5 0 31.8 14.2 31.8 31.8V63H0V32C0 14.5 14.2.3 31.8.3z"
                  ></path>
                  <path
                    class="EmptyWishlistPlaceholder_svg__st1"
                    d="M220.7 235c-13.9-3.7-23.5-16.3-23.5-30.7V31.8C197.2 14.2 183 0 165.5 0H32c17.5 0 31.7 14.2 31.7 31.8v172.6c0 17.5 14.2 31.8 31.8 31.8H229c-2.8-.1-5.6-.4-8.3-1.2z"
                  ></path>
                  <path
                    class="EmptyWishlistPlaceholder_svg__st1"
                    d="M220.7 235.2c-13.9-3.7-23.5-16.3-23.5-30.7V31.9C197.2 14.4 183 .1 165.4.1H32c17.5 0 31.7 14.2 31.7 31.8v172.6c0 17.5 14.2 31.8 31.8 31.8H229c-2.8 0-5.6-.4-8.3-1.1z"
                  ></path>
                  <path
                    class="EmptyWishlistPlaceholder_svg__st0"
                    d="M111.5 33.7h64.9v5.8h-64.9zM96.2 58.8c2.2-.1 4.1 1.6 4.2 3.8v.2c0 2.6-2.1 5.1-6.9 8.6l-.5.4-.6-.4c-4.7-3.5-6.9-6-6.9-8.6 0-2.2 1.8-4 4-4h.2c1.2 0 2.4.5 3.2 1.3 1-.8 2.1-1.3 3.3-1.3zm15.3 3.6h64.9v5.8h-64.9zM96.2 87.6c2.2-.1 4.1 1.6 4.2 3.8v.2c0 2.6-2.1 5.1-6.9 8.6l-.6.4-.6-.4c-4.7-3.5-6.9-6-6.9-8.6 0-2.2 1.8-4 4-4h.2c1.2 0 2.4.5 3.2 1.3 1.1-.9 2.2-1.3 3.4-1.3zm15.3 3.6h64.9V97h-64.9zm-15.3 25.1c2.2-.1 4.1 1.6 4.2 3.8v.2c0 2.6-2.1 5.1-6.9 8.6l-.6.4-.6-.4c-4.7-3.5-6.9-6-6.9-8.6 0-2.2 1.8-4 4-4h.2c1.2 0 2.4.5 3.2 1.3 1.1-.8 2.2-1.3 3.4-1.3zm15.3 3.6h64.9v5.8h-64.9zM96.2 145c2.2-.1 4.1 1.6 4.2 3.8v.2c0 2.6-2.1 5.1-6.9 8.6l-.6.4-.6-.4c-4.7-3.5-6.9-6-6.9-8.6 0-2.2 1.8-4 4-4h.2c1.2 0 2.4.5 3.2 1.3 1.1-.8 2.2-1.3 3.4-1.3zm15.3 3.6h64.9v5.9h-64.9zm-15.3 25.2c2.2-.1 4.1 1.6 4.2 3.8v.2c0 2.6-2.1 5.1-6.9 8.6l-.6.4-.6-.4c-4.7-3.5-6.9-6-6.9-8.6 0-2.2 1.8-4 4-4h.2c1.2 0 2.4.5 3.2 1.3 1.1-.9 2.2-1.3 3.4-1.3zm15.3 3.6h64.9v5.9h-64.9zm-15.3 25.1c2.2-.1 4.1 1.6 4.2 3.8v.2c0 2.6-2.1 5.1-6.9 8.6l-.6.4-.6-.4c-4.7-3.5-6.9-6-6.9-8.6 0-2.2 1.8-4 4-4h.2c1.2 0 2.4.5 3.2 1.3 1.1-.8 2.2-1.3 3.4-1.3zm15.3 3.6h64.9v5.9h-64.9z"
                  ></path>
                  <path
                    class="EmptyWishlistPlaceholder_svg__st0"
                    d="M261.3 201.2v2.9c0 17.5-14.2 31.7-31.7 31.8h-134c17.5 0 31.8-14.2 31.8-31.7v-2.9l133.9-.1z"
                  ></path>
                  <path
                    class="EmptyWishlistPlaceholder_svg__st1"
                    d="M190 104.9c-.1 0-.1 0 0 0-.1-.1-.1-.1 0 0z"
                  ></path>
                  <path
                    d="M213.8 84.6c-8.3 9.5-22.1 19.1-23.9 20.2l-.1.1s-.1 0-.1-.1c-1.8-1.2-15.6-10.7-23.9-20.2-8.8-10.2-9.3-17.1-8.8-21.4.6-4.2 3.6-13.3 14.8-15.3 10.5-1.9 17.2 4.6 18 5.4.8-.8 7.5-7.3 18-5.4 11.2 2 14.2 11.1 14.8 15.3.6 4.2.1 11.2-8.8 21.4z"
                    fill="#ec2f4d"
                  ></path>
                  <path
                    class="EmptyWishlistPlaceholder_svg__st0"
                    d="M98.3 39.1c-1.8 2.1-4.9 4.2-5.3 4.5-.4-.3-3.5-2.4-5.3-4.5-2-2.3-2.1-3.8-2-4.8.1-.9.8-3 3.3-3.4 2.3-.4 3.8 1 4 1.2.2-.2 1.7-1.6 4-1.2 2.5.5 3.2 2.5 3.3 3.4.1 1 0 2.6-2 4.8z"
                  ></path>
                  <path
                    class="EmptyWishlistPlaceholder_svg__st1"
                    d="M190 104.8z"
                  ></path>
                  <circle
                    transform="matrix(.00489 -1 1 .00489 81.01 263.24)"
                    cx="172.8"
                    cy="90.9"
                    fill="#2fb7ec"
                    r="10.4"
                  ></circle>
                  <path
                    d="M178.1 90.1h-4.4c-.1 0-.2-.1-.2-.2v-4.4c0-.1-.1-.2-.2-.2h-1.2c-.1 0-.2.1-.2.2v4.4c0 .1-.1.2-.2.2h-4.4c-.1 0-.2.1-.2.2v1.2c0 .1.1.2.2.2h4.4c.1 0 .2.1.2.2v4.4c0 .1.1.2.2.2h1.2c.1 0 .2-.1.2-.2v-4.4c0-.1.1-.2.2-.2h4.4c.1 0 .2-.1.2-.2v-1.2c0-.1-.1-.2-.2-.2z"
                    fill="#fff"
                  ></path>
                </svg>

                <div className="profile__wishPanelEmptyListText">
                  This user's wishlist is empty!
                </div>

                <div className="profile__wishPanelEmptyListBtn">
                  Continue Shopping
                </div>
              </div>
            )}
          </div>
        )}
      </div>
      {isOpenWish && <NewWishModel setIsOpenWish={setIsOpenWish} />}

      {isFollowerModel === true && (
        <FollowerUsers setIsFollowerModel={setIsFollowerModel} onFollow={onFollow} onUnfollow={onUnfollow}  />
      )}
       {isFollowingModel === true && (
        <FollowingUsers setIsFollowingModel={setIsFollowingModel} onFollow={onFollow} onUnfollow={onUnfollow} />
      )}
    </div>
  );
}

const mapStateToProps = (store) => ({
  baskets: store.basketsState.baskets,
  currentUser: store.userState.currentUser,
  following: store.userState.following,
  follower: store.userState.follower,
  rooms: store.usersState.rooms,
});

const mapDispatchProps = (dispatch) =>
  bindActionCreators({ addToBasket, reload, fetchData }, dispatch);

export default connect(mapStateToProps, mapDispatchProps)(Profile);
