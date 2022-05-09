import React,{useState} from 'react'
import CurrencyFormat from 'react-currency-format'
import ButtonAddRemoveItem from './ButtonAddRemoveItem'
import './CartListItems.css'
import { animated } from "react-spring";
import { useStepAnimation } from "use-step-animation";
import {motion} from 'framer-motion'
import ModalConfirm from './ModalConfirm';


function CartListItems({baskets, getCartCount, removeFromBasket, addToBasket, openDropdown, options, selectedOption, open, onOptionClicked}) {
    const [openConfirm, setOpenConfirm] = useState(false)
  
    return (
        <div className='cart__CartList'>
            <h2 className='cart__CartListHeading'>Items In Cart</h2>
            
           
    
            {baskets.map((item)=>{
                     return(
                      <motion.div key="content"
                      initial="collapsed"
                      animate="open"
                      exit="collapsed"
                      variants={{
                        open: { opacity: 1, height: "auto" },
                        collapsed: { opacity: 0, height: 0 }
                      }}
                      transition={{ duration: 0.2, ease: [0.04, 0.62, 0.23, 0.98] }} className='cart__CartItemCard'>
                        <div className='cart__CartItemCardWrapper'>
                           
                                <img alt='' className='cart__CartItemCardImage' src={item.image} />
                          
                        <div className='cart__ItemCartInfoandPrice'>
                            <div className='cart__ItemCartInfoandPriceWrapper'>
                                <div className='cart__ItemCartInfo'>
                                    <div className='cart__ItemCartInfoName'>
                                         {item.name}
                                                            
                                        </div>
                                <div className='cart_ItemCartVariation'>
                                    <div className='cart__ItemCartVariationText'>
                                        {item?.color}, Size: {item?.size}
                                                                
                                    </div>
                                                           
                                                            
                                </div>
                                <div className='cart__ItemCartShipping'>
                                        Shipping: $10
                                </div>
                                <div className='cart__ItemCartShipping'>
                                        (23 Jan - 20 Mar)
                                </div>
                                <div>
                                    <ButtonAddRemoveItem
                                        quantity={item.quantity}
                                        handleRemoveItem={() => removeFromBasket(item)} handleAddItem={() => addToBasket(item)}/>
                                </div>
                                {openConfirm === true &&  <ModalConfirm item={item} removeFromBasket={removeFromBasket} setOpenConfirm={setOpenConfirm}/>
            }
                                 <div className='cart__ItemCartQuantity'>
                           
                                            <div onClick= { ()=> { 
                                                setOpenConfirm(true)
                                                
                                                
                                             }} className='cart__ItemCartQuantityText'>
                                             Remove </div>
                                                                
                                            </div>
                                                        
                                          </div>
                                        <div className='cart__ItemCartPriceInfo'>
                                            <div className='cart__ItemCartPriceInfoText'>
                             <CurrencyFormat
                                  renderText={(value) => (<>
                                 
                                  <h3 className='product__card-detailprice'> {value}</h3>
                                      
                                  
                                 
                                 </>)}
                                  decimalScale={2}
                                  value={item.price} // Part of the homework
                                  displayType={"text"}
                                  thousandSeparator={true}
                                  prefix={"₦"}
                                  />
                                             </div>
                                                        
                                        </div>
                                                    
                                    </div>
                                                
                                    </div>
                                            
                                    </div>
                                        
                                    </motion.div>
                                    

                                       )
                                   })}

          
                            
                               </div>
    )
}

export default CartListItems
