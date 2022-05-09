import { Auth, DataStore } from "aws-amplify";
import React,{useEffect, useState} from "react";
import { Link } from "react-router-dom";
import "./CommentCard.css";
import { Comment } from "../models";









function CommentCard({ username, text, image, userSub, date,no }) {

 

  const [allComment, setAllComment] = useState([])

  useEffect(() => {
    async function fetchProduct() {
      try {
        await DataStore.query(Comment).then(setAllComment);
      } catch (error) {
        console.log(error);
      }
    }
    fetchProduct();

    console.log(allComment);
  
    
  
  
  }, [])

  function getCommentsNo(userSub) {

    let productList = allComment.filter(
      (a) => a.creatorId === userSub
    );
   
        return (
          <div className="ProductReview__commentReviewNo">

            {productList.length}
           
          </div>
        ); 
    
  
  
  
  }

  return (
    <div className="ProductReview__reviews">
      <Link to={`/profile/` + userSub} className="ProductReview__profileImage">
        <div className="ProductReview__profileImageWrapper">{image}</div>
      </Link>
      <div className="ProductReview__commentContainer">
        <div className="ProductReview__commentHeader">
          <div className="ProductReview__commentName">{username}</div>
        
          <div className="ProductReview__commentRating">
            {Array(5)
              .fill()
              .map((_, i) => (
                <svg
                  viewBox="0 0 14 13"
                  xmlns="http://www.w3.org/2000/svg"
                  data-testid="star-full-icon"
                  style={{
                    height: "16px",
                    width: "16px",
                    cursor: "auto",
                    margin: "0px 0px 0px 4px",
                  }}
                >
                  <path
                    d="M3.142 11.886c-.55.28-.91.027-.806-.567l.642-3.617L.26 5.14c-.445-.42-.307-.83.308-.917l3.754-.528L6.002.405c.275-.54.72-.54.996 0l1.679 3.29 3.754.528c.615.087.754.497.307.917l-2.716 2.562.642 3.617c.105.594-.256.847-.806.567L6.5 10.178l-3.358 1.708z"
                    fill="#2fb7ec"
                  ></path>
                </svg>
              ))}
          </div>
        </div>
        <div  className="ProductReview__commentReviewStatus">

        <div className="ProductReview__commentDate">joined {date}</div>
        <div className="ProductReview__commentReviewDot">
          .
        </div>

        {getCommentsNo(userSub)}
        reviews
        
          
        </div>
 
      
        <div className="ProductReview__commentReview">{text}</div>
        <div className="ProductReview__commentDate">about 9 months ago</div>
      </div>
    </div>
  );
}

export default CommentCard;
