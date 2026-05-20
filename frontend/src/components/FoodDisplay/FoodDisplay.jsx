// import React, { useContext } from "react";
// import "./FoodDisplay.css";
// import { StoreContext } from "../../context/StoreContext";
// import FoodItem from "../FoodItem/FoodItem";

// const FoodDisplay = ({ category }) => {
  
//   const { food_list } = useContext(StoreContext);

//   return (
//     <div className="food-display" id="food-display">
//       <h2>Top dishes near you</h2>
//       <div className="food-display-list">
//         {food_list.map((item, index) => {
//           if ((category === "All" || category === item.category))
//             return (
//               <FoodItem
//                 key={index}
//                 id={item._id}
//                 name={item.name}
//                 description={item.description}
//                 price={item.price}
//                 image={item.image}
//               />
//             );
//         })}
//       </div>
//     </div>
//   );
// };

import React, { useContext } from "react";
import "./FoodDisplay.css";
import { StoreContext } from "../../context/StoreContext";
import FoodItem from "../FoodItem/FoodItem";
import axios from 'axios'
import { useEffect } from "react";
import { useState } from "react";
import Rating from '@mui/material/Rating';



const FoodDisplay = ({ category }) => {


  const { url, food_list } = useContext(StoreContext);
  const [comment, setComment] = useState([])
  const [rating, setRating] = useState('')
  const [arrLength, setArrLength] = useState('')

  // const manualReviews = [
  //   {food:'Chicken Shawarma',sentiment_score_5:'3',date:'2026-01-22',customer_name:'Alex Trevor',newComment:'Food was great but didnt like the service'},
  //   {food:'Mango IceCream',sentiment_score_5:'4.5',date:'2025-12-01',customer_name:'Mary Michelle',newComment:'Yummy ice cream i love it so much and took 3 for my friends and family'},
  //   {food:'Briyani',sentiment_score_5:'5',date:'2023-05-12',customer_name:'Thunder Client',newComment:'Brings the taste of home and joy. I devoured the enitire plate and still cravied for more.'},

  // ]

  // console.log("Food",food_list);

  const listReviews = async () => {

    const response = await axios.get(url + '/api/food/sentiment', {})
    if (response.data.success) {

      const reviews = response.data.data;
      setArrLength(reviews.length);


      // const topReviews = [...reviews]
      //   .sort((a, b) => b.date - a.date)
      //   .slice(0, 3).map((item) => item.newComment)

      const topReviews = [...reviews]
        .sort((a, b) => b.date - a.date)
        .slice(0, 3)



      setComment([...topReviews])




      //     console.log("Comment", comment)


      //const avgRating = reviews.sentiment_score_5;
      const avgRating = reviews.reduce((total, next) => total + next.sentiment_score_5, 0) / reviews.length;
      //console.log("Avg Rating",avgRating)
      setRating(avgRating.toFixed(1));
      //const isPlainObject = typeof reviews === 'object' && reviews !== null && !Array.isArray(reviews);
      //console.log(isPlainObject); // true
    }

  }

  useEffect(() => {
    listReviews();


    // return(
    //   console.log("TopReview", topReviews)
    // )

  }, [rating])

  return (
    <div className="food-display" id="food-display">



      <div className="review-comments-container">
        <div className="review-rating">
          <h1>{rating}</h1>
          {/* <h1>{4.1}</h1> */}
          <Rating name="simple-controlled"
            value={4.1}
            precision={0.5} // Allows half-stars
            readOnly
            size="medium"
            style={{ paddingBottom: "10px" }}


          />

          <p style={{ fontSize: "12px" }}>{arrLength}+ Ratings</p>
        </div>

        {comment.map((item, index) => (
          <div key={index} className="review-container">

            <h3>{item.food}</h3>
            <br />
            <Rating
              value={item.sentiment_score_5}
              precision={0.5} // Allows half-stars
              readOnly
              size="small"
              className="rating"
              style={{ alignItems: "right", gridColumn: "span 1" }}

              sx={{
                // Targets filled stars
                '& .MuiRating-iconFilled': {
                  color: "tomato",

                },

              }}
            />
            <p className="para">{item.customer_name}</p>
            <p className="para">{new Date(item.date).toLocaleDateString('en-CA')}</p>
            <p className="review-para">{item.newComment}</p>






          </div>
        ))}
      </div>

      <br />


      <h2>Top dishes near you</h2>



      <div className="food-display-list">
        {food_list.map((item, index) => {
          if ((category === "All" || category === item.category))
            return (
              <FoodItem
                key={index}
                id={item._id}
                name={item.name}
                description={item.description}
                price={item.price}
                image={item.image}
              />
            );
        })}
      </div>
    </div>
  );
};

export default FoodDisplay;







// export default FoodDisplay;
