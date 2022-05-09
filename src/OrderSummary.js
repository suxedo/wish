import React from 'react'
import CurrencyFormat from 'react-currency-format'
import './OrderSummary.css'
import { getTotal } from './redux/reducers/baskets'
function OrderSummary({getBasketTotal, baskets, getShippingTotal}) {
  
    return (
    <div className='orderSummary__fixedWrapper'>
        <h2 className='orderSummary__Heading'>Order Summary</h2>
        
     
        <div className='orderSummary__Wrapper'>
            <div className='orderSummary__PromoWrapper'>
                <div className='orderSummary__AddPromo'>
                <svg viewBox="0 0 18 18" style={{width: '18px', height: '18px'}}><g fill="none" fill-rule="evenodd"><path d="M0 0h18v18H0z"></path><path fill="#2fb7ec" d="M10.0909091 9.81818182h4.5c.2181818 0 .4090909-.19090909.4090909-.40909091v-.81818182c0-.21818182-.1909091-.40909091-.4090909-.40909091h-4.5c-.16363637 0-.27272728-.10909091-.27272728-.27272727v-4.5C9.81818182 3.19090909 9.62727273 3 9.40909091 3h-.81818182c-.21818182 0-.40909091.19090909-.40909091.40909091v4.5c0 .16363636-.10909091.27272727-.27272727.27272727h-4.5C3.19090909 8.18181818 3 8.37272727 3 8.59090909v.81818182c0 .21818182.19090909.40909091.40909091.40909091h4.5c.16363636 0 .27272727.10909091.27272727.27272728v4.5c0 .2181818.19090909.4090909.40909091.4090909h.81818182c.21818182 0 .40909091-.1909091.40909091-.4090909v-4.5c0-.16363637.10909091-.27272728.27272728-.27272728z"></path></g></svg>
                Apply a coupon
                    
                </div>
                
            </div>
            <div className='orderSummary__PriceSection '>
                <div className='orderSummary__PriceSectionRow'>
                    <div className='orderSummary__PriceSectionHeading' >
                      Item Total
                    </div>
                    <div>
                    <CurrencyFormat
                        renderText={(value) => (<>   
                       <h3 className='product__card-detailprice'> {value}</h3>
                                 </>)}
                                  decimalScale={2}
                                  value={getBasketTotal(baskets)} // Part of the homework
                                  displayType={"text"}
                                  thousandSeparator={true}
                                  prefix={"₦"}
                                  />
                        
                    </div>

                   
                    
                    
                </div>
                <div className='orderSummary__PriceSectionRow'>
                    <div className='orderSummary__PriceSectionHeading' >
                      Shipping
                    </div>
                    <div>
                    <CurrencyFormat
                        renderText={(value) => (<>   
                       <h3 className='product__card-detailprice'> {value}</h3>
                                 </>)}
                                  decimalScale={2}
                                  value={getShippingTotal(baskets)} // Part of the homework
                                  displayType={"text"}
                                  thousandSeparator={true}
                                  prefix={"₦"}
                                  />
                        
                   
                        
                    </div>

                   
                    
                    
                </div>
                <div className='orderSummary__PriceSectionRow'>
                    <div className='orderSummary__PriceSectionHeading' >
                      Order Total
                    </div>
                    <div>
                    <CurrencyFormat
                        renderText={(value) => (<>   
                       <h3 className='product__card-detailprice'> {value}</h3>
                                 </>)}
                                  decimalScale={2}
                                  value={getTotal(baskets)} // Part of the homework
                                  displayType={"text"}
                                  thousandSeparator={true}
                                  prefix={"₦"}
                                  />
                        
                    </div>

                   
                    
                    
                </div>
             

                
            </div>
            
        </div>
    </div>
    )
}

export default OrderSummary
