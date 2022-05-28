import React, { useState } from "react";
import CurrencyFormat from "react-currency-format";
import "./CartListItemsPhone.css";
import { animated } from "react-spring";
import { useStepAnimation } from "use-step-animation";
import { motion } from "framer-motion";
import ModalConfirm from "../ModalConfirm";
import ButtonAddRemoveItem from "../ButtonAddRemoveItem";

function CartListItemsPhone({
  baskets,
  getCartCount,
  removeFromBasket,
  addToBasket,
  openDropdown,
  options,
  selectedOption,
  open,
  onOptionClicked,
}) {
  const [openConfirm, setOpenConfirm] = useState(false);

  return (
    <div className="cart__CartList">
     
    
      {baskets.map((item) => {
        return (
          <div className="CartItem__CartItemWrapper">
          <div className="CartItem__ItemContainerWrapper">
            <div className="CartItem__ContainerWrapper">
              <div className="CartItem__ImageContainer">
                <a
                  className="CartItem__CartProductImageLink"
                  href="/product/61cf2f34b5cabc6229af717c"
                >
                  <img
                    alt="1/2PCS Self Heating Support Knee Pad Knee Brace Warm for Arthritis Joint Pain Relief Injury Recovery Belt Knee Massager Leg Warmer"
                    src={item.image}
                    className="CartItem__CartProductImage"
                    style={{ objectFit: "cover" }}
                  />
                </a>
              </div>
              <div className="CartItem__CartProduct">
                <div className="CartItem__CartProductName">
                  {item.name}
                </div>
                <div className="CartItem__CartProductDetail">
                {item?.color}, Size: {item?.size}
                </div>
              </div>
              <div className="CartItem__PriceQuantityWrapper">
                <div className="CartItem__PriceInfo">
                  <div className="CartItem__PriceWrapper">
                   
                    <CurrencyFormat
                        renderText={(value) => (
                          <>
                            <div className="CartItem__ActualPrice">{value}</div>
                          </>
                        )}
                        decimalScale={2}
                        value={item.price} // Part of the homework
                        displayType={"text"}
                        thousandSeparator={true}
                        prefix={"₦"}
                      />
                    
                  </div>
                  <div className="CartItem__PriceWrapper"></div>
                </div>
                <div className="CartItem__QuantityWrapper">
                <ButtonAddRemoveItem
                      quantity={item.quantity}
                      handleRemoveItem={() => removeFromBasket(item)}
                      handleAddItem={() => addToBasket(item)}
                    />
                </div>
              </div>
            </div>
            <div className="CartItem__CartItemInfoWrapper">
              <div className="CartItem__CartItemShippingWrapper">
                <div className="CartItem__ShippingOptions">
                  <div className="WishRadioGroup__RadioOptionWrapper">
                    <div
                      data-id="0"
                      tabindex="0"
                      className="WishRadioGroup__RadioOption"
                    >
                      <div
                        aria-checked="true"
                        role="radio"
                        className="WishRadioGroup__Radio"
                      >
                        <div className="WishRadioGroup__RadioDot"></div>
                      </div>
                      <div className="CartItem__ShippingOption">
                        Standard shipping Jun 10–Jul 1: $2.56
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {openConfirm === true && (
                <ModalConfirm
                  item={item}
                  removeFromBasket={removeFromBasket}
                  setOpenConfirm={setOpenConfirm}
                />
              )}
            
          </div>
          
        );
      })}
      
    </div>
  );
}

export default CartListItemsPhone;
