import React, { useState } from 'react'
import {motion} from 'framer-motion'

function CreditCard({cancelPaymentDropdown}) {
    const [cardNumber, setCardNumber] = useState('');
    const [cvv, setCvv] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [zipcode, setZipcode] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        setCardNumber('')
                setCvv('')
                setExpiryDate('')
                setZipcode('')
        alert(`Your state values: \n 
                cardnumber: ${cardNumber} \n 
                cvv: ${cvv} \n 
                expiryDate: ${expiryDate} \n 
                zipcode: ${zipcode} \n 

                You can replace this alert with your process`);
                
      };
     
   
    return (
        <motion.div 
        key="content"
        initial="collapsed"
        animate="open"
        exit="collapsed"
        variants={{
          open: { opacity: 1, height: "auto" },
          collapsed: { opacity: 0, height: 0 }
        }}
        transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}>
            <div className='cart__CreditCardBillingRow'>
                                           <div className='cart__CreditCardBillingRowWrapper'>
                                               <div className='cart__CreditCardBillingEncryptionNote'>
                                                   <div className='cart__CreditCardBillingEncryptionNoteIcon'>
                                                   <svg viewBox="0 0 10 14"><g fill="none" fill-rule="evenodd"><path d="M-4-2h18v18H-4z"></path><path fill="#7e9aa6" d="M8.75 4.733h-.625V3.495C8.125 1.762 6.75.4 5 .4S1.875 1.762 1.875 3.495v1.238H1.25C.562 4.733 0 5.29 0 5.971v6.19c0 .682.563 1.239 1.25 1.239h7.5c.688 0 1.25-.557 1.25-1.238v-6.19c0-.682-.563-1.239-1.25-1.239zM5 10.305c-.688 0-1.25-.557-1.25-1.238 0-.681.563-1.238 1.25-1.238.688 0 1.25.557 1.25 1.238 0 .68-.563 1.238-1.25 1.238zm1.938-5.572H3.063V3.495c0-1.052.874-1.919 1.937-1.919 1.063 0 1.938.867 1.938 1.92v1.237z"></path></g></svg>
                                                       
                                                   </div>
                                                   <div className='cart__CreditCardBillingEncryptionNoteText'>
                                                   Payment data protected by Wish with encryption
                                                       
                                                   </div>
                                                   
                                               </div>
                                               <div className='cart__CreditCardInputWrapper'>
                                                   <div className='cart__CreditCardInputWrapperInputText'>
                                                   Credit or Debit Card Number
                                                       
                                                   </div>
                                                   <div className='cart__CreditCardInputWrapper'>
                                                       <input  className='cart__CreditCardInput' type="tel" name="cardnumber"  inputMode='numeric' autoComplete='cc-number' onChange={(event) => {setCardNumber(event.target.value) 
                                                    
                                                    
                                                    } }/>
                                                       
                                                   </div>
                                                   <div  className='cart__CreditCardInputIcon'>
                                                       <div className='cart__CreditCardInputIconWrapper' >
                                                       <svg viewBox="0 0 26 18" xmlns="http://www.w3.org/2000/svg"><g stroke="#D4E3EB" fill="none" fill-rule="evenodd"><rect stroke-width="2" x="1" y="1" width="24" height="16" rx="2"></rect><path fill="#D4E3EB" d="M.5 5.9h23.917v3.5H.5z"></path><path d="M3.792 13.95h3.25M10.292 13.95h5.416" fill="#D8D8D8" stroke-linecap="square"></path></g></svg>
                                                           
                                                       </div>
                                                       
                                                   </div>
                                                   
                                               </div>
                                               
                                           </div>
                                           
                                       </div>
                                       <div className='cart__CreditCardBillingRow'>
                                           <div  className='cart__CreditCardBillingRowColumn'>
                                               <div className='cart__CreditCardBillingRowColumnInput'>
                                                   <div className='cart__CreditCardInputWrapperInputText'>
                                                       CVV
                                                       
                                                   </div>
                                                   <div className='cart__CreditCardInputWrapper'>
                                                       <input  className='cart__CreditCardInput' type="tel" name="cvv"  inputMode='numeric' autoComplete='cc-number' onChange={(event) => setCvv(event.target.value)} />
                                                       
                                                   </div>
                                                   
                                               </div>
                                               
                                           </div>
                                           <div  className='cart__CreditCardBillingRowColumn'>
                                               <div className='cart__CreditCardBillingRowColumnInput'>
                                                   <div className='cart__CreditCardInputWrapperInputText'>
                                                   Expiry Date (MM/YY)
                                                       
                                                   </div>
                                                   <div className='cart__CreditCardInputWrapper'>
                                                       <input  className='cart__CreditCardInput' type="tel" name="expirydate"  inputMode='numeric' autoComplete='cc-number' onChange={(event) => setExpiryDate(event.target.value)} />
                                                       
                                                   </div>
                                                   
                                               </div>
                                               
                                           </div>
                                          

                                       </div>
                                       <div className='cart__CreditCardInputWrapper'>
                                                   <div className='cart__CreditCardInputWrapperInputText'>
                                                   Zipcode
                                                       
                                                   </div>
                                                   <div className='cart__CreditCardInputWrapper'>
                                                       <input  className='cart__CreditCardInput' type="tel" name=""  inputMode='numeric' autoComplete='cc-number' onChange={(event) => setZipcode(event.target.value)}/>
                                                       
                                                   </div>
                                                
                                                   
                                               </div>
                                               <div className='cart__CreditCardBottomWrapper'>
                                               <div className='cart__CreditCardInputButtonWrapper'>
                                                   <div onClick={cancelPaymentDropdown} className='cart__CreditCardInputButton'>
                                                       Cancel
                                                   </div>
                                                   <div onClick={handleSubmit} className='cart__CreditCardInputButton2' >
                                                   Use This Payment Method
                                                   </div>
                                               </div>
                                                   
                                               </div>
            
        </motion.div>
    )
}

export default CreditCard
