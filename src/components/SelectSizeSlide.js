import React, { useEffect, useState } from "react";
import { Auth, DataStore } from "aws-amplify";
import CustomInput from "./CustomInput";
import { useForm } from "react-hook-form";
import "./SelectedSizeSlide.css";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { addToBasket } from "../redux/actions";
import RoomTypeRow from "./RoomTypeRow";
import { Product, WishProducts, WishRooms } from "../models";
import CustomButton from "./CustomButton";

function SelectSizeSlide(props) {

  const [userIds, setUserIds] = useState([]);
  const [deleteIds, setDeleteIds] = useState([]);
  const [loading, setLoading] = useState(true);
  const { control, handleSubmit, watch, reset } = useForm({});
  const { setIsSelectRoom, productId, rooms, myRoom, iwish, setSizeSelectSlide, item } = props;
  const [selectedType, setSelectedType] = useState([]);
  const [products, setProducts] = useState([]);
 

 

  return (
    <div className='BaseModal'>
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
                <div className="SelectionList__Wrapper">
                  <div className="SelectionList__OptionContent">
                    <div className="SelectionList__OptionContentWrapper">
                      <div className="SelectionList__OptionContentBadge"> 
                        
                      </div>
                      <div className="SelectionList__OptionContentSizeText">
                        {item}
                      </div>
                      <div className="SelectionList__OptionContentPriceContainer" >
                        <div className="SelectionList__OptionContentPriceWrapper">
                          <div  className="SelectionList__OptionContentPriceNo">
                            {item.price}
                          </div>
                          
                        </div>
                        
                      </div>
                    </div>
                  </div>
                  
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
    
        <RoomTypeRow
          type={item}
          isSelected={item.id === selectedType}
          onPress={() => setSelectedType(item.id)}
          iwish={iwish}
          productId={productId}
        />


    
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

export default connect(mapStateToProps, mapDispatchProps)(SelectSizeSlide);
