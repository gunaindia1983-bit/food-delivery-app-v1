import React, { useEffect, useState } from 'react'
import './List.css'
import axios from 'axios'
import {toast} from 'react-toastify'

const List = ({url}) => {

  const [list, setList] = useState([]);

  console.log("URL in List.jsx", url);
  

  const fetchList = async () =>{
    const response = await axios.get(`${url}/api/food/list`);
    console.log("Success",response.data);
    if(response.data.success){
     
      setList(response.data.data);
    }
    else{

      toast.error("Error");
      
      
      
    }
  } 

  useEffect(()=>{
    fetchList();  

    list.map((item,index)=>{
      console.log("Value",item);
    })
    
  }, []);

const removeFood = async(foodId) => {
  const response = await axios.post(`${url}/api/food/remove`,{id:foodId});
  await fetchList();
  if(response.data.success){
    toast(response.data.message);
  }
  else{
    toast.error("Error")
  }
}
  



  return (
    <div className='list-and-flex-col'>
     <h3>All foods list</h3>
     <div className="list-table">
      <div className="list-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Remove</b>
      </div>
      {list.map((item,index)=>{
        return(
          <div key={index} className="list-table-format">
            <img src={`${url}/images/`+item.image} alt=""/>

            <p >{item.name}</p>
            <p >{item.category}</p>
            <p >${item.price}</p>
            <button onClick={()=> removeFood(item._id)} className="cursor">X</button>
          </div>
        )

      })}
     
     </div>
     <div className="">
      
     </div>
    </div>
  )
}

export default List
