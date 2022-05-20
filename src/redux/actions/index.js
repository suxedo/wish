
import { Auth, DataStore } from "aws-amplify";
import { Product, WishProducts, WishRooms } from "../../models";
import { User, UserFollowing } from "../../models";
import { ADD_TO_BASKET, REMOVE_FROM_BASKET, USER_CHATS_STATE_CHANGE, USER_FOLLOWING_STATE_CHANGE, USER_POSTS_STATE_CHANGE, USER_STATE_CHANGE, USERS_DATA_STATE_CHANGE, ROOM_STATE_CHANGE, PRODUCT_STATE_CHANGE, USER_WISH_STATE_CHANGE, USER_FOLLOWER_STATE_CHANGE} from "../constants"

let unsubscribe = [];
export function reload() {
    return ((dispatch) => {
    
        dispatch(fetchUser())
        dispatch(fetchUserFollowing())
        dispatch(fetchUserFollowers())
        dispatch(fetchWishRoom())
        dispatch(fetchUsersData())
        dispatch(fetchProductData())
        dispatch(fetchWishProduct())
    
        

    })
}

export  function addToBasket(item, selectedOption, selectedOptionSize, empty, color, size) {

    return ((dispatch) => {
      
        dispatch({
            type: ADD_TO_BASKET,  
            item:{
                id:item.id,
                name:item.name,
                image:item.url,
                price:item.price,
                shipping:item.shipping,
                quantity:item.quantity,
                color:selectedOption || item.color[0] || color,
                size:selectedOptionSize || item.size[0] ||  size,
              
               
          }
          
          
          });
        
        


        
    })
}
export function removeFromBasket(item) {
    return ((dispatch) => {
     
        
        
        dispatch({
            type: REMOVE_FROM_BASKET,
            item: {
                id:item.id,
                name:item.name,
                image:item.url,
                price:item.price,
                quantity:item.quantity
               
          }
        })
        


        
    })
}
export  function fetchUser()  {
    return (async(dispatch) => {
        const user =  await Auth.currentAuthenticatedUser(); 
        const dbUsers =  DataStore.query(User, u => u.userSub('eq', user.attributes.sub)).then((data) => {
            if (data) {
                dispatch({ type: USER_STATE_CHANGE, currentUser: { uid: user.attributes.sub, ...data} })
            }

        })
        
    
        unsubscribe.push(dbUsers)
    })
}
export  function fetchWishRoom()  {
    return (async(dispatch) => {
        const user =  await Auth.currentAuthenticatedUser(); 
        const dbUsers =  DataStore.query(WishRooms, u => u.userSub('eq', user.attributes.sub)).then((data) => {
           
            let rooms = data.map(doc => {
                const id = doc.userId;
                return {id, ...doc} 

                

            })
            
                dispatch({ type: ROOM_STATE_CHANGE, rooms })
          

        })
       
        
    
        unsubscribe.push(dbUsers)
    })
}
export function fetchUserFollowing() {
    return (async(dispatch) => {
        const user =  await Auth.currentAuthenticatedUser(); 
        const dbFollowing =  DataStore.query(UserFollowing, u => u.userSub('eq', user.attributes.sub)).then((data) => {
            let following = data.map(doc => {
                const id = doc.userId;
          
             
                return id

                

            })
           
            dispatch({ type: USER_FOLLOWING_STATE_CHANGE, following });

            for (let i = 0; i < following.length; i++) {
                dispatch(fetchData(following[i], true));
            }

            
           

        })
        
        
    
        unsubscribe.push(dbFollowing)
    })
}
export function fetchUserFollowers() {
    return (async(dispatch) => {
        const user =  await Auth.currentAuthenticatedUser(); 
        const dbFollowers =  DataStore.query(UserFollowing, u => u.userId('eq', user.attributes.sub)).then((data) => {
            let follower = data.map(doc => {
                const id = doc.userSub;
          
             
                return id

                

            })
           
            dispatch({ type: USER_FOLLOWER_STATE_CHANGE, follower });
            for (let i = 0; i < follower.length; i++) {
                dispatch(fetchData(follower[i], true));
            }

           
           

        })
        
        
    
        unsubscribe.push(dbFollowers)
    })
}
export function fetchData(uid, getPosts) {
    return (async(dispatch, getState) => {
        
        const found = getState().usersState.users.some(el => el.userSub === uid);
        if (!found) {
        await DataStore.query(User, u => u.userSub('eq', uid)).then((snapshot) => {
        
            if (snapshot) {
                let user = snapshot;
                user.uid = snapshot.id;

                dispatch({ type: USERS_DATA_STATE_CHANGE, user });
            }
        
           

        })

           
        }
    })
}

export function fetchUsersData(uid, getPosts) {
    return (async(dispatch, getState) => {
        
        const found = getState().usersState.users.some(el => el.userSub === uid);
        if (!found) {
        await DataStore.query(User).then((snapshot) => {
            

            if (snapshot) {
                let user = snapshot;
                user.uid = snapshot.id;

                dispatch({ type: USERS_DATA_STATE_CHANGE, user });
            }
        
           

        })

           
        }
    })
}

export function fetchProductData(uid, getPosts) {
    return (async(dispatch, getState) => {
        
        const found = getState().usersState.products.some(el => el.id === uid);
        if (!found) {
        await DataStore.query(Product).then((snapshot) => {
            if (snapshot) {
                let products = snapshot;
                products.uid = snapshot.id;

                dispatch({ type: PRODUCT_STATE_CHANGE,  products });
            }
          
              
          

        

            
           

        })

           
        }
    })
}
export function fetchProduct(uid, getPosts) {
    return (async(dispatch, getState) => {
        
        const found = getState().usersState.products.some(el => el.id === uid);
        if (!found) {
        await DataStore.query(Product, u => u.id('eq', uid)).then((snapshot) => {
            if (snapshot) {
                let products = snapshot;
                products.uid = snapshot.id;

                dispatch({ type: PRODUCT_STATE_CHANGE,  products });
            }
          
              
          

        

            
           

        })

           
        }
    })
}


export function fetchWishProduct() {
    return (async(dispatch) => {
        const user =  await Auth.currentAuthenticatedUser(); 
        const wishProduct =  DataStore.query(WishProducts, u => u.userSub('eq', user.attributes.sub)).then((data) => {
            let iwish = data.map(doc => {
                const id = doc.productId;
                return id

                

            })
           
            dispatch({ type: USER_WISH_STATE_CHANGE, iwish });

            for (let i = 0; i < iwish.length; i++) {
                dispatch(fetchProduct(iwish[i], true));
            }

            
           

        })
        
        
    
        unsubscribe.push(wishProduct)
    })
}


