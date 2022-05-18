import React,{useState} from 'react'
import './ProductDetailsMobile.css'
import { Auth, DataStore, SortDirection } from "aws-amplify";
import { useParams } from "react-router-dom";
import { Product } from '../models';
import CurrencyFormat from 'react-currency-format';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { addToBasket, fetchUser, fetchUsersData } from '../redux/actions';
import ProductBtnSlide from '../components/ProductBtnSlide';
import SelectSizeSlide from '../components/SelectSizeSlide';
import OptionType from '../components/OptionType';



function ProductDetailsMobile(props) {
  const { name } = useParams();
  const [activeScreen, setActiveScreen] = useState("Overview");
  const [sizeSlide, setSizeSlide] = useState(false);
  const [size, setSize] = useState([]);
  const [sizeSelectSlide, setSizeSelectSlide] = useState(false);
  const [decriptionSlide, setDescriptionSlide] = useState("Description");
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
    console.log(size);
    
  }, []);
  function getProductDetails() {
    let serviceDetails = products.filter((a) => a.id === name);
    if (serviceDetails.length > 0) {
      return serviceDetails.map((item) => {
        return (
          <div>
            
             
              <img alt="dd" className=""  style={{width:'100%', height:'70vh'}} src={item.url} />
                
             
         
              
         

             
               

                <div className='ProductDetails__wrapper'>
                
                  <div className='productDetails__section'>
                    <h1 className='productDetails__name'>{item.name} </h1>
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
                    
                  </div>
                  <div className='productDetails__section'>
                  <div className="ProductPage__Header"><h2 class="ProductPage__Title">30 Day Return &amp; Refund</h2><div class="ProductPage__Expand">Learn More</div></div>
                   
                    
                  </div>
                
                  <div className='productDetails__ReviewWrapper'>
                    <div className='productDetails__ReviewHeader'>
                    <h2 className='productDetails__ReviewHeaderText'>Customer Reviews</h2>
                    <div className="ProductDetails__ExpandBtn">View All</div>
                      
                    </div>

                    
                  </div>
              <ProductBtnSlide text='Colors and Sizes' onPress={() =>{
                setSizeSlide(true)
              } }/>
              
              <ProductBtnSlide text='Description'/>
              <ProductBtnSlide text='Reference Price by Seller'/>
              <ProductBtnSlide text='Delivery Guarantee'/>
                  
                </div>
                <div className='productDetails__footer'>
                <div className='productDetails__footerBuyWrapper'>
                  <div className='productDetails__footerPriceWrapper'>
                    <div className='productDetails__footerNoWrapper'>
                    <CurrencyFormat
                      renderText={(value) => (
                        <>
                          <div className='productDetails__footerNo'> {value}</div>
                        </>
                      )}
                      decimalScale={2}
                      value={item.price} // Part of the homework
                      displayType={"text"}
                      thousandSeparator={true}
                      prefix={"₦"}
                    />
                      
                    </div>

                    
                  </div>
                  <div onClick={()=>{
                    setSizeSelectSlide(true)
                  }} className='productDetails__footerBtn'>
                  BUY
                </div>

                  
                </div>
            
    
              </div>
              {sizeSelectSlide === true && <div className='BaseModal'>
    <div>
      <div className='SlidePanel__BackDropWrapper' >
        <div className='SlidePanel__BackDropWrapperInner'>
          <div className='SlidePanel__BackDropWrapperHeader' >
          <div className='SlidePanel__BackDropWrapperHeaderTitle' >
            Size
            
          </div>
          <div onClick={()=>{
           setSizeSelectSlide(false)
          }}
          
          className="SlidePanel__BackDropWrapperHeaderTitleBtn"><svg viewBox="0 0 10 10" xmlns="http://www.w3.org/2000/svg" role="button" style={{width: "16px", height: "16px"}}><g stroke="#192a32" stroke-width="1.5" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round"><path d="M1 1l8 8M9 1L1 9"></path></g></svg></div>

          <div>
            
          </div>
            
          </div>

    
          <div className='SlidePanel__BackDropWrapperTitleColorDescriptipion'>
            {item.color.map(item=>{
              return(
                <OptionType
                type={item}
                isSelected={item === size}
                onPress={() => setSize(item)}
               
              />
              
                
              )
              
            })}
            
          </div>
         
        </div>
        
      </div>
    </div>
    
  

    
  </div>}

              {sizeSlide === true &&  <div className='BaseModal'>
                <div>
                  <div className='SlidePanel__BackDropWrapper' >
                    <div className='SlidePanel__BackDropWrapperInner'>
                      <div className='SlidePanel__BackDropWrapperHeader' >
                      <div className='SlidePanel__BackDropWrapperHeaderTitle' >
                        Sizes and Color
                        
                      </div>
                      <div onClick={()=>{
                        setSizeSlide(false)
                      }}
                      
                      className="SlidePanel__BackDropWrapperHeaderTitleBtn"><svg viewBox="0 0 10 10" xmlns="http://www.w3.org/2000/svg" role="button" style={{width: "16px", height: "16px"}}><g stroke="#192a32" stroke-width="1.5" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round"><path d="M1 1l8 8M9 1L1 9"></path></g></svg></div>

                      <div>
                        
                      </div>
                        
                      </div>

                      <div className='SlidePanel__BackDropWrapperTitleColor'>
                        Colors
                      </div>
                      <div className='SlidePanel__BackDropWrapperTitleColorDescriptipion'>
                        {item.color.map(item=>{
                          return(
                            <div>
                              {item}
                              
                            </div>
                            
                          )
                          
                        })}
                        
                      </div>
                      <div className='SlidePanel__BackDropWrapperTitleColor'>
                        Sizes
                      </div>
                      <div className='SlidePanel__BackDropWrapperTitleColorDescriptipion'>
                      {item.size.map(item=>{
                          return(
                            <div>
                              {item}
                              
                            </div>
                            
                          )
                          
                        })}
                        
                      </div>
                      
                    </div>
                    
                  </div>
                </div>

                
              </div>}


             

             

              

          </div>
        );
      });
    }
  }
  return (
    <div className='dff'>

     <div className="productDetails__TabHeader">
                <div className="productDetails__TabHeaderWrapper">
                    <span className="productDetails__Tab1Wrapper">
                      <div
                        onClick={() => setActiveScreen("Overview")}
                        className="productDetails__Tab1"
                      >
                        <div
                          className={
                            activeScreen === "Overview" ? "productDetails__Tab11" : ""
                          }
                        >
                          <h1 className="productDetails__Tab11Text">Overview</h1>
                        </div>
                      </div>
                    </span>
                    <span className="productDetails__Tab1Wrapper">
                      <div
                        onClick={() => setActiveScreen("Related")}
                        className="productDetails__Tab1"
                      >
                        <div
                          className={
                            activeScreen === "Related" ? "productDetails__Tab11" : ""
                          }
                        >
                          <h1 className="productDetails__Tab11Text">Related</h1>
                        </div>
                      </div>
                    </span>
                  </div>
                
                
              </div>
              <div className='ProductContainer' >
              {activeScreen === "Overview" && (
                <div>
                  {getProductDetails()}

                </div>
              )}
                
              </div>
            


             




    </div>
  )
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

export default connect(mapStateToProps, mapDispatchProps)(ProductDetailsMobile);
