import React, { useEffect, useState } from "react";
import { Auth, DataStore } from "aws-amplify";
import CustomInput from "./CustomInput";
import { useForm } from "react-hook-form";
import "./SelectWishModel.css";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { addToBasket } from "../redux/actions";
import RoomTypeRow from "./RoomTypeRow";
import { Product, WishProducts, WishRooms } from "../models";
import CustomButton from "./CustomButton";

function SelectWishModel(props) {

  const [userIds, setUserIds] = useState([]);
  const [deleteIds, setDeleteIds] = useState([]);
  const [loading, setLoading] = useState(true);
  const { control, handleSubmit, watch, reset } = useForm({});
  const { setIsSelectRoom, productId, rooms, myRoom, iwish } = props;
  const [selectedType, setSelectedType] = useState([]);
  const [products, setProducts] = useState([]);
 

 

 

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

  const onSaveNewWish = async (data) => {
    const { wishname} = data;

    const userData = await Auth.currentAuthenticatedUser();
    // create a new order
    DataStore.save(
      new WishRooms({
        userSub: userData.attributes.sub,
        name:wishname
      })
    );
    console.log("saved");
    reset({
      wishname: ""
    });
  

  };

  const onSavePressed = async () => {
  
    const userData = await Auth.currentAuthenticatedUser();
    // create a new order
    DataStore.save(
      new WishProducts({
        userSub: userData.attributes.sub,
        productId: productId,
        roomId: selectedType,
      })
    );
    setIsSelectRoom(false)

    
  };

  const onCloseModal = () => {
    setIsSelectRoom(false);
  };
  function getProductDetails() {
    let serviceDetails = products.filter((a) => a.id === productId);
    if (serviceDetails.length > 0) {
      return serviceDetails.map((item) => {
        return (
       
            <img alt="dd" className="selectWishModel__image" src={item.url} />
         
        );
      });
    }
  }

  return (
    <div className="selectModel">
      <div className="selectModel__container">
        <div className="selectModel__textalign" >
        <div className="selectModel__header">Your Wishlists</div>
        <div className="selectModel__subTitle">Create New Wishlist</div>

        <div className="selectModel__inputSection">
       
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
              <div onClick={handleSubmit(onSaveNewWish)} className="selectModel__createbtn">
              Create
                
              </div>
                  
            </div>
          <div className="selectModel__wishListTitle">
          Choose a Wishlist
            
          </div>

          {myRoom.length >= 1 ? (
          <div className="wishModel__ScrollContainer" >
            <div className="wishModel__RoomWrapper">
              <div className="wishModel__RoomBtn" >
              {myRoom?.map((item) => {
              return (
           

                  <RoomTypeRow
                    type={item}
                    isSelected={item.id === selectedType}
                    onPress={() => setSelectedType(item.id)}
                    iwish={iwish}
                    productId={productId}
                  />

               
                  
               
                
              );
            })}
             <div className="selectModel__createbtn"
                    onClick={onSavePressed}
                  >
                    Add
                  </div>
                
              </div>
        
               
              
            </div>
            
               
          </div>
        ) : (
          <div className="wishModel__content">
            <div className="wishModel__inputText">Create Wishlist</div>
            
          </div>
        )}
          
        </div>

        <div
          onClick={() => {
            setIsSelectRoom(false);
          }}
          className="wishModel__cancelBtn"
        >
          <svg
            width="14px"
            height="14px"
            viewBox="0 0 10 10"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g
              stroke="#3C4646"
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
    
  );
}

const mapStateToProps = (store) => ({
  baskets: store.basketsState.baskets,
  quantity: store.basketsState.quantity,
  users: store.usersState.users,
  rooms: store.usersState.rooms,
  iwish: store.userState.iwish,
});

const mapDispatchProps = (dispatch) =>
  bindActionCreators({ addToBasket }, dispatch);

export default connect(mapStateToProps, mapDispatchProps)(SelectWishModel);
