import React,{useState, useEffect} from "react";

import "./FollowerUsers.css";
import { fetchData, fetchUsersData } from "../redux/actions";
import { connect } from "react-redux";

import { bindActionCreators } from "redux";
import { Auth, DataStore } from "aws-amplify";
import { UserFollowing } from "../models";
import { Link, useParams } from "react-router-dom";
function FollowingUsers(props) {


  const [myFollowing, setMyFollowing] = useState([])
  const [myUid, setMyUid] = useState([])

  const  {users,  setIsFollowingModel} =props
  const { id } = useParams();

 
  function getFollow (id) {
    if(id===myUid){
      return(
        <div>
         
        </div>
        
      )
    }
    else{
      if (props.following.indexOf(id) > -1) {
        return(
           <div className="follower__cardBtn2">
                      Following
                      
                    </div>
    
        )
        } else {
          return(
            <div className="follower__cardBtn">
                   follow
                      
                    </div>
    
          )
         
        }

    }


  
   
   
   

 

   
  
    



}

 

  useEffect(() => { 

  

     
    getMyFollowing();
   
  

    
  }, []);
  

  const matchUserToComment = (myFollowing) => {
    for (let i = 0; i < myFollowing.length; i++) {
      if (myFollowing[i].hasOwnProperty("user")) {
        continue;
      }                                                                                                                                                                                                                            
     
        const user = users[0].find((x) => x.userSub === myFollowing[i].userId);

      if (user === undefined) {
        fetchUsersData(myFollowing[i].userId ,false);
       

      } else {
        myFollowing[i].user = user;

     

     

      }
     
    
    setMyFollowing(myFollowing);
    
   

  

        
      }

      



  
  };

  

  const getMyFollowing = async () => {
     
    const userData = await Auth.currentAuthenticatedUser();
    setMyUid(userData.attributes.sub)

    if (id === userData.attributes.sub) {
      const user = await Auth.currentAuthenticatedUser();
      await DataStore.query(UserFollowing, (u) =>
        u.userSub("eq", user.attributes.sub)
      ).then((data) => {
        let myfollowing = data.map((doc) => {
          const id = doc.userId;
          console.log(id);
          return { id, ...doc };
        });
       
        matchUserToComment(myfollowing);
        
     
      });
    } else {
      await DataStore.query(UserFollowing, (u) => u.userSub("eq", id)).then(
        (data) => {
          let myfollowing = data.map((doc) => {
            const id = doc.userId;
           
            return { id, ...doc }
          });
        
        
       
          matchUserToComment(myfollowing);
        

        }
      );
    }
  };



  return (
    <div className="follower">
      <div className="follower__container">
        <div className="follower__header">Following</div>
        <div className="follower__content">
          <div className="follower__wrapper">
         
            {myFollowing.map(item=>{
            return(
              <div className="follower__card">
                <div className="follower__cardWrap">
                <Link to='/' className="follower__cardLink">
                  <div className="follower__cardImage">
                  {item?.user?.username[0].toUpperCase()}

                    
                  </div>
                  <div className="follower__cardText">
                  {item?.user?.username}
                    
                  </div>
                
                </Link>
          

              {getFollow(item?.user?.userSub)}
                  
                </div>
               

              

               

                
              </div>
            )
          })}
            
    
          </div>
         
       
        </div>
        <div
          onClick={() => {
            setIsFollowingModel(false);
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
  users: store.usersState.users,
  iwish: store.userState.iwish,
  rooms: store.usersState.rooms,
  following: store.userState.following,
  follower: store.userState.follower,
});

const mapDispatchProps = (dispatch) =>
  bindActionCreators({  fetchUsersData, fetchData }, dispatch);

export default connect(mapStateToProps, mapDispatchProps)(FollowingUsers);


