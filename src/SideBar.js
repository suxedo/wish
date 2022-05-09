import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import CategoriesSlide from "./CategoriesSlide";
import useWindowSize from "./utils/useWindowSize";
import TabBar from "./Phone/TabBar";

import "./SideBar.css";
function SideBar() {
  const [showSlide, setShowSlide] = useState(false);
  const { height, width } = useWindowSize();
  function onMouseEnter() {
    setShowSlide(true);
  }
  function onMouseLeave() {
    setShowSlide(false);
  }
  const handleClick = (e) => {
    e.preventDefault();
  };
  return (
    <div>
    
                 <div className="sidebar__category">
          <p className="sidebar__categoryHeading">Top Features</p>
          <NavLink
            to={`/`}
            className={({ isActive }) =>
              isActive ? "sidebar__categoryTabActive" : "sidebar__categoryTab"
            }
          >
            <svg viewBox="0 0 17 17" className="sidebar__categoryTabIcon">
              <path
                d="M11.044 5.588c6.307.633 6.326.672 1.577 5.064 1.375 6.405 1.283 6.482-4.126 3.126-5.408 3.356-5.482 3.28-4.107-3.126-4.767-4.392-4.73-4.43 1.559-5.064 2.548-6.117 2.567-6.117 5.097 0z"
                stroke="#C0952B"
                fill="#FFD560"
                fill-rule="evenodd"
              ></path>
            </svg>
            <p className="sidebar__categoryTabText">Popular</p>
          </NavLink>

          <div className="sidebar__categoryTab">
            <svg
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
              className="sidebar__categoryTabIcon"
            >
              <path
                d="M4.12589 14.4829C4.0221 14.3922 3.92064 14.2992 3.8216 14.2039L3.78937 14.1743H3.79104C2.24782 12.6744 1.3 10.6179 1.3 8.33689C1.3 3.73255 5.18956 0 9.98758 0C14.7856 0 18.6752 3.73255 18.6752 8.33689C18.6752 10.9454 17.4355 13.2878 15.4834 14.8206L9.98717 19.857L4.12589 14.4829ZM12.3048 8.33708C12.3048 9.5649 11.2676 10.5603 9.98814 10.5603C8.70867 10.5603 7.67146 9.5649 7.67146 8.33708C7.67146 7.10926 8.70867 6.11391 9.98814 6.11391C11.2676 6.11391 12.3048 7.10926 12.3048 8.33708Z"
                fill="#2eaa77"
                fill-rule="evenodd"
                clip-rule="evenodd"
              ></path>
            </svg>
            <p className="sidebar__categoryTabText">Pickup</p>
          </div>
          <div className="sidebar__categoryTab">
            <svg
              className="sidebar__categoryTabIcon"
              viewBox="0 0 22 22"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g fill="none" fill-rule="evenodd">
                <g>
                  <circle
                    fill="#C0952B"
                    cx="10.952"
                    cy="10.952"
                    r="10.952"
                  ></circle>
                  <path
                    d="M10.917 11.067l-.004.003L2.79 6.347a9.413 9.413 0 0 1 8.15-4.722l-.023 9.442z"
                    fill="#F9D798"
                  ></path>
                  <path
                    d="M10.918 11.067l.022-9.441A9.344 9.344 0 0 1 15.666 2.9a9.4 9.4 0 0 1 3.424 3.43l-8.172 4.736z"
                    fill="#F1BE40"
                  ></path>
                  <path
                    d="M19.097 15.83l-8.179-4.757v-.006l8.172-4.735a9.493 9.493 0 0 1 .007 9.498"
                    fill="#F7D48E"
                  ></path>
                  <path
                    d="M10.91 11.074v-.006L2.789 6.345a9.493 9.493 0 0 0-.02 9.449l8.143-4.72z"
                    fill="#F5C24F"
                  ></path>
                  <path
                    d="M10.91 11.074l-8.142 4.72a9.391 9.391 0 0 0 3.453 3.48 9.352 9.352 0 0 0 4.667 1.276l.022-9.476z"
                    fill="#F9D798"
                  ></path>
                  <path
                    d="M19.096 15.828l-8.18-4.757-.006.003-.022 9.476a9.41 9.41 0 0 0 8.208-4.722"
                    fill="#F1BE40"
                  ></path>
                </g>
                <path
                  d="M11 13.463a2.4 2.4 0 0 0 2.4-2.4c0-.884-.8-2.025-2.4-3.423-1.6 1.398-2.4 2.539-2.4 3.423a2.4 2.4 0 0 0 2.4 2.4z"
                  fill="#FFF"
                ></path>
                <path d="M-1-1h24v24H-1z"></path>
              </g>
            </svg>
            <p className="sidebar__categoryTabText">Blitz Buy</p>
          </div>
          <div className="sidebar__categoryTab">
            <svg className="sidebar__categoryTabIcon" viewBox="0 0 22 22">
              <g fill="none" fill-rule="evenodd">
                <circle
                  fill="#0098D3"
                  fill-rule="nonzero"
                  cx="11"
                  cy="11"
                  r="11"
                ></circle>
                <path
                  d="M11 20.5a9.5 9.5 0 1 0 0-19 9.5 9.5 0 0 0 0 19z"
                  fill="#DBF3FC"
                  fill-rule="nonzero"
                ></path>
                <path
                  d="M11 1.5v9.445l6.745 6.745A9.5 9.5 0 1 1 11 1.5z"
                  fill="#FFF"
                  fill-rule="nonzero"
                ></path>
                <path
                  stroke="#0098D3"
                  stroke-width="1.54"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M14.818 14.663L11 11.018v-6.39"
                ></path>
              </g>
            </svg>
            <p className="sidebar__categoryTabText">Recent</p>
          </div>

          <NavLink
            to={`/feed`}
            onClick={handleClick}
            className={({ isActive }) =>
              isActive ? "sidebar__categoryTabActive" : "sidebar__categoryTab"
            }
            onMouseLeave={onMouseLeave}
            onMouseEnter={onMouseEnter}
          >
            <svg viewBox="0 0 24 24" className="sidebar__categoryTabIcon">
              <g
                id="Icons/Main/ic_grid_24"
                stroke="none"
                stroke-width="1"
                fill="none"
                fill-rule="evenodd"
              >
                <g id="Group-14-Copy">
                  <rect
                    id="Rectangle-4"
                    x="0"
                    y="0"
                    width="24"
                    height="24"
                  ></rect>
                  <g
                    id="Group"
                    transform="translate(2.000000, 2.000000)"
                    fill="#79D6FA"
                    stroke="#006BA0"
                    stroke-width="1.4"
                  >
                    <rect
                      id="Rectangle-5"
                      x="0.7"
                      y="0.7"
                      width="7.6"
                      height="7.6"
                      rx="1.4"
                    ></rect>
                    <rect
                      id="Rectangle-5-Copy-2"
                      x="11.7"
                      y="0.7"
                      width="7.6"
                      height="7.6"
                      rx="1.4"
                    ></rect>
                    <rect
                      id="Rectangle-5-Copy-3"
                      x="11.7"
                      y="11.7"
                      width="7.6"
                      height="7.6"
                      rx="1.4"
                    ></rect>
                    <rect
                      id="Rectangle-5-Copy-4"
                      x="0.7"
                      y="11.7"
                      width="7.6"
                      height="7.6"
                      rx="1.4"
                    ></rect>
                  </g>
                </g>
              </g>
            </svg>
            <p className="sidebar__categoryTabText">Categories</p>
          </NavLink>
       
        </div>
        <div
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        className={
          showSlide === true
            ? "sidebar__categoryTabhover"
            : "sidebar__categoryslide"
        }
      >
        <CategoriesSlide />
      </div>
          
     
 
     

    
    </div>
  );
}

export default SideBar;
