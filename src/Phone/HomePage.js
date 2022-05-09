import React from 'react'
import Products from '../Products'
import { useParams, Link } from "react-router-dom";
import CurrencyFormat from 'react-currency-format';
import './HomePage.css'
function HomePage() {
    const { name } = useParams();

    function getCategoryProducts() {
        let productList = Products.filter(a => a.categories[0] === name || a.categories[1] === name) 
        if (productList.length> 0) {
            return productList.map((item)=>{
                return  (
                    <Link to={`/feed/product/` + item.name}  className='product__card'>
                    <img  className='product__card-image' src={item.url} alt='wear'/>
                    <div className='product__card-detail'>
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
                        <div className='product__card-detailA' >
                            100+ bought this
                            
                        </div>
                      
                       
                    </div>
                    <span onClick= { ()=>console.log('hh')} className='circle'></span>
                    <a href="/"> </a>
                    
    
                  </Link>

                      
                  )
              })
            
        }   

        
    }
    return (
        <div className='homePage'>
            <div className='homePage__gridWrapper'>
            {getCategoryProducts()}
                
            </div>
          
           
            
        </div>
    )
}

export default HomePage
