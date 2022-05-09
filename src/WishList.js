import { Auth, DataStore } from "aws-amplify";
import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { WishProducts, WishRooms } from "./models";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { addToBasket, fetchProductData, fetchUsersData } from "./redux/actions";
import { useNavigate } from "react-router-dom";
import "./WishList.css";
import CurrencyFormat from "react-currency-format";
import ModalRoomConfirm from "./components/ModalRoomConfirm";
function WishList(props) {
  const { id } = useParams();
  const [wishProduct, setWishProduct] = useState([]);
  const [postId, setPostId] = useState("");
  const [refresh, setRefresh] = useState(false);
  const [room, setRoom] = useState([]);
  const [sub, setSub] = useState([]);
  const [mySub, setMySub] = useState([]);
  const [deleteConfirm, setDeleteConfirm] = useState(false);
  const [deletePro, setDeletePro] = useState(false);
  const { products } = props;
  const navigate = useNavigate();

  const getCurrentId = async () => {
    const user =  await Auth.currentAuthenticatedUser(); 
    await DataStore.query(WishProducts, (u) =>
      u.userSub("eq", user.attributes.sub).roomId("eq", id)
    ).then((data) => {
      let following = data.map(doc => {
       
        const all = doc.id
        
        return all

        

    })

   
        setDeletePro(following);
      
    
    });
  };
  const getCurrentRoomOwner = async () => {
    const user =  await Auth.currentAuthenticatedUser(); 
    await DataStore.query(WishRooms, (u) =>
      u.id("eq", id)
    ).then((data) => {
      let currentuserRoom = data.map(doc => {
       
        const all = doc.userSub
        
        return all

        

    })


   
        setSub(currentuserRoom[0]);
      
    
    });
  };
  const getMySub = async () => {
    const user =  await Auth.currentAuthenticatedUser(); 
    setMySub(user.attributes.sub)
    
  };


  const onDeleteRoom = async (id) => {
    const user =  await Auth.currentAuthenticatedUser(); 
    const modelToDelete = await DataStore.query(WishRooms, id);

    DataStore.delete(modelToDelete);


    for (let index = 0; index < deletePro.length; index++) {
      await DataStore.delete(WishProducts,  deletePro[index]);
     
      
    }





   

   
   
   navigate(-1);
  };

  useEffect(() => {
    getWishProduct();
    getCurrentId()
    getCurrentRoomOwner() 
    getMySub()
  }, [id, refresh]);

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

  const getWishProduct = () => {
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

  React.useEffect(() => {
    async function fetchProduct() {
      try {
        await DataStore.query(WishProducts).then(setWishProduct);
      } catch (error) {
        console.log(error);
      }
    }
    fetchProduct();
  }, []);

  return (
    <div className="wishlist">
      <div className="wishlist__container">
        <div className="wishlist__header">
          <h1 className="wishlist__heading">{room?.name} </h1>

          {mySub === sub && (<div>
          <div
            onClick={() => {
              setDeleteConfirm(true);
            }}
            className="wishlist__deleteBtn"
          >
            Delete Wishlist
          </div>
          <div className="wishlist__editBtn">
            <svg viewBox="0 0 18 18" class="wishlist__editIconBtn">
              <g fill="none" fill-rule="evenodd">
                <path
                  fill="#FFF"
                  d="M0 18h3.8l11-11.1L11 3.1 0 14.2V18zM17.7 4c.4-.4.4-1 0-1.4L15.4.3c-.4-.4-1-.4-1.4 0l-1.8 1.8L16 5.9 17.7 4z"
                ></path>
                <path d="M-3-3h24v24H-3z"></path>
              </g>
            </svg>
            Edit Wishlist
          </div>
            
          </div> )}
          
        
     
        </div>
        <div className="WishList__cardGrid">
        {room.map((item) => {
          return (
                <Link
                  to={`/feed/product/` + item?.product?.id}
                  className="product__card"
                >
                  <img
                    className="product__card-image"
                    src={item?.product?.url}
                    alt="wear"
                  />
                  <div className="product__card-detail">
                    <CurrencyFormat
                      renderText={(value) => (
                        <>
                          <h3 className="product__card-detailprice">
                            {" "}
                            {value}
                          </h3>
                        </>
                      )}
                      decimalScale={2}
                      value={item?.product?.price} // Part of the homework
                      displayType={"text"}
                      thousandSeparator={true}
                      prefix={"₦"}
                    />
                    <div className="product__card-detailA">
                      100+ bought this
                    </div>
                  </div>
                  <span
                    onClick={() => addToBasket(item?.product?.id)}
                    className="circle"
                  ></span>
                  <a href="/"> </a>
                </Link>
          );
          
        })}
        </div>
      </div>

      {deleteConfirm === true && (
        <ModalRoomConfirm
          item={id}
          onDeleteRoom={onDeleteRoom}
          setDeleteConfirm={setDeleteConfirm}
        />
      )}

               <div className='wishlist__refreral'>
                 dhsdshdsh
                    
                

                   </div>
    </div>
  );
}
const mapStateToProps = (store) => ({
  baskets: store.basketsState.baskets,
  quantity: store.basketsState.quantity,
  users: store.usersState.users,
  products: store.usersState.products,
});

const mapDispatchProps = (dispatch) =>
  bindActionCreators({ addToBasket, fetchUsersData }, dispatch);

export default connect(mapStateToProps, mapDispatchProps)(WishList);
