import React, {useState, useEffect} from 'react'
import './CategoriesSlide.css'
import CategoryItem from './CategoryItem'
import { Link } from 'react-router-dom';
import { API, Auth, graphqlOperation } from 'aws-amplify';



function CategoriesSlide() {
    const [categories, setCategories] = useState();
    

  
    
    return (
        <div className='categoriesslide'>
            {CategoryItem.map((item)=>{
                return(
                <Link  to={`/feed/` + item.name} className='categoriesslide__menu'> 
                    <img className='categoriesslide__menuImage' src={item.url} alt='' />
                    <div className='categoriesslide__menuText'>
                        {item.name}
                    </div>
                </Link>

                )
            })}
            

            
        </div>
    )
}

export default CategoriesSlide
