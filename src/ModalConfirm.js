import React, { useState } from 'react'
import './ModalConfirm.css'
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

import Related from './Related';
import CurrencyFormat from 'react-currency-format';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addToBasket } from './redux/actions';


function ModalConfirm({baskets, removeFromBasket, item, setOpenConfirm}) {
    const { name } = useParams();
   

    
    
     
      
     
    return (
        <div className='main'>
            <div className='modalConfirm'>
            <div className='modalConfirm__mainContent'>
                <div className='modalConfirm__Wrapper'>
                    <h2>Are you sure?</h2>
                    <p>Do you want to remove this from your cart?</p>

                    <div onClick= {()=> {
                        
                        setOpenConfirm(false)}} className='modalConfirm__WrapperBtn'>
                        No
                    </div>
                    <div onClick= {()=> {
                        removeFromBasket(item)
                        setOpenConfirm(false)}} className='modalConfirm__WrapperBtn2'>
                        Yes
                    </div>
                   
                    
               
                    
                    
                    
                   
                    
                </div>
                
            </div>
            
        </div>

        </div>
     
    )
}

const mapStateToProps = (store) => ({
    baskets: store.basketsState.baskets,
    quantity: store.basketsState.quantity,
})

const mapDispatchProps = (dispatch) => bindActionCreators({ addToBasket }, dispatch);


export default connect(mapStateToProps, mapDispatchProps)(ModalConfirm);