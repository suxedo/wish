import React from 'react'
import { Link } from 'react-router-dom'
import './Header.css'
import { useNavigate } from "react-router-dom";

function HeaderProfilePhone(){
    const navigate = useNavigate();
    const handleClick = (e) => {
        e.preventDefault(navigate(-1))
        
       
      }
    return (
        <div className='headerCart'>
        <div onClick={handleClick} className='headerCart__Icon'>
        <svg width="20px" height="20px" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" style={{transform: "rotate(0deg)", transition: "all 0.25s ease 0s"}}><path d="M3.8 7l4.89-4.89c.392-.392.39-1.03.005-1.415C8.31.31 7.676.324 7.29.71L.71 7.29a1.01 1.01 0 0 0 0 1.42l6.58 6.58a.997.997 0 0 0 1.418.002l-.016.016a1.002 1.002 0 0 0-.001-1.417L3.8 9h11.202a1 1 0 0 0 0-2H3.8z" fill="#192a32" fill-rule="evenodd"></path></svg>
            
        </div>
           
         <h1 className='headerCart__Text'>Success tufano</h1>
         <div className='headerCart__Icon'>
            <Link to='/cart' className='header__Icon'>
            <svg viewBox="0 0 21 17" xmlns="http://www.w3.org/2000/svg" class="RTLStyles__RTLSupportedSVG-kgrrgi-0 ilAChZ" style={{width: '22px', height: '18px'}}><g fill="none" fill-rule="evenodd"><g transform="translate(.56 .52)" fill="#192a32"><ellipse cx="14.753" cy="14.813" rx="1.366" ry="1.285"></ellipse><ellipse cx="6.674" cy="14.813" rx="1.366" ry="1.285"></ellipse><path d="M1.113 1.873h-.28a.832.832 0 0 1 0-1.665h2.83a1 1 0 0 1 .779.373l1.41 1.752a1 1 0 0 0 .779.373h12.106a1 1 0 0 1 .978 1.207l-1.365 6.422a1 1 0 0 1-.854.784L5.797 12.587a1 1 0 0 1-1.09-.736L2.508 3.583 2.03 2.476a1 1 0 0 0-.917-.603z"></path></g><path d="M0-2h21v21H0z"></path></g></svg>

            </Link>

            <Link to='/cart' className='header__Icon'>
            <svg viewBox="0 0 18 18" style={{width: "18px", height: "18px", color: "rgb(25, 42, 50)"}}><g fill="none" fill-rule="evenodd"><path d="M0 0h18v18H0z"></path><path fill="#192a32" d="M10.0909091 9.81818182h4.5c.2181818 0 .4090909-.19090909.4090909-.40909091v-.81818182c0-.21818182-.1909091-.40909091-.4090909-.40909091h-4.5c-.16363637 0-.27272728-.10909091-.27272728-.27272727v-4.5C9.81818182 3.19090909 9.62727273 3 9.40909091 3h-.81818182c-.21818182 0-.40909091.19090909-.40909091.40909091v4.5c0 .16363636-.10909091.27272727-.27272727.27272727h-4.5C3.19090909 8.18181818 3 8.37272727 3 8.59090909v.81818182c0 .21818182.19090909.40909091.40909091.40909091h4.5c.16363636 0 .27272727.10909091.27272727.27272728v4.5c0 .2181818.19090909.4090909.40909091.4090909h.81818182c.21818182 0 .40909091-.1909091.40909091-.4090909v-4.5c0-.16363637.10909091-.27272728.27272728-.27272728z"></path></g></svg>

            </Link>
        </div>
        
    </div>
    )
}

export default HeaderProfilePhone
