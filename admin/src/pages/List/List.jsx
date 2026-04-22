import React, { useEffect, useState } from 'react'
import './List.css'
import axios from 'axios'
import {toast} from 'react-toastify'

const List = ({url}) => {

  const [list, setList] = useState([]);

  

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
    <div className='list and flex-col'>
     <p>All foods list</p>
     <div className="list-table">
      <div className="list-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
      </div>
      {list.map((item,index)=>{
        return(
          <div key={index} className="list-table-format">
            <img src={`${url}/images/`+item.image} alt=""/>

            <p className="">{item.name}</p>
            <p className="">{item.category}</p>
            <p className="">${item.price}</p>
            <p onClick={()=> removeFood(item._id)} className="cursor">X</p>
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
