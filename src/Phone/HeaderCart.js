import React from 'react'
import { Link } from 'react-router-dom'
import './HeaderCart.css'
import { useNavigate } from "react-router-dom";
function HeaderCart() {
    const navigate = useNavigate();
    const handleClick = (e) => {
        e.preventDefault(navigate(-1))
        
       
      }
    

    return (
        <div className='headerCart'>
            <div onClick={handleClick} className='headerCart__Icon'>
            <svg width="20px" height="20px" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" style={{transform: "rotate(0deg)", transition: "all 0.25s ease 0s"}}><path d="M3.8 7l4.89-4.89c.392-.392.39-1.03.005-1.415C8.31.31 7.676.324 7.29.71L.71 7.29a1.01 1.01 0 0 0 0 1.42l6.58 6.58a.997.997 0 0 0 1.418.002l-.016.016a1.002 1.002 0 0 0-.001-1.417L3.8 9h11.202a1 1 0 0 0 0-2H3.8z" fill="#192a32" fill-rule="evenodd"></path></svg>
                
            </div>
               
             <h1 className='headerCart__Text'>Cart</h1>
             <div className='headerCart__Icon'>
                <Link to='/cart' className='header__Icon'>
                <svg viewBox="0 0 21 17" xmlns="http://www.w3.org/2000/svg" class="RTLStyles__RTLSupportedSVG-kgrrgi-0 ilAChZ" style={{width: '22px', height: '18px'}}><g fill="none" fill-rule="evenodd"><g transform="translate(.56 .52)" fill="#192a32"><ellipse cx="14.753" cy="14.813" rx="1.366" ry="1.285"></ellipse><ellipse cx="6.674" cy="14.813" rx="1.366" ry="1.285"></ellipse><path d="M1.113 1.873h-.28a.832.832 0 0 1 0-1.665h2.83a1 1 0 0 1 .779.373l1.41 1.752a1 1 0 0 0 .779.373h12.106a1 1 0 0 1 .978 1.207l-1.365 6.422a1 1 0 0 1-.854.784L5.797 12.587a1 1 0 0 1-1.09-.736L2.508 3.583 2.03 2.476a1 1 0 0 0-.917-.603z"></path></g><path d="M0-2h21v21H0z"></path></g></svg>

                </Link>
            </div>
            
        </div>
    )
}

export default HeaderCart
