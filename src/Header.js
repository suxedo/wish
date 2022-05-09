import React, { useState, useEffect } from "react";
import "./Header.css";
import MaterialIcon, { colorPalette } from "material-icons-react";
import { Link } from "react-router-dom";
import { getCartCount, getBasketTotal } from "./redux/reducers/baskets";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Auth, DataStore } from "aws-amplify";
import useWindowSize from "./utils/useWindowSize";
import { User } from "./models";
import HeaderPhone from "./Phone/HeaderPhone";
function Header(props) {
  const { baskets, addToBasket, removeFromBasket } = props;
  const {height, width }  = useWindowSize()

  const [showDropdown, setShowDropdown] = useState(false);
  function onMouseEnte() { 
    setShowDropdown(true);
  }
  function onMouseLeav() {
    setShowDropdown(false);
  }
  const [user, setUser] = useState(null)
  
  useEffect(() => {
     
        getCurrentUser();
     
    }, []);

    const getCurrentUser = async () => {
      const user = await Auth.currentAuthenticatedUser();
      await DataStore.query(User, u => u.userSub('eq', user.attributes.sub)).then((data) => {
        if (data) {
          setUser({ uid: user.attributes.sub, ...data });
           
        }

    })
     
  };

  

  return (
   
    <div className="header">

<div  className="header__menuBtn">
<svg viewBox="0 0 20 14" xmlns="http://www.w3.org/2000/svg" data-testid="topmenu-hamburger" style={{height: "14px", width: "20px", margin: "16px", color: "rgb(25, 42, 50)"}}><g fill="none" fill-rule="evenodd"><path d="M-1-5h24v24H-1z"></path><path d="M0 14h20v-2.333H0V14zm0-5.833h20V5.833H0v2.334zM0 0v2.333h20V0H0z" fill="#192a32"></path></g></svg>
  
</div>

  <div className="header__logo">
    <a className="header__logoLink">
      <svg
        width="59.49999999999999"
        height="21"
        viewBox="0 0 143 48"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g fill="#2fb7ec" fill-rule="evenodd">
          <path d="M71.04 10.045c-.867-1.022-1.192-2.273-.974-3.757.217-1.48.91-2.734 2.076-3.755C73.309 1.51 74.629 1 76.105 1c1.475 0 2.647.511 3.513 1.533.868 1.02 1.192 2.274.975 3.755-.218 1.484-.91 2.735-2.076 3.757-1.168 1.02-2.49 1.532-3.964 1.532-1.476 0-2.647-.511-3.514-1.532M59.272 15.146c-1.732 0-3.343 1.411-3.582 3.134l-1.76 12.833c-.194 1.398-.864 2.61-2.008 3.638-1.145 1.028-2.435 1.542-3.865 1.542-1.392 0-2.52-.503-3.381-1.511-.864-1.007-1.195-2.23-.997-3.669l1.062-7.788c.032-1.554-1.134-2.77-2.742-2.77h-4.21c-1.608 0-3.112 1.216-3.508 2.77l-1.097 7.788c-.198 1.44-.87 2.662-2.012 3.669-1.142 1.008-2.409 1.511-3.799 1.511-1.392 0-2.528-.514-3.408-1.542-.881-1.027-1.224-2.24-1.031-3.638l2.358-17.028c.25-1.658-.732-3.39-2.23-4.093 0 0-17.758-7.402-18.915-7.878-1.172-.48-2.5.596-2.954 2.39L.108 8.787c-.455 1.794.57 3.834 2.275 4.533l11.901 4.926-1.783 12.867c-.598 4.315.413 8.007 3.038 11.069 2.624 3.064 6.084 4.594 10.382 4.594 3.967 0 7.59-1.335 10.865-4.008 2.616 2.673 5.89 4.008 9.818 4.008 4.297 0 8.181-1.53 11.654-4.594 3.472-3.062 5.508-6.754 6.106-11.069 0 0 1.865-13.579 1.899-13.816.162-1.184-1.12-2.15-2.851-2.15h-4.14zM76.717 15h-3.72c-1.557 0-3.005 1.267-3.22 2.815 0 0-3.747 26.755-3.764 26.886-.147 1.063 1.005 1.933 2.561 1.933h3.72c1.556 0 3.004-1.267 3.218-2.815l3.765-26.886C79.424 15.87 78.272 15 76.717 15M140.49 18.517c-2.133-2.517-5.02-3.776-8.663-3.776-3.644 0-7.046.798-10.4 3.693l2.375-16.463C123.952.887 122.776 0 121.19 0h-3.795c-1.589 0-3.067 1.292-3.284 2.873l-6.097 41.94c-.15 1.083 1.025 1.971 2.613 1.971h3.795c1.559 0 3.008-1.246 3.268-2.787h.005l1.91-13.08c.386-2.643 1.4-4.647 3.044-6.01 1.643-1.364 3.436-2.046 5.375-2.046 3.92 0 5.503 2.602 4.744 7.804l-2.035 14.108c-.15 1.084 1.026 1.971 2.614 1.971h3.793c1.59 0 3.066-1.292 3.286-2.873l2.345-15.283c.612-4.196-.148-7.554-2.28-10.071M105.235 23.153l1.775-2.266c.752-.96.77-2.437.045-3.447-.318-.547-1.242-1.078-2.086-1.534l-.095-.052c-2.67-1.448-5.294-1.994-8.772-1.824-3.778.185-7.002 1.3-9.581 3.315-2.6 2.03-4.07 4.601-4.366 7.64-.301 3.084.74 5.386 3.091 6.843 1.117.706 2.138 1.244 3.034 1.6.89.357 2.2.775 3.895 1.245 1.646.459 2.9.98 3.724 1.543.756.52 1.094 1.077 1.032 1.703-.063.654-.401 1.183-1.031 1.616-.655.45-1.53.706-2.598.758-2.888.141-5.605-.533-8.075-2.004l-1.833-1.015a1.853 1.853 0 0 0-.99-.224 1.938 1.938 0 0 0-1.444.742l-2.636 3.494c-.27.358-.376.787-.3 1.207.073.408.308.76.664.998.863.68 1.76 1.273 2.668 1.764a19.146 19.146 0 0 0 3.8 1.579c2.49.736 4.961 1.05 7.34.934 3.586-.176 6.684-1.306 9.21-3.36 2.543-2.067 3.99-4.755 4.307-7.989.321-3.282-.62-5.61-2.798-6.922-1.116-.662-2.102-1.152-2.932-1.456-.825-.3-2.22-.724-4.147-1.258-1.904-.526-3.27-1.008-4.063-1.43-.698-.372-.992-.87-.924-1.567.127-1.307 1.47-2.032 3.988-2.154 2.025-.1 4.057.368 6.029 1.383.405.223.852.49 1.26.752.507.283.897.396 1.269.377.548-.026 1.023-.331 1.54-.99z"></path>
        </g>
      </svg>
    </a>
  </div>

  <div className="header__right">
    <div className="header__search">
      <div className="header__input">
        <div className="header__inputWrapper">
          <div className="header__searchIcon">
            <div className="header__searchIconWrapper">
              <svg viewBox="0 0 24 24">
                <g fill="none" fill-rule="evenodd">
                  <path
                    fill="#000"
                    fill-rule="nonzero"
                    stroke="#000"
                    d="M22.78 21.7533333L15.8866667 14.86c1.2222222-1.4666667 1.98-3.3488889 1.98-5.42666667C17.8666667 4.78888889 14.0777778 1 9.43333333 1 4.78888889 1 1 4.78888889 1 9.43333333c0 4.64444447 3.78888889 8.43333337 8.43333333 8.43333337 2.05333337 0 3.95999997-.7333334 5.42666667-1.98L21.7533333 22.78c.2933334.2933333.7577778.2933333 1.0266667 0 .2933333-.2933333.2933333-.7333333 0-1.0266667zm-13.34666667-4.62c-4.24175438 0-7.7-3.4582456-7.7-7.69999997 0-4.24175438 3.45824562-7.7 7.7-7.7 4.24175437 0 7.69999997 3.45824562 7.69999997 7.7 0 4.24175437-3.4582456 7.69999997-7.69999997 7.69999997z"
                  ></path>
                  <path d="M0 0h24v24H0z"></path>
                </g>
              </svg>
            </div>
          </div>

          <input
            maxLength={100}
            className="header__search__input"
            type="text"
            placeholder="What do you want to find?"
          />
        </div>
      </div>

      <div className="header__searchBtn">
        <p>Search</p>
      </div>
    </div>
    <Link  to={`/profile/` + user?.uid}  className="header__baraccount">
      <div
      
        className="header__profile"
      >
        <img
          className="header__profileImg"
          alt="name"
          src="https://canary.contestimg.wish.com/api/image/fetch?profile_image_name=NTYwNWMxYmEyMWE4NjMxNzk0ZTk1NDUy_1398450030237.jpg&w=50&h=50"
        />
      </div>
      <div
        className="header__ProfileHover">
        jjjj
      </div>
    </Link>
    <div className="header__IconWrapper">
      <a href="/" className="header__IconLink">
        <svg
          viewBox="0 0 18 18"
          xmlns="http://www.w3.org/2000/svg"
          style={{ width: "25px", height: "25px" }}
        >
          <g fill="none" fill-rule="evenodd">
            <path d="M0 0h17.9769498v17.9912918H0z"></path>
            <path
              fill="#192a32"
              d="M8.98847491 15.9194676c.82394353 0 1.49807919-.6746734 1.49807919-1.4992743H7.49039576c0 .8246009.66664522 1.4992743 1.49807915 1.4992743zm4.49423749-4.4978229V7.6734589c0-2.30138607-1.2284249-4.22795357-3.3706781-4.73770684v-.50975327c0-.62219884-.50185654-1.12445574-1.12355939-1.12445574s-1.12355936.5022569-1.12355936 1.12445574v.50975327c-2.14974359.50975327-3.3706781 2.42882439-3.3706781 4.73770684v3.7481858L2.9961583 12.920919v.7496372h11.9846332v-.7496372l-1.4980791-1.4992743z"
            ></path>
          </g>
        </svg>
        <span className="header__IconDot"></span>
      </a>
    </div>
    <div className="header__IconWrapper">
      <Link to="/cart" className="header__IconLink">
        <svg
          viewBox="0 0 21 17"
          xmlns="http://www.w3.org/2000/svg"
          class="RTLStyles__RTLSupportedSVG-kgrrgi-0 ilAChZ"
          style={{ width: "25px", height: "19px" }}
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
        <div className="header__CartCount">{getCartCount(baskets)}</div>
      </Link>
    </div>
    <div className="header__IconWrapper">
      <a href="/" className="header__IconLink">
        <svg
          viewBox="0 0 21 19"
          style={{
            width: "21px",
            height: "19px",
            color: "rgb(25, 42, 50)",
            padding: "2px 0px 2px 2px",
          }}
        >
          <path
            d="M15.25 0C18.496 0 21 2.51 21 5.781c0 1.046-.26 2.053-.772 3.068-.677 1.341-1.751 2.663-3.544 4.477-.611.619-4.287 4.176-5.472 5.376-.1879198.190548-.4443764.2978205-.712.2978205-.2676236 0-.52408017-.1072725-.712-.2978205-1.185-1.2-4.86-4.757-5.472-5.376C2.523 11.512 1.45 10.19.772 8.849.261 7.834 0 6.827 0 5.78 0 2.511 2.504 0 5.75 0c1.831 0 3.606.88 4.75 2.251C11.643.88 13.417 0 15.25 0z"
            fill="#192a32"
            fill-rule="nonzero"
          ></path>
        </svg>
      </a>
    </div>
  </div>

  
</div>

 
  );
}

const mapStateToProps = (store) => ({
  baskets: store.basketsState.baskets,
});

const mapDispatchProps = (dispatch) => bindActionCreators({}, dispatch);

export default connect(mapStateToProps, mapDispatchProps)(Header);
