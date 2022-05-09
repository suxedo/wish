import React from 'react'
import './PayPal.css'
function PayPal({cancelPaymentDropdown}) {
    return (
        <div className='paypal'>
            <div className='paypal__details'>
                <div className='paypal__detailsRow'>
                Pay using PayPal’s worldwide secure system.
                </div>
                
            </div>
            <div className='paypal__ButtonWrapper'>
                <div className='paypal__Button1'>
                    
                </div>
                <div className='paypal__Button2'>
                <div onClick={cancelPaymentDropdown} className='cart__CreditCardInputButton'>
                Cancel
               </div>
                    
                </div>
                
            </div>
            
        </div>
    )
}

export default PayPal
