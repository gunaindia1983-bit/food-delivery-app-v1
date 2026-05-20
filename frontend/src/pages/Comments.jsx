import React, { useContext, useEffect, useState } from 'react'
import './Comments.css'
import { StoreContext } from '../../context/StoreContext';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';



const Comments = () => {

  const { url } = useContext(StoreContext)
  const navigate= useNavigate();
  const location = useLocation();
  const orderData = location.state.items;

  const updateOrder = orderData.map(food => ({
    ...food,
    reviewComments: "",
    isHidden: false

  }))

  const [comment, setComment] = useState([...updateOrder]);

  const onChangeHandler = (id, newComment) => {

    setComment(prev =>
      prev.map((food) =>
        food._id === id ?
          { ...food, reviewComments: newComment } : food

      )
    )
  }

  




  const submitHandler =  async (event, id) => {
    event.preventDefault;


    const filterBody = comment.find(item => item._id === id)
    const body = {
         "foodId":filterBody._id,
      "food":filterBody.name,
      "newComment":filterBody.reviewComments

    }
    
    

  


    const response = await axios.post(url+"/api/food/comment",body,{});
    console.log("Message",response.data)
    if(!response.data.success){
      console.log("Error",response.data)
      alert("Error")
    }



    setComment(prev =>
      prev.map((food) =>
        food._id === id ?
          { ...food, reviewComments: "", isHidden: true } : food

      )
    )

    //Invoke the NLP Sentiment Analysis Model

    const bodyML = {
         "foodId":filterBody._id,
      "food":filterBody.name,
      "comments":filterBody.reviewComments,
      "category":filterBody.category
      
    }
    let config = {
headers: {
  "Content-Type": "application/json",
  'Access-Control-Allow-Origin': '*',
  }
}

    const responseML = await axios.post("https://sentiment-model-cl77.onrender.com/analyze",bodyML,config)

    console.log("responseML",responseML)

    if (responseML.data.data){
      console.log("ML",responseML.data.data)
    }


  

  }

const arrayCheck = comment.every(item => item.isHidden);
  

useEffect(()=>{
  
  if(arrayCheck){
    alert("Reviews submitted successfully")
    navigate("/")
  }

},[arrayCheck,navigate])
  

  

  // if(arrayCheck){
  //   console.log("Array check")
  //   navigate("/")

  // useEffect(()=>{

  //   const updateOrder = orderData.map(food =>({
  //   ...food,
  //   reviewComments:"",
  //   isHidden:false

  // }))
  //console.log("Executed")
  // localStorage.getItem("newComment")

  //setComment({...updateOrder})

  //console.log("Commen", comment)


  // },[comment])




  return (
    <div className='comments'>

      <h1 className="">Rate our dishes</h1>


      {comment.map((item, index) => {
        return (
          <div key={index} className='comments-food-item'>
            <img src={url + "/images/" + item.image} alt="" />
            <h3 >{item.name}</h3>

            <textarea key={index} value={item.reviewComments} disabled={item.isHidden} type="text" onChange={(e) => onChangeHandler(item._id, e.target.value)} placeholder='Tell us about your food!!' required></textarea>


            <br />

            {(!item.isHidden) ?

              <button type="submit" onClick={() => submitHandler(event, item._id)} >Submit Review</button> :
              <p style={{ color: 'green', fontWeight: 'bold' }}>✓ Review Submitted!</p>}

          </div>
        )



      })}

      {/* {arrayCheck && <p>All reviews are done!!!</p>} */}


    </div>
  )
}

export default Comments;
