import { DataStore } from 'aws-amplify';
import React, { useState, useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { WishProducts } from '../models';
import { addToBasket, fetchData, fetchProductData, reload } from "../redux/actions";
function WishListItemImage(props) {
    const { areUsersLoaded, ids, products } = props;

    
    const [image, setImage] = useState([]);
    useEffect(() => {
     getCurrentUserWishList()
    }, [])
    
    const getCurrentUserWishList = async () => {
        if (ids) {
            try {
            await DataStore.query(WishProducts, (u) => u.roomId("eq", ids)).then(
                (snapshot) => {
                  let room = snapshot.map((doc) => {
                    const data = doc;
                    const id = doc.productId;
                    return { id, ...data };
                  });
        
                 matchProductImageToRoom(room);
                }
              );
      
              
            } catch (error) {
              console.log(error);
              
            }
          
              
            
          }
        
    }
    const matchProductImageToRoom = (room) => {
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
        setImage(room);
    
      
      };

  return (
    <div  className="WishlistCollection__PreviewLink">
        {image.map((item) => {
            return(
               
                  
                          <img alt='ff'src={item?.product?.url} className='ik'/>
                         
                      

                      
                
            )
        })}
         <div className="WishlistCollection__PreviewImage"></div>
                      <div className="WishlistCollection__PreviewImage"></div>
                      <div className="WishlistCollection__PreviewImage"></div>
                      <div className="WishlistCollection__PreviewImage"></div>
                      <div className="WishlistCollection__PreviewImage"></div>
                      <div className="WishlistCollection__PreviewImage"></div>

    </div>
  )
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
  
  export default connect(mapStateToProps, mapDispatchProps)(WishListItemImage);