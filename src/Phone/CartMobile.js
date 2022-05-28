import React from "react";
import { Link } from "react-router-dom";
import "./CartMobile.css";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { removeFromBasket, addToBasket } from "../redux/actions";
import CartListItemsPhone from "./CartListItemsPhone";

function CartMobile(props) {
  const { baskets, addToBasket, removeFromBasket } = props;

  return (
    <div style={{ marginTop: "40px" }} className="ttt">
      {baskets.length !== 0 ? (
        <div>
          <div className="cartmobile__sectionWrapper">
            <div className="cartmobile__sectionWrapperItem">
              Shipping and Payment
            </div>
            <Link to="/" className="cartmobile__sectionWrapperItemLink">
              <div className="cartmobile__sectionWrapperItemLabel">
                Pay With:
              </div>
              <div>
                MasterCard 6235
                <svg
                  width="27"
                  height="12"
                  viewBox="0 0 6 10"
                  xmlns="http://www.w3.org/2000/svg"
                  style={{
                    transform: "rotate(0deg)",
                    transition: "all 0.25s ease 0s",
                  }}
                >
                  <path
                    d="M1 1l4 4.01L1 9"
                    stroke="#2fb7ec"
                    stroke-width="1.5"
                    fill="none"
                    fill-rule="evenodd"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></path>
                </svg>
              </div>
            </Link>
          </div>

          <div className="cartmobile__sectionWrapper">
            <div className="cartmobile__sectionWrapperItem">Items in Cart</div>
            <CartListItemsPhone
              baskets={baskets}
              removeFromBasket={removeFromBasket}
              addToBasket={addToBasket}
            />
          </div>
          <div className="cartmobile__sectionWrapper">
            <div className="cartmobile__sectionWrapperItem">
              How do you want to pay?
            </div>
            <div></div>
            <div className="cartP__InfoWrapper2">
              <div className="cartP__ShippingWrapperInfo">
                <div className="cartP__ShippingOption">
                  <div className="cartP__ShippingRadioWrapper">
                    <div className="cartP__RadioOptions">
                      <div className="cartP__btnRadio"></div>
                      <div className="cartP__ShippingOptionTitle">
                        Pay full amount
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="cartP__ShippingWrapperInfo">
                <div className="cartP__ShippingOption">
                  <div className="cartP__ShippingRadioWrapper">
                    <div className="cartP__RadioOptions">
                      <div className="cartP__btnRadio"></div>
                      <div className="cartP__ShippingOptionTitle">
                        4 interest-free payments
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="cartmobile__sectionWrapper">
            <div className="cartmobile__sectionWrapperItem">Order Summary</div>
            <div className="orderSummary__addPromoSection">
              <div className="OrderSummary__PlusIconWrapper">
                <svg
                  viewBox="0 0 18 18"
                  style={{ width: "18px", height: "18px" }}
                >
                  <g fill="none" fill-rule="evenodd">
                    <path d="M0 0h18v18H0z"></path>
                    <path
                      fill="#2fb7ec"
                      d="M10.0909091 9.81818182h4.5c.2181818 0 .4090909-.19090909.4090909-.40909091v-.81818182c0-.21818182-.1909091-.40909091-.4090909-.40909091h-4.5c-.16363637 0-.27272728-.10909091-.27272728-.27272727v-4.5C9.81818182 3.19090909 9.62727273 3 9.40909091 3h-.81818182c-.21818182 0-.40909091.19090909-.40909091.40909091v4.5c0 .16363636-.10909091.27272727-.27272727.27272727h-4.5C3.19090909 8.18181818 3 8.37272727 3 8.59090909v.81818182c0 .21818182.19090909.40909091.40909091.40909091h4.5c.16363636 0 .27272727.10909091.27272727.27272728v4.5c0 .2181818.19090909.4090909.40909091.4090909h.81818182c.21818182 0 .40909091-.1909091.40909091-.4090909v-4.5c0-.16363637.10909091-.27272728.27272728-.27272728z"
                    ></path>
                  </g>
                </svg>
              </div>
              Apply a coupon
            </div>
            <div className="OrderSummary__PriceSection">
              <div color="#192A32" className="OrderSummary__PriceRow">
                <div className="OrderSummary__PriceTitle">Item Total</div>$3.00
              </div>
              <div color="#192A32" className="OrderSummary__PriceRow">
                <div className="OrderSummary__PriceTitle">Shipping</div>$4.70
              </div>
              <div color="#192A32" className="OrderSummary__PriceRow">
                <div className="OrderSummary__PriceTitle">Tax</div>$0.34
              </div>
              <div color="#14A671" className="OrderSummary__PriceRow">
                <div className="OrderSummary__PriceTitle">Wish Cash</div>-$0.09
              </div>
              <div color="#192A32" className="OrderSummary__PriceRow">
                <div className="OrderSummary__PriceTitle">Order Total</div>$7.95
              </div>
            </div>
          </div>
          <div className="CartPage__BottomBannerWrapper">
            <div className="OrderHistory__CarouselBannerCardWrapper">
              <div className="OrderHistory__CarouselBannerIconWrapper">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 32 32"
                  style={{ width: "32px", height: "32px" }}
                >
                  <path
                    fill="#4CC1BF"
                    d="M12.404 6.632l4.04 1.617-9.25 4.056-4.487-1.796 9.697-3.877zm5.389 2.154l4.308 1.723-9.697 3.877L8.55 12.85l9.242-4.064zm5.015 2.568v13.745L12.924 29V15.304l9.884-3.95zM2 11.354l4.682 1.87v3.811a.518.518 0 00.52.528.522.522 0 00.52-.528v-3.397l4.162 1.666V29L2 25.099V11.354z"
                  ></path>
                  <path
                    fill="#FBB036"
                    stroke="#fff"
                    d="M23.237 18.474l.158.474h.002l.004-.002.014-.005.05-.017.183-.067a16.156 16.156 0 002.678-1.314c1.496-.921 3.226-2.368 3.728-4.376l.004-.013c.289-1.158.916-3.665.916-5.988v-.284l-.245-.146c-2.036-1.211-4.161-2.01-5.976-2.692a91.742 91.742 0 01-1.333-.51l-.172-.067-.175.06c-2.709.942-5.726 2.138-7.35 3.223L15.5 6.9v.267c0 2.323.625 4.825.916 5.988l.003.013c.503 2.008 2.233 3.455 3.729 4.376a16.156 16.156 0 002.861 1.38l.05.018.014.005.004.001h.001l.159-.473zm0 0l.158.474-.158.053-.158-.053.158-.474z"
                  ></path>
                  <path
                    fill="#fff"
                    stroke="#fff"
                    d="M25.098 9.211l.347.345-.347-.345-2.708 2.722-.827-.777a1.104 1.104 0 00-1.567.053 1.115 1.115 0 00.053 1.57l1.609 1.514c.436.41 1.118.399 1.54-.026l3.467-3.484a1.115 1.115 0 00.002-1.57 1.104 1.104 0 00-1.569-.002z"
                  ></path>
                  <path
                    fill="#FBB036"
                    fill-rule="evenodd"
                    d="M16 7.166C17.565 6.121 20.522 4.943 23.237 4c2.085.822 4.722 1.67 7.237 3.166 0 2.262-.615 4.722-.905 5.88-.904 3.619-6.332 5.428-6.332 5.428s-5.428-1.81-6.332-5.428C16.614 11.882 16 9.428 16 7.166z"
                    clip-rule="evenodd"
                  ></path>
                  <path
                    fill="#fff"
                    fill-rule="evenodd"
                    d="M25.453 9.564a.604.604 0 01.859.001.615.615 0 01-.001.865l-3.467 3.485a.604.604 0 01-.844.014l-1.609-1.515a.615.615 0 01-.029-.865.604.604 0 01.859-.03l1.18 1.112 3.052-3.067z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </div>
              <div className="OrderHistory__CarouselBannerTextWrapper">
                <div className="OrderHistory__CarouselBannerTitle">
                  Money Back Guarantee
                </div>
                <div className="OrderHistory__CarouselBannerSubtitle">
                  We’ve got your back. Get a full refund if any of your items
                  don’t arrive.
                  <span className="OrderHistory__CarouselBannerLearnMoreLink">
                    Learn More
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div class="ReturnPolicy__ReturnPolicyWrapper">
            <div
              width="14px"
              height="16px"
              class="SvgUtils__SvgWrapper-sc-17kr4oq-0 geQpJV"
            >
              <svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
                <g fill="none" fill-rule="evenodd">
                  <path
                    d="M36.098 9.716c-.93 12.852-6.27 22.005-16.02 27.46-4.97-3.398-8.783-7.24-11.441-11.527l27.46-15.933z"
                    fill="#49C3EE"
                  ></path>
                  <path
                    d="M3.902 9.765c3.823-2.295 9.373-5.481 15.986-7.814 5.08 2.032 10.084 4.115 16.21 7.814-.934 12.74-6.3 21.815-16.098 27.222C9.459 29.877 4.093 20.802 3.902 9.765z"
                    fill-opacity=".84"
                    fill="#2fb7ec"
                  ></path>
                  <path
                    d="M8.921 12.172c2.701-1.62 6.623-3.868 11.296-5.515 3.59 1.434 7.127 2.905 11.455 5.515-.66 8.993-4.451 15.398-11.375 19.215-7.45-5.02-11.241-11.424-11.376-19.215z"
                    fill-opacity=".97"
                    fill="#FFF"
                    opacity=".162"
                  ></path>
                  <path d="M.488.488h39.024v39.024H.488z"></path>
                  <path
                    d="M19.824 1.951L20 36.964l-.04.023C9.442 29.81 4.09 20.721 3.901 9.72c3.799-2.301 9.852-5.668 15.922-7.769z"
                    fill="#FFF"
                    opacity=".33"
                  ></path>
                  <path
                    fill="#FFF"
                    opacity=".823"
                    d="M20 21.664l-3.804 2.066.85-4.15-3.2-2.872 4.328-.499L20 12.367l1.826 3.842 4.329.499-3.2 2.872.849 4.15z"
                  ></path>
                </g>
              </svg>
            </div>
            <div
              color="#2FB7EC"
              role="none"
              class="DesignSpec__TextSpecWrapper"
              style={{ marginLeft: "8px" }}
            >
              30 Day Free Return and Refund
            </div>
          </div>

          <div class="CartPage__CheckoutFooterWrapper">
            <div class="CartPage__CheckoutFooter">
              <a href="/shipping">
                <div
                  size="2"
                  color="17"
                  role="button"
                  rel="noopener noreferrer"
                  class="Button Button___StyledStyledWishButtonWithKeyboard"
                  tabindex="0"
                >
                  Checkout
                </div>
              </a>
            </div>
          </div>
        </div>
      ) : (
        <div className="ttt">
          <div className="cartmobile__emptyIcon">
            <svg
              viewBox="0 0 21 17"
              xmlns="http://www.w3.org/2000/svg"
              class="RTLStyles__RTLSupportedSVG-kgrrgi-0 ilAChZ"
              style={{ width: "20px", height: "17px" }}
            >
              <g fill="none" fill-rule="evenodd">
                <g transform="translate(.56 .52)" fill="#192a32">
                  <ellipse
                    cx="14.753"
                    cy="14.813"
                    rx="1.366"
                    ry="1.285"
                  ></ellipse>
                  <ellipse
                    cx="6.674"
                    cy="14.813"
                    rx="1.366"
                    ry="1.285"
                  ></ellipse>
                  <path d="M1.113 1.873h-.28a.832.832 0 0 1 0-1.665h2.83a1 1 0 0 1 .779.373l1.41 1.752a1 1 0 0 0 .779.373h12.106a1 1 0 0 1 .978 1.207l-1.365 6.422a1 1 0 0 1-.854.784L5.797 12.587a1 1 0 0 1-1.09-.736L2.508 3.583 2.03 2.476a1 1 0 0 0-.917-.603z"></path>
                </g>
                <path d="M0-2h21v21H0z"></path>
              </g>
            </svg>
          </div>
          <div className="cartmobile__emptyText">Your cart is empty!</div>
          <div className="cartmobile__emptyBtn">Continue Shopping</div>
          sss
        </div>
      )}
    </div>
  );
}

const mapStateToProps = (store) => ({
  baskets: store.basketsState.baskets,
});

const mapDispatchProps = (dispatch) =>
  bindActionCreators({ addToBasket, removeFromBasket }, dispatch);

export default connect(mapStateToProps, mapDispatchProps)(CartMobile);
