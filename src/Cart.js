import React, { useState, useEffect } from "react";
import "./Cart.css";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { addToBasket, removeFromBasket } from "./redux/actions";

import {
  getCartCount,
  getBasketTotal,
  getShippingTotal,
} from "./redux/reducers/baskets";

import NewAddress from "./NewAddress";
import OrderSummary from "./OrderSummary";
import CartListItems from "./CartListItems";
import PaymentCart from "./PaymentCart";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Order } from "./models";
import { Auth, DataStore } from "aws-amplify";
import SelectedAddressRowTypes from "./components/SelectedAddressRowTypes";
import useWindowSize from "./utils/useWindowSize";


function Cart(props) {
  const [open, setOpen] = useState(false);
  const [openPayment, setOpenPayment] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
 
  const [selectedAddress, setSelectedAddress] = useState([0]);
  const [options, setOptions] = useState([1, 2, 3, 4, 5]);
  const [activeScreen, setActiveScreen] = useState("");
  const [openNewAddress, setOpenNewAddress] = useState(false);
  const [address, setAddress] = useState("");
  const [openChangeAddress, setOpenChangeAddress] = useState(false);
 
  const [openOldAdd, setOpenOldAdd] = useState(true);
  const [editAddressId, setEditAddressId] = useState(null);
  const [addressToFalseId, setAddressToFalseId] = useState([]);
  const [addAddress, setAddAddress] = useState(false);

  const [selectedTypeAddress, setSelectedTypeAddress] = useState([]);
  const { height, width } = useWindowSize();

  const [existAddress, setExistAddress] = useState(null);

  const { baskets, addToBasket, removeFromBasket } = props;

  const openDropdown = (e) => {
    if (open === false) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  };

  const openPaymentDropdown = (e) => {
    setOpenPayment(true);
    setActiveScreen("Card");
  };
  const openPaymentPayPal = (e) => {
    setOpenPayment(true);
    setActiveScreen("Paypal");
  };
  const openChange = (e) => {
    setOpenChangeAddress(true);
    setOpenOldAdd(false);
  };

  const openNewAddressDropdown = (e) => {
    setOpenNewAddress(true);
    setOpenChangeAddress(false);
  };
  const openAddNewAddressDropdown = (e) => {
    setOpenChangeAddress(true);
    setOpenNewAddress(true);
    setAddAddress(true);
  };
 
  const openEditAddressDropdown = (item) => () => {
  
    setEditAddressId(item);
    
  };


  const cancelPaymentDropdown = (e) => {
    setOpenPayment(false);
    setActiveScreen("");
  };
  const cancelAddressDropdown = (e) => {
    if (editAddressId) {
      setEditAddressId("");
    } else {
      setOpenNewAddress(false);
      setAddAddress(false);
    }
  };
  const oldAddress = () => {
    setOpenOldAdd(true);
    setOpenNewAddress(false);
  };
  const fetchExist = async () => {
    const userData = await Auth.currentAuthenticatedUser();
    console.log(userData);
    // if address exists already
    DataStore.query(Order, (cp) =>
      cp.userSub("eq", userData.attributes.sub)
    ).then(setExistAddress);
  };

  useEffect(() => {
    fetchExist();
  }, []);



  const onOptionClicked = (value) => () => {
    setSelectedOption(value);
    setOpen(false);
  };
  const fetchCartProducts = async () => {
    const userData = await Auth.currentAuthenticatedUser();
    console.log(userData);
    // TODO query only my cart items
    DataStore.query(Order, (cp) =>
      cp.userSub("eq", userData.attributes.sub)
    ).then(setAddress);
  };

  useEffect(() => {
    fetchCartProducts();
  }, []);

  useEffect(() => {
    const subscription = DataStore.observe(Order).subscribe((msg) => {
      // console.log(msg.model, msg.opType, msg.element);
      if (msg.model === Order && msg.opType === "INSERT") {
        fetchSelectedAddress();
        fetchCartProducts()
      }
      if (msg.model === Order && msg.opType === "DELETE") {
        fetchSelectedAddress();
        fetchCartProducts()
      }
      if (msg.model === Order && msg.opType === "UPDATE") {
        fetchSelectedAddress();
        fetchCartProducts()
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchSelectedAddress = async () => {
    const userData = await Auth.currentAuthenticatedUser();
    // TODO query only my cart items
    DataStore.query(Order, (cp) =>
      cp.userSub("eq", userData.attributes.sub).check("eq", true)
    ).then(setSelectedAddress);
  };

  useEffect(() => {
    fetchSelectedAddress();

    changeCurrentAddress();
  }, []);

  const changeCurrentAddress = async () => {
    const userData = await Auth.currentAuthenticatedUser();
    await DataStore.query(Order, (cp) =>
      cp.userSub("eq", userData.attributes.sub)
    ).then((data) => {
      let addressFalse = data.map((doc) => {
        const all = doc.id;

        return all;
      });
      console.log(addressFalse);
      setAddressToFalseId(addressFalse);
    });
  };
  const onValueChange = (value) => async () => {
    setSelectedTypeAddress(value);
    
    setTimeout(async() => {
      for (let index = 0; index < addressToFalseId.length; index++) {
        const origina = await DataStore.query(Order, addressToFalseId[index]);
  
        const updatedOrderf = Order.copyOf(origina, (updated) => {
          updated.check = false;
        });
  
        DataStore.save(updatedOrderf);
      }

      
    }, 1000);
 

    setTimeout(async () => {
      const original = await DataStore.query(Order, (cp) => cp.id("eq", value));
      const s = original[0];
      const updatedOrder = Order.copyOf(s, (updated) => {
        updated.check = true;
      });

      await DataStore.save(updatedOrder);

      setOpenOldAdd(true);
      setOpenNewAddress(false);
      setOpenChangeAddress(false);

    }, 2000);
    
   
  };

  return (
    <div className="cart">
      <div className="cart__Wrapper">
        <div className="cart__MainContent">
          <div className="cart__MainContentLeft">
            {baskets.length !== 0 ? (
              <div className="cart__InfoWrapper">
                <div className="cart__InfoText">Shipping</div>
                <motion.div
                  key="content"
                  initial="collapsed"
                  animate="open"
                  exit="collapsed"
                  variants={{
                    open: { opacity: 1, height: "auto" },
                    collapsed: { opacity: 0, height: 0 },
                  }}
                  transition={{ duration: 0.2, ease: [0.04, 0.62, 0.23, 0.98] }}
                  className="cart__InfoCommon"
                >
                  <div className="cart__InfoCommonWrapper">
                    {openChangeAddress === true && (
                      <div>
                        {addAddress === false ? (
                          <>
                            {editAddressId ? (
                              <div>
                                <NewAddress
                                  editAddressId={editAddressId}
                                  cancelAddressDropdown={cancelAddressDropdown}
                                  oldAddress={oldAddress}
                                  setOpenOldAdd={setOpenOldAdd}
                                />
                              </div>
                            ) : (
                              <div>
                                {address?.map((item) => {
                                  
                                  return (
                                    <>
                                    <div style={{display:'flex', flexDirection:'row', justifyContent:'space-between', width:'100%', flex:'1', alignItems:'center'}}>
                                    <SelectedAddressRowTypes
                                      type={item}
                                      isSelected={
                                        item.id === selectedTypeAddress
                                      }
                                      onPress={onValueChange(item.id)}
                                      selectedTypeAddress={selectedTypeAddress}
                                    />
                                    <div style={{marginLeft:'20px'}} onClick={openEditAddressDropdown(item.id)}>
                                      edit
                                    </div>
                                      
                                    </div>
                                    
                                    
                                    </>
                                 
                                  );
                                })}
                              </div>
                            )}
                          </>
                        ) : null}
                        {!editAddressId && (
                          <div>
                            {addAddress === false ? (
                              <>
                                <div className="cart__InfoCommonContent">
                                  <div className="cart__InfoCommonIcon">
                                    <svg
                                      viewBox="0 0 18 18"
                                      style={{ width: "18px", height: "18px" }}
                                    >
                                      <g fill="none" fill-rule="evenodd">
                                        <path d="M0 0h18v18H0z"></path>
                                        <path
                                          fill="#2fb7ec"
                                          d="M10.0909091 9.81818182h4.5c.2181818 0 .4090909-.19090909.4090909-.40909091v-.81818182c0-.21818182-.1909091-.40909091-.4090909-.40909091h-4.5c-.16363637 0-.27272728-.10909091-.27272728-.27272727v-4.5C9.81818182 3.19090909 9.62727273 3 9.40909091 3h-.81818182c-.21818182 0-.40909091.19090909-.40909091.40909091v4.5c0 .16363636-.10909091.27272727-.27272727.27272727h-4.5C3.19090909 8.18181818 3 8.37272727 3 8.59090909v.81818182c0 .21818182.19090909.40909091.40909091.40909091h4.5c.16363636 0 .27272727.10909091.27272727.27272728v4.5c0 .2181818.19090909.4090909.40909091.4090909h.81818182c.21818182 0 .40909091-.1909091.40909091-.4090909v-4.5c0-.16363637.10909091-.27272728.27272728-.27272728z"
                                        ></path>
                                      </g>
                                    </svg>
                                  </div>
                                  <div
                                    onClick={openAddNewAddressDropdown}
                                    className="cart__InfoCommonText"
                                  >
                                    New Address
                                  </div>
                                </div>
                              </>
                            ) : (
                              <NewAddress
                                cancelAddressDropdown={cancelAddressDropdown}
                              />
                            )}
                          </div>
                        )}
                      </div>
                    )}
                    {openOldAdd === true && (
                      <>
                        {selectedAddress <= 0 ? (
                          <>
                            {openNewAddress === false ? (
                              <>
                                <div className="cart__InfoCommonContent">
                                  <div className="cart__InfoCommonIcon">
                                    <svg
                                      viewBox="0 0 18 18"
                                      style={{ width: "18px", height: "18px" }}
                                    >
                                      <g fill="none" fill-rule="evenodd">
                                        <path d="M0 0h18v18H0z"></path>
                                        <path
                                          fill="#2fb7ec"
                                          d="M10.0909091 9.81818182h4.5c.2181818 0 .4090909-.19090909.4090909-.40909091v-.81818182c0-.21818182-.1909091-.40909091-.4090909-.40909091h-4.5c-.16363637 0-.27272728-.10909091-.27272728-.27272727v-4.5C9.81818182 3.19090909 9.62727273 3 9.40909091 3h-.81818182c-.21818182 0-.40909091.19090909-.40909091.40909091v4.5c0 .16363636-.10909091.27272727-.27272727.27272727h-4.5C3.19090909 8.18181818 3 8.37272727 3 8.59090909v.81818182c0 .21818182.19090909.40909091.40909091.40909091h4.5c.16363636 0 .27272727.10909091.27272727.27272728v4.5c0 .2181818.19090909.4090909.40909091.4090909h.81818182c.21818182 0 .40909091-.1909091.40909091-.4090909v-4.5c0-.16363637.10909091-.27272728.27272728-.27272728z"
                                        ></path>
                                      </g>
                                    </svg>
                                  </div>
                                  <div
                                    onClick={openNewAddressDropdown}
                                    className="cart__InfoCommonText"
                                  >
                                    New Address
                                  </div>
                                </div>
                              </>
                            ) : (
                              <NewAddress
                                cancelAddressDropdown={cancelAddressDropdown}
                              />
                            )}
                          </>
                        ) : (
                          <>
                            {selectedAddress?.map((item) => {
                              return (
                                <div className="addressWrapper">
                                  <div className="addressdetails">
                                    <b>{`${item.firstname} ${item.lastname}`}</b>
                                    <p>{item.addressline1}</p>
                                  </div>
                               
                               
                                     <div
                                     onClick={openChange}
                                     className="addressbtn"
                                   >
                                     change
                                   </div>

                                </div>
                              );
                            })}
                          </>
                        )}
                      </>
                    )}
                  </div>
                </motion.div>
                <div className="cart__InfoCommon">
                  <PaymentCart
                    options={options}
                    open={open}
                    baskets={baskets}
                    openDropdown={openDropdown}
                    selectedOption={selectedOption}
                    getCartCount={getCartCount}
                    removeFromBasket={removeFromBasket}
                    onOptionClicked={onOptionClicked}
                    addToBasket={addToBasket}
                    openPaymentDropdown={openPaymentDropdown}
                    openPaymentPayPal={openPaymentPayPal}
                    cancelPaymentDropdown={cancelPaymentDropdown}
                    activeScreen={activeScreen}
                    openPayment={openPayment}
                    openNewAddress={openNewAddress}
                  />

                  <CartListItems
                    options={options}
                    open={open}
                    baskets={baskets}
                    openDropdown={openDropdown}
                    selectedOption={selectedOption}
                    getCartCount={getCartCount}
                    removeFromBasket={removeFromBasket}
                    onOptionClicked={onOptionClicked}
                    addToBasket={addToBasket}
                  />
                </div>
              </div>
            ) : (
              <div className="cart__InfoWrapper">
                <div className="cart__InfoText">Items In Cart</div>
                <div className="cart__InfoCommon">
                  <div className="cart__InfoCommonWrapperEmpty">
                    <div className="cart__InfoCommonEmptyIcon">
                      <svg
                        viewBox="0 0 21 17"
                        xmlns="http://www.w3.org/2000/svg"
                        class="RTLStyles__RTLSupportedSVG-kgrrgi-0 ilAChZ"
                        style={{ width: "20px", height: "17px" }}
                      >
                        <g fill="none" fill-rule="evenodd">
                          <g transform="translate(.56 .52)" fill="#192a32">
                            <ellipse
                              cx="14.753"
                              cy="14.813"
                              rx="1.366"
                              ry="1.285"
                            ></ellipse>
                            <ellipse
                              cx="6.674"
                              cy="14.813"
                              rx="1.366"
                              ry="1.285"
                            ></ellipse>
                            <path d="M1.113 1.873h-.28a.832.832 0 0 1 0-1.665h2.83a1 1 0 0 1 .779.373l1.41 1.752a1 1 0 0 0 .779.373h12.106a1 1 0 0 1 .978 1.207l-1.365 6.422a1 1 0 0 1-.854.784L5.797 12.587a1 1 0 0 1-1.09-.736L2.508 3.583 2.03 2.476a1 1 0 0 0-.917-.603z"></path>
                          </g>
                          <path d="M0-2h21v21H0z"></path>
                        </g>
                      </svg>
                    </div>
                    <div className=" ">Your cart is empty!</div>
                    <Link to="/" className="cart__InfoCommonEmptyBtn">
                      Continue Shopping
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="cart__MainContentRight">
            <OrderSummary
              getBasketTotal={getBasketTotal}
              getShippingTotal={getShippingTotal}
              baskets={baskets}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (store) => ({
  baskets: store.basketsState.baskets,
});

const mapDispatchProps = (dispatch) =>
  bindActionCreators({ addToBasket, removeFromBasket }, dispatch);

export default connect(mapStateToProps, mapDispatchProps)(Cart);
