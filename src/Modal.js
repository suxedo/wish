import React, { useState, useEffect } from "react";
import "./Modal.css";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import Products from "./Products";
import Related from "./Related";
import CurrencyFormat from "react-currency-format";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { addToBasket, fetchUsersData } from "./redux/actions";
import DropdownOptions from "./DropdownOptions";
import ReviewsData from "./ReviewsData";
import { Auth, DataStore, SortDirection } from "aws-amplify";
import { useForm } from "react-hook-form";

import {
  CartProduct,
  Comment,
  Product,
  WishProducts,
  WishRooms,
} from "./models";
import CustomInput from "./components/CustomInput";
import CustomButton from "./components/CustomButton";
import CommentCard from "./components/CommentCard";
import SelectWishModel from "./components/SelectWishModel";
function Modal(props) {
  const { name } = useParams();
  const navigate = useNavigate();
  const [activeScreen, setActiveScreen] = useState("Overview");
  const [open, setOpen] = useState(false);
  const [openSize, setOpenSize] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedOptionSize, setSelectedOptionSize] = useState(null);
  const [products, setProducts] = useState([]);
  const { baskets, addToBasket, quantity, users, fetchUsersData, rooms } =
    props;
  const [empty] = useState(null);
  const { control, handleSubmit, watch, reset } = useForm({});
  const [comments, setComments] = useState([]);
  const [postId, setPostId] = useState("");
  const [refresh, setRefresh] = useState(false);
  const [isSelectRoom, setIsSelectRoom] = useState(false);
  const [iwish, setIwish] = useState(false);
  const [myRoom, setMyRoom] = useState([]);
  const [delIds, setDelIds] = useState([]);
  const [noReviws, setNoReviws] = useState([])
  const [userIds, setUserIds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedType, setSelectedType] = useState([]);

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
    getComments();
    if (props.iwish.indexOf(name) > -1) {
      setIwish(true);
    } else {
      setIwish(false);
    }
  }, [name, users, refresh]);

  useEffect(() => {
    getCurrentUserWishList();
  }, [props.currentUser, props.following]);

  const getCurrentUserWishList = async () => {
    const user = await Auth.currentAuthenticatedUser();
    DataStore.query(WishRooms, (u) =>
      u.userSub("eq", user.attributes.sub),
      {
        sort: (u) => u.createdAt(SortDirection.DESCENDING),
      }
    ).then((data) => {
      let rooms = data.map((doc) => {
        const id = doc;
        return id;
      });

      setMyRoom(rooms);
    });

    setUserIds(user.attributes.sub);
    setLoading(false);
  };

  useEffect(() => {
    const subscription = DataStore.observe(Comment).subscribe((msg) => {
      // console.log(msg.model, msg.opType, msg.element);
      if (msg.model === Comment && msg.opType === "INSERT") {
        getComments();
      }
      if (msg.model === Comment && msg.opType === "DELETE") {
        getComments();
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const matchUserToComment = (comments) => {
    for (let i = 0; i < comments.length; i++) {
      if (comments[i].hasOwnProperty("user")) {
        continue;
      }
      console.log(comments.user);

      const user = users[0].find((x) => x.userSub === comments[i].creatorId);

      console.log(users);

      if (user === undefined) {
        fetchUsersData(comments[i].creatorId, false);
      } else {
        comments[i].user = user;
      }
    }
    setComments(comments);

    setRefresh(false);
  };

  const getComments = () => {
    if (name !== postId || refresh) {
      DataStore.query(Comment, (u) => u.productId("eq", name),
      {
        sort: (u) => u.createdAt(SortDirection.DESCENDING),
      }).then(
        (snapshot) => {
          let comments = snapshot.map((doc) => {
            const data = doc;
            const id = doc.id;
            return { id, ...data };
          });

          matchUserToComment(comments);
        }
      );

      setPostId(name);
    } else {
      matchUserToComment(comments);
    }
  };

 


  const onSavePressed = async (data) => {
    const { comment } = data;

    const userData = await Auth.currentAuthenticatedUser();
    // create a new order
    DataStore.save(
      new Comment({
        creatorId: userData.attributes.sub,
        productId: name,
        text: comment,
      })
    );
    console.log("saved");
    reset({
      comment: "",
    });
  };

  const getCurrentId = async () => {
    const user = await Auth.currentAuthenticatedUser();
    await DataStore.query(WishProducts, (u) =>
      u.userSub("eq", user.attributes.sub).productId("eq", name)
    ).then((data) => {
      let del = data.map((doc) => {
        console.log(doc);

        const all = doc.id;
        return all;
      });
      setDelIds(del[0]);
    });
  };
  useEffect(() => {
    getCurrentId();
  }, [name]);
  useEffect(() => {
    const subscription = DataStore.observe(WishProducts).subscribe((msg) => {
      // console.log(msg.model, msg.opType, msg.element);
      if (msg.model === WishProducts && msg.opType === "INSERT") {
        getCurrentId();
      }
      if (msg.model === WishProducts && msg.opType === "DELETE") {
        getCurrentId();
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const removeFromWishList = async () => {
    const modelToDelete = await DataStore.query(WishProducts, delIds);

    DataStore.delete(modelToDelete);
  };

  const handleClickCart = (value) => async () => {
    const userData = await Auth.currentAuthenticatedUser();
    const newCartProduct = new CartProduct({
      userSub: userData.attributes.sub,
      quantity: 1,
      option: selectedOption,
      productId: value.id,
    });

    await DataStore.save(newCartProduct);
  };

  React.useEffect(() => {
    async function fetchProduct() {
      try {
        await DataStore.query(Product).then(setProducts);
      } catch (error) {
        console.log(error);
      }
    }
    fetchProduct();
    
  }, []);

  const handleClick = (e) => {
    e.preventDefault(navigate(-1));
  };
  const onClic = (e) => {
    e.preventDefault();
  };
  const openDropdown = (e) => {
    if (open === false) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  };
  const openDropdownSize = (e) => {
    if (openSize === false) {
      setOpenSize(true);
    } else {
      setOpenSize(false);
    }
  };
  const onOptionClicked = (value) => () => {
    setSelectedOption(value);
    setOpen(false);
  };

  const onOptionClickedSize = (value) => () => {
    setSelectedOptionSize(value);
    setOpenSize(false);
  };
  function getRelated() {
    let pro = Products.filter((a) => a.name === name);
    if (pro.length > 0) {
      return pro.map((item) => {
        return item.categories;
      });
    }
  }
 
  


  function ProductReview() {
    return (
      <div>
        <div className="ProductReview__container">
          <div className="ProductReview__header">
            <h2 className="ProductReview__title">Customer Review</h2>

            <div className="ProductReview__btn"> Show more</div>
          </div>
          {comments.length === 0 ? (
            <div>
              <h3>No Reviews, Be The first to review</h3>
            </div>
          ) : (
            <div>
              {comments.map((item) => {
                return (
                  <CommentCard
                    username={item?.user?.username}
                    image={item?.user?.username[0].toUpperCase()}
                    text={item?.text}
                    userSub={item?.user?.userSub}
                    date={item?.user?.createdAt.substring(0, 4)}
                    no={item?.user?.userSub}
                    
                  />
                );
              })}
            </div>
          )}
        </div>
      </div>
    );
  }

  function getProductDetails() {
    let serviceDetails = products.filter((a) => a.id === name);
    if (serviceDetails.length > 0) {
      return serviceDetails.map((item) => {
        return (
          <div className="modal__ProductContainer">
            <div className="modal__ProductContainerLeft">
              <div className="modal__ProductImageContainer">
                <img alt="dd" className="cc" src={item.url} />
              </div>

              <div>
                <div style={{ border: "1px solid rgb(240, 245, 247)" }}></div>
                <div style={{ margin: "20px" }}>
                  <div
                    style={{
                      flexDirection: "row",
                      display: "flex",
                      marginTop: "30px",
                    }}
                  >
                    <h4 style={{ marginRight: "10px" }}>Standard Shipping</h4>
                    <p>$4</p>
                  </div>
                  <div>7 Feb - 29 Mar</div>
                  <div>Items are sold and shipped by XZQevo</div>
                </div>
                <div
                  style={{
                    border: "1px solid rgb(240, 245, 247)",
                    marginBottom: "30px",
                  }}
                ></div>

                <div>
                  <div
                    style={{
                      flexDirection: "row",
                      display: "flex",
                      marginTop: "30px",
                    }}
                  >
                    <h4 style={{ marginRight: "10px" }}>Description</h4>
                    <p>{item.description}</p>
                  </div>
                </div>

                <div
                  style={{
                    border: "1px solid rgb(240, 245, 247)",
                    marginBottom: "30px",
                  }}
                ></div>
                {ProductReview()}
                <div className="">
                  <CustomInput
                    name="comment"
                    control={control}
                    placeholder="write a comment here"
                    rules={{
                      required: "Address is required",
                      minLength: {
                        value: 5,
                        message: "Address should be at least 3 characters long",
                      },
                      maxLength: {
                        value: 50,
                        message: "Address should be max 24 characters long",
                      },
                    }}
                  />
                  <CustomButton
                    text="Comment"
                    onPress={handleSubmit(onSavePressed)}
                  />
                </div>
              </div>
            </div>
            <div className="modal__ProductContainerRight">
              <div className="modal__ProductContainerRightWrapper">
                <div className="modal__ProductContainerRightUpper">
                  <h1 className="modal__ProductContainerRightUpperText">
                    {item.name}
                  </h1>
                  <div className="modal__ProductContainerRightUpperRating">
                    <div className="modal__ProductContainerRightUpperRate">
                      {Array(5)
                        .fill()
                        .map((_, i) => (
                          <svg
                            viewBox="0 0 14 13"
                            xmlns="http://www.w3.org/2000/svg"
                            data-testid="star-full-icon"
                            style={{
                              height: "16px",
                              width: "16px",
                              cursor: "auto",
                              margin: "0px 4px 0px 0px",
                            }}
                          >
                            <path
                              d="M3.142 11.886c-.55.28-.91.027-.806-.567l.642-3.617L.26 5.14c-.445-.42-.307-.83.308-.917l3.754-.528L6.002.405c.275-.54.72-.54.996 0l1.679 3.29 3.754.528c.615.087.754.497.307.917l-2.716 2.562.642 3.617c.105.594-.256.847-.806.567L6.5 10.178l-3.358 1.708z"
                              fill="#2fb7ec"
                            ></path>
                          </svg>
                        ))}
                    </div>
                    <div className="modal__ProductContainerRightUpperRateAmount">
                      (4010 reviews)
                    </div>
                  </div>
                  <div className="modal__ProductContainerRightUpperPrice">
                    <CurrencyFormat
                      renderText={(value) => (
                        <>
                          <h3> {value}</h3>
                        </>
                      )}
                      decimalScale={2}
                      value={item.price} // Part of the homework
                      displayType={"text"}
                      thousandSeparator={true}
                      prefix={"₦"}
                    />
                  </div>
                  {item.color.length >= 1 && (
                    <div className="modal__DimensionSelection">
                      <div className="modal__DimensionSelectionWrapper">
                        <div className="modal__DimesionSelectionType">
                          Color:
                        </div>
                        <DropdownOptions
                          options={item.color}
                          openDropdown={openDropdown}
                          selectedOption={selectedOption}
                          open={open}
                          onOptionClicked={onOptionClicked}
                          type={item}
                          isSelected={item === selectedOption}
                        />
                      </div>
                    </div>
                  )}

                  {item.size.length >= 1 && (
                    <div className="modal__DimensionSelection">
                      <div className="modal__DimensionSelectionWrapper">
                        <div className="modal__DimesionSelectionType">
                          Size:
                        </div>
                        <DropdownOptions
                          options={item.size}
                          openDropdown={openDropdownSize}
                          selectedOption={selectedOptionSize}
                          open={openSize}
                          onOptionClicked={onOptionClickedSize}
                        />
                      </div>
                    </div>
                  )}
                </div>
                <div className="modal__ProductContainerRightLower">
                  <div
                    onClick={(e) => {
                      addToBasket(
                        item,
                        selectedOption,
                        selectedOptionSize,
                        item.size[0]
                      );
                      e.preventDefault(navigate(-1));
                    }}
                    className="modal__PoductBuyBtn"
                  >
                    Buy
                  </div>
                  {iwish ? (
                    <div
                      onClick={removeFromWishList}
                      className="model__ProuctWishList"
                    >
                      <div className="model__ProductWishBtn">
                        <svg
                          viewBox="0 0 21 19"
                          style={{
                            width: "27px",
                            height: "19px",
                            padding: "0px 6px 0px 0px",
                          }}
                        >
                          <path
                            d="M15.25 0C18.496 0 21 2.51 21 5.781c0 1.046-.26 2.053-.772 3.068-.677 1.341-1.751 2.663-3.544 4.477-.611.619-4.287 4.176-5.472 5.376-.1879198.190548-.4443764.2978205-.712.2978205-.2676236 0-.52408017-.1072725-.712-.2978205-1.185-1.2-4.86-4.757-5.472-5.376C2.523 11.512 1.45 10.19.772 8.849.261 7.834 0 6.827 0 5.78 0 2.511 2.504 0 5.75 0c1.831 0 3.606.88 4.75 2.251C11.643.88 13.417 0 15.25 0z"
                            fill="#ec2f4d"
                            fill-rule="nonzero"
                          ></path>
                        </svg>
                        Remove From Wishlist
                      </div>
                    </div>
                  ) : (
                    <div
                      onClick={() => {
                        setIsSelectRoom(true);
                      }}
                      className="model__ProuctWishList"
                    >
                      <div className="model__ProductWishBtn">
                        <svg
                          viewBox="0 0 21 19"
                          style={{
                            width: "27px",
                            height: "19px",
                            padding: "0px 6px 0px 0px",
                          }}
                        >
                          <path
                            fill="#7e9aa6"
                            d="M15.25 0C18.496 0 21 2.51 21 5.781c0 1.046-.26 2.053-.772 3.068-.677 1.341-1.751 2.663-3.544 4.477-.611.619-4.287 4.176-5.472 5.376a1 1 0 0 1-1.424 0c-1.185-1.2-4.86-4.757-5.472-5.376C2.523 11.512 1.45 10.19.772 8.849.261 7.834 0 6.827 0 5.78 0 2.511 2.504 0 5.75 0c1.831 0 3.606.88 4.75 2.251C11.643.88 13.417 0 15.25 0zm.011 11.92c1.658-1.677 2.622-2.862 3.181-3.972.376-.746.558-1.448.558-2.167C19 3.614 17.39 2 15.25 2c-1.643 0-3.256 1.087-3.817 2.546-.328.855-1.538.855-1.866 0C9.006 3.087 7.392 2 5.75 2 3.61 2 2 3.614 2 5.781c0 .719.182 1.42.558 2.167.56 1.11 1.523 2.295 3.18 3.972.5.506 3.21 3.13 4.762 4.667 1.553-1.536 4.262-4.161 4.761-4.667z"
                          ></path>
                        </svg>
                        Add to Wishlist
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        );
      });
    }
  }
  return (
    <div className="main">
      <div>
        <div className="modal">
          <div onClick={onClic} className="modal__mainContent">
            <div className="modal__Wrapper">
              <div className="modal__TabHeader">
                <div className="modal__TabHeaderWrapper">
                  <div className="modal__TabHeaderContent">
                    <span className="modal__Tab1Wrapper">
                      <div
                        onClick={() => setActiveScreen("Overview")}
                        className="modal__Tab1"
                      >
                        <div
                          className={
                            activeScreen === "Overview" ? "modal__Tab11" : ""
                          }
                        >
                          <h1 className="modal__Tab11Text">Overview</h1>
                        </div>
                      </div>
                    </span>
                    <span className="modal__Tab1Wrapper">
                      <div
                        onClick={() => setActiveScreen("Related")}
                        className="modal__Tab1"
                      >
                        <div
                          className={
                            activeScreen === "Related" ? "modal__Tab11" : ""
                          }
                        >
                          <h1 className="modal__Tab11Text">Related</h1>
                        </div>
                      </div>
                    </span>
                  </div>
                  <div onClick={handleClick} className="modal__TabCancelBtn">
                    <svg
                      viewBox="0 0 10 10"
                      xmlns="http://www.w3.org/2000/svg"
                      role="button"
                      style={{ height: "14px", width: "14px" }}
                    >
                      <g
                        stroke="#192a32"
                        stroke-width="1.5"
                        fill="none"
                        fill-rule="evenodd"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      >
                        <path d="M1 1l8 8M9 1L1 9"></path>
                      </g>
                    </svg>
                  </div>
                </div>
              </div>
              {activeScreen === "Overview" && (
                <div>
                  {getProductDetails()}

                  {getRelated()}
                </div>
              )}

              {activeScreen === "Related" && <Related />}
            </div>
          </div>
        </div>
      </div>
      {isSelectRoom === true && (
        <SelectWishModel
          setIsSelectRoom={setIsSelectRoom}
          productId={name}
          myRoom={myRoom}
          iwish={iwish}
        />
      )}
    </div>
  );
}

const mapStateToProps = (store) => ({
  baskets: store.basketsState.baskets,
  quantity: store.basketsState.quantity,
  users: store.usersState.users,
  iwish: store.userState.iwish,
  rooms: store.usersState.rooms,
});

const mapDispatchProps = (dispatch) =>
  bindActionCreators({ addToBasket, fetchUsersData }, dispatch);

export default connect(mapStateToProps, mapDispatchProps)(Modal);
