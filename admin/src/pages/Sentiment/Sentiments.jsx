import React from 'react'
import { useState, useEffect } from 'react';
import './Sentiments.css'
import axios from 'axios';
import Rating from '@mui/material/Rating';

const Sentiments = () => {
  const [data, setData] = useState([]);


  const fetchData = async () => {
    const response = await axios.get("http://localhost:4000/api/food/sentiment", {});
    if (response.data.data) {

      const responseData = response.data.data
      const sorted = [...responseData].sort((a, b) => {
        return new Date(b.date) - new Date(a.date)
      })
      console.log("Sorted", sorted.slice(0, 15))
      setData(sorted.slice(0, 15))

    }

  }


  useEffect(() => {

    fetchData();

  }, [])




  return (


    <div className='container'>

      <h2 className="">Customer Sentimets</h2>
      <br />

      {data.map((item, index) => (

        <div className="reviews" key={index}>
          <h3>{item.food}</h3>
          <Rating name="simple-controlled"
            value={item.sentiment_score_5}
            precision={0.5} // Allows half-stars
            readOnly
            size="small"
            style={{ paddingBottom: "10px", color: "tomato" }}
            sx={{
              // Targets filled stars
              '& .MuiRating-iconFilled': {
                color: item.sentiment_score_5 >= 4 ? "green" : item.sentiment_score_5 <= 2 ? "red" : "orange"

              },

            }}></Rating>
          <p>{new Date(item.date).toISOString().split('T')[0]}</p>

          <h4>{item.customer_name}</h4>
          {/* <br />
          <p>{item.sentiment_label}</p> */}
          <br />
          <p style={{ gridColumn: "span 2" }}>{item.newComment}</p>

        </div>



      ))


      }
    </div>
  )
}

export default Sentiments
