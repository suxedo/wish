import React,{useState, useEffect} from "react";
import "./FollowerUsers.css";
import { fetchData, fetchUsersData } from "../redux/actions";
import { connect } from "react-redux";

import { bindActionCreators } from "redux";
import { Auth, DataStore } from "aws-amplify";
import { User, UserFollowing } from "../models";
import { Link, useParams } from "react-router-dom";
function FollowerUsers(props) {


  const [myFollower, setMyFollower] = useState([])
  const [myUid, setMyUid] = useState([])
  const [deleteIds, setDeleteIds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userIds, setUserIds] = useState([]);
  const [user, setUser] = useState([]);
 
  const  {users, setIsFollowerModel} =props
  const { id } = useParams();
  
 

  const onFollow = async (id) => {
    const userData = await Auth.currentAuthenticatedUser();

    DataStore.save(
      new UserFollowing({
        userSub: userData.attributes.sub,
        userId: id,
      })
    );
  };
  const onUnfollow = async (id) => {
    const userData = await Auth.currentAuthenticatedUser();

    const modelToDelete = await DataStore.query(UserFollowing, id);

    DataStore.delete(modelToDelete);
  };

  
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
           <div  className="follower__cardBtn2">
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

  

     
    getMyFollower();
    console.log(props.following);
  

    
  }, []);
  

  const matchUserToComment = (myFollower) => {
    for (let i = 0; i < myFollower.length; i++) {
      if (myFollower[i].hasOwnProperty("user")) {
        continue;
      }                                                                                                                                                                                                                            
     
        const user = users[0].find((x) => x.userSub === myFollower[i].userSub);

      if (user === undefined) {
        fetchUsersData(myFollower[i].userSub ,false);
       

      } else {
        myFollower[i].user = user;

     

     

      }
     
    
    setMyFollower(myFollower);
    
   

  

        
      }

      



  
  };

  

  const getMyFollower = async () => {
     
    const userData = await Auth.currentAuthenticatedUser();
    setMyUid(userData.attributes.sub)

    if (id === userData.attributes.sub) {
      const user = await Auth.currentAuthenticatedUser();
      await DataStore.query(UserFollowing, (u) =>
        u.userId("eq", user.attributes.sub)
      ).then((data) => {
        let myfollower = data.map((doc) => {
          const id = doc.userSub;
          console.log(id);
          return { id, ...doc };
        });
        console.log(myFollower);
        matchUserToComment(myfollower);
        
     
      });
    } else {
      await DataStore.query(UserFollowing, (u) => u.userId("eq", id)).then(
        (data) => {
          let myfollower = data.map((doc) => {
            const id = doc.userSub;
           
            return { id, ...doc }
          });
          console.log(myFollower);
        
       
          matchUserToComment(myfollower);
        

        }
      );
    }
  };



  return (
    <div className="follower">
      <div className="follower__container">
        <div className="follower__header">Followers</div>
        <div className="follower__content">
          <div className="follower__wrapper">
         
            {myFollower.map(item=>{
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
            setIsFollowerModel(false);
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

export default connect(mapStateToProps, mapDispatchProps)(FollowerUsers);


