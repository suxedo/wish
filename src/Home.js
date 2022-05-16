import React,{useState, useEffect} from 'react'
import './Home.css'
import ProductsPage from './ProductsPage'
import { Link, useParams } from "react-router-dom";
import Modal from './Modal';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addToBasket, reload } from './redux/actions';
import { Auth, DataStore, Hub } from 'aws-amplify';
import { User } from './models';
import HomePhone from './Phone/HomePhone';
import useWindowSize from "./utils/useWindowSize";
function Home(props) {
    const { name } = useParams();
    const [all, setAll] = useState([])
    const {height, width }  = useWindowSize()

    const [isLoaded, setLoaded] = useState(false);
    const [areUsersLoaded, setUsersLoaded] = useState(false);

   
    
    const [isOpen, setIsOpen] = useState(false);
    const { baskets } = props;
    const randomImages = [
      "https://hieumobile.com/wp-content/uploads/avatar-among-us-2.jpg",
      "https://hieumobile.com/wp-content/uploads/avatar-among-us-3.jpg",
      "https://hieumobile.com/wp-content/uploads/avatar-among-us-6.jpg",
      "https://hieumobile.com/wp-content/uploads/avatar-among-us-9.jpg",
    ];
    
    const getRandomImage = () => {
      return randomImages[Math.floor(Math.random() * randomImages.length)];
    };
    

    useEffect(() => {

        const listener = Hub.listen('datastore', async capsule =>{
          const { payload:{event, data},} = capsule;
          console.log('DataStore event', event, data);
    
          if (event === 'ready') {
            setLoaded(true)
            
          }
          if (event === 'modelSynced' && data.model.name === 'User') {
            setUsersLoaded(true)
            
          }
        })
        return() => listener();
        
      }, [])
      

    useEffect(() => {

        const getAllUser = async () => {
            const data= await DataStore.query(User)
          setAll(data)
    
        }
        getAllUser()
        
      
      }, [ ])
      
      useEffect(() => {
        const fetchUser = async () => {
          // get currently authenticated user
          const userInfo = await Auth.currentAuthenticatedUser();
          if (!userInfo) {
            return;
          }
    
          // check if THE user exist in database
          const original = await DataStore.query(User, (cp) =>
            cp.userSub("eq", userInfo.attributes.sub)
          );
          const data= original[0]
    
          if (data) {
            console.log("User already exists in database");
            return;
          }
    
          // if it doesn't (it's newly registered user)
          // then, create a new user in database
          DataStore.save(
            new User({
              userSub: userInfo.attributes.sub,
              firstname: "",
              lastname: "",
              username: userInfo.username,
              email: userInfo.attributes.email,
              profile: getRandomImage(),
            })
          );
        };
    
        fetchUser();
      }, []);


      const SignOut= async () => {
         
        Auth.signOut()
      };

      function renderPage() {

        if (areUsersLoaded === false) {
            return (
              <div style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <p>DataStore uuser is loading</p>
              </div>
            );
          }
      
        }


      

    
   

    
    return (
     
         
          <div  className='homeroute'>
            <div className='home'>
            <div className='home__products'>
                {name && <div className='home__res'>
                Results for  <h5>'{name}'</h5>
                </div> }
                <ProductsPage/>
            </div>
            {baskets.length === 0 ? 
                  <div className='home__refreral'>
                      {all.map(item=> {
                          return(
                              <Link to={`/profile/` + item?.userSub} >
                                  {item?.username}
                              </Link>
                          )
                      })}

                      <div onClick={SignOut}>

                          signOut
                          
                      </div>
                

                   </div> :
                <div className='home__cart'>
                    <Link to='/cart' className='home__cartBtn'>
                        View Cart
                    </Link>
                    <div className='home__cartWrapper'>
                        {baskets.map(item=>{
                            return(
                                <div className='home__cartWrapperContent' >
                                <div className='home__cartImgWrapper'>
                                <img className='home__cartImg' src={item.image} alt={item.name} />
                                
                              </div>
                              <div className='home__cartName'>
                                  {item.name}
                              </div>
                                    
                                </div>
                              

                            )
                        })}
                       
                    </div>
                

                </div>}

            

            {isOpen && <div className='base'>
                <Modal setIsOpen={setIsOpen}/>
            </div> }
            
            
        </div>
    
            
          </div>
      
    )
}

const mapStateToProps = (store) => ({
    baskets: store.basketsState.baskets,
    currentUser: store.userState.currentUser,
})

const mapDispatchProps = (dispatch) => bindActionCreators({ addToBasket, reload }, dispatch);


export default connect(mapStateToProps, mapDispatchProps)(Home);
