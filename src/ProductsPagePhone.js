import React, { useState } from "react";

import "./ProductPagePhone.css";
import { useParams, Link } from "react-router-dom";
import Modal from "./Modal";
import CurrencyFormat from "react-currency-format";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { addToBasket } from "./redux/actions";
import { ADD_TO_BASKET } from "./redux/constants";
import { DataStore } from "aws-amplify";
import useWindowSize from "./utils/useWindowSize";

import Products from "./Products";
import { Product } from "./models";

function ProductsPagePhone(props) {
  const { name } = useParams();
  const [isOpen, setIsOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const { baskets, addToBasket, quantity } = props;
  const { height, width } = useWindowSize();

  const [loading, setLoading] = useState(true);

  React.useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);
  React.useEffect(() => {
    async function fetchProduct() {
      try {
        await DataStore.query(Product).then(setProducts);
      } catch (error) {
        console.log(error);
      }
    }
    fetchProduct();
  }, []);

  function getCategoryProducts() {
    let productList = products.filter(
      (a) => a.categories[0] === name || a.categories[1] === name
    );
    if (productList.length > 0) {
      return productList.map((item) => {
       
        return (
        
         
            <Link to={`/feed/product/` + item.id} className="productPhone__card">
            <img className="product__card-image" src={item.url} alt="wear" />
            <div className="product__card-detail">
              <CurrencyFormat
                renderText={(value) => (
                  <>
                    <h3 className="product__card-detailprice"> {value}</h3>
                  </>
                )}
                decimalScale={2}
                value={item.price} // Part of the homework
                displayType={"text"}
                thousandSeparator={true}
                prefix={"₦"}
              />
              <div className="product__card-detailA">100+ bought this</div>
            </div>
            <span onClick={() => addToBasket(item)} className="circle"></span>
           
          </Link>
            
        
              
          
     
        
        );
      });
    }
  }
  function getCategoryProductsPhone() {
    let productList = products.filter(
      (a) => a.categories[0] === name || a.categories[1] === name
    );
    if (productList.length > 0) {
      return productList.map((item) => {
        return (
          <Link to={`/feed/product/` + item.id} className="product__card">
            <img className="product__card-image" src={item.url} alt="wear" />
            <div className="product__card-detail">
              <CurrencyFormat
                renderText={(value) => (
                  <>
                    <h3 className="product__card-detailprice"> {value}</h3>
                  </>
                )}
                decimalScale={2}
                value={item.price} // Part of the homework
                displayType={"text"}
                thousandSeparator={true}
                prefix={"₦"}
              />
              <div className="product__card-detailA">100+ bought this</div>
            </div>
           
         
          </Link>
        );
      });
    }
  }
  function getLoading() {
    let productList = products.filter(
      (a) => a.categories[0] === name || a.categories[1] === name
    );
    if (productList.length > 0) {
      return productList.map((item) => {
        return <div className="product__card"></div>;
      });
    }
  }

  return (
    <div className="test">
      {loading === false ? (
       <div className="productPhone__cardGrid">
          {getCategoryProducts()}
         

        </div>
      
       
      ) : (
        <div className="productPhone__cardGrid">{getLoading()}</div>
      )}

      {isOpen && (
        <div className="base">
          <Modal setIsOpen={setIsOpen} />
        </div>     )}
    </div>
  );
}

const mapStateToProps = (store) => ({
  baskets: store.basketsState.baskets,
  quantity: store.basketsState.quantity,
});

const mapDispatchProps = (dispatch) =>
  bindActionCreators({ addToBasket }, dispatch);

export default connect(mapStateToProps, mapDispatchProps)(ProductsPagePhone);
