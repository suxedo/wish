import React from 'react'
import { Link } from 'react-router-dom'
import './CartMobile.css'
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { removeFromBasket, addToBasket } from '../redux/actions';
import CartListItemsPhone from './CartListItemsPhone';

function CartMobile(props) {
  const { baskets, addToBasket, removeFromBasket } = props;

  return (
    <div>
      {baskets.length !== 0 ? (<div className='cartmobile__wrapper' >
        <div className='cartmobile__sectionWrapper'> 
        <div className='cartmobile__sectionWrapperItem'>
        Shipping and Payment
          
        </div>
        <Link to='/' className='cartmobile__sectionWrapperItemLink'>
          <div className='cartmobile__sectionWrapperItemLabel'>
          Pay With:
            
          </div>
          <div>
          MasterCard  6235
          <svg width="27" height="12" viewBox="0 0 6 10" xmlns="http://www.w3.org/2000/svg" style={{transform: "rotate(0deg)", transition: "all 0.25s ease 0s"}}><path d="M1 1l4 4.01L1 9" stroke="#2fb7ec" stroke-width="1.5" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round"></path></svg>
          </div>
        
        </Link>
          
        </div>

        <div className='cartmobile__sectionWrapper'> 
        <div className='cartmobile__sectionWrapperItem'>
        Items in Cart
          
        </div>
        <CartListItemsPhone     
                    baskets={baskets}
                   
                    removeFromBasket={removeFromBasket}
                 
                    addToBasket={addToBasket} />
        
        
        
    
          
        </div>
        
      </div> ): (<div className='cartmobile'>
      <div className='cartmobile__emptyIcon'>
      <svg viewBox="0 0 21 17" xmlns="http://www.w3.org/2000/svg" class="RTLStyles__RTLSupportedSVG-kgrrgi-0 ilAChZ" style={{width: "20px", height: "17px"}}><g fill="none" fill-rule="evenodd"><g transform="translate(.56 .52)" fill="#192a32"><ellipse cx="14.753" cy="14.813" rx="1.366" ry="1.285"></ellipse><ellipse cx="6.674" cy="14.813" rx="1.366" ry="1.285"></ellipse><path d="M1.113 1.873h-.28a.832.832 0 0 1 0-1.665h2.83a1 1 0 0 1 .779.373l1.41 1.752a1 1 0 0 0 .779.373h12.106a1 1 0 0 1 .978 1.207l-1.365 6.422a1 1 0 0 1-.854.784L5.797 12.587a1 1 0 0 1-1.09-.736L2.508 3.583 2.03 2.476a1 1 0 0 0-.917-.603z"></path></g><path d="M0-2h21v21H0z"></path></g></svg>

        
      </div>
      <div className='cartmobile__emptyText'>
      Your cart is empty!
        
      </div>
      <div className='cartmobile__emptyBtn'>
        Continue Shopping
        
      </div>


      sss






    </div> ) }
      


      
    </div>
    
  )
}


const mapStateToProps = (store) => ({
  baskets: store.basketsState.baskets,
});

const mapDispatchProps = (dispatch) =>
  bindActionCreators({ addToBasket, removeFromBasket }, dispatch);

export default connect(mapStateToProps, mapDispatchProps)(CartMobile);

