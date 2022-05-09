import React from 'react'
import { Link } from 'react-router-dom'
import CategoryItem from '../CategoryItem'
import './TabBar.css'
function TabBar() {
    return (
        <div className='tabbar'>
        <h2 className='tabbar__items'> 
        <Link to='/' className='tabbar__itemLink'>
        Popular
        </Link>

        </h2>
        <h2 className='tabbar__items'> 
        <Link to='/' className='tabbar__itemLink'>
        <svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" style={{width: '20px', height: '20px', margin: 'auto'}}><path d="M4.12589 14.4829C4.0221 14.3922 3.92064 14.2992 3.8216 14.2039L3.78937 14.1743H3.79104C2.24782 12.6744 1.3 10.6179 1.3 8.33689C1.3 3.73255 5.18956 0 9.98758 0C14.7856 0 18.6752 3.73255 18.6752 8.33689C18.6752 10.9454 17.4355 13.2878 15.4834 14.8206L9.98717 19.857L4.12589 14.4829ZM12.3048 8.33708C12.3048 9.5649 11.2676 10.5603 9.98814 10.5603C8.70867 10.5603 7.67146 9.5649 7.67146 8.33708C7.67146 7.10926 8.70867 6.11391 9.98814 6.11391C11.2676 6.11391 12.3048 7.10926 12.3048 8.33708Z" fill="#2eaa77" fill-rule="evenodd" clip-rule="evenodd"></path></svg>
        </Link>

        </h2>
        <h2 className='tabbar__items'> 
        <Link to='/' className='tabbar__itemLink'>
        <svg viewBox="0 0 22 22" xmlns="http://www.w3.org/2000/svg" style={{width: '20px', height: '20px', margin: 'auto'}}><g fill="none" fill-rule="evenodd"><g><circle fill="#C0952B" cx="10.952" cy="10.952" r="10.952"></circle><path d="M10.917 11.067l-.004.003L2.79 6.347a9.413 9.413 0 0 1 8.15-4.722l-.023 9.442z" fill="#F9D798"></path><path d="M10.918 11.067l.022-9.441A9.344 9.344 0 0 1 15.666 2.9a9.4 9.4 0 0 1 3.424 3.43l-8.172 4.736z" fill="#F1BE40"></path><path d="M19.097 15.83l-8.179-4.757v-.006l8.172-4.735a9.493 9.493 0 0 1 .007 9.498" fill="#F7D48E"></path><path d="M10.91 11.074v-.006L2.789 6.345a9.493 9.493 0 0 0-.02 9.449l8.143-4.72z" fill="#F5C24F"></path><path d="M10.91 11.074l-8.142 4.72a9.391 9.391 0 0 0 3.453 3.48 9.352 9.352 0 0 0 4.667 1.276l.022-9.476z" fill="#F9D798"></path><path d="M19.096 15.828l-8.18-4.757-.006.003-.022 9.476a9.41 9.41 0 0 0 8.208-4.722" fill="#F1BE40"></path></g><path d="M11 13.463a2.4 2.4 0 0 0 2.4-2.4c0-.884-.8-2.025-2.4-3.423-1.6 1.398-2.4 2.539-2.4 3.423a2.4 2.4 0 0 0 2.4 2.4z" fill="#FFF"></path><path d="M-1-1h24v24H-1z"></path></g></svg>
        </Link>

        </h2>
        <h2 className='tabbar__items'> 
        <Link to='/' className='tabbar__itemLink'>
        Recent View
        </Link>

        </h2>
        {CategoryItem.map((item)=>{
            return(
                <h2 className='tabbar__items'> 
        <Link to={`/feed/` + item.name} className='tabbar__itemLink'>
        {item.name}
        </Link>

        </h2>

            )
        })}

            
        </div>
    )
}

export default TabBar
