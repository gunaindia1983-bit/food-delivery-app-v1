// import React from 'react'
// import './Orders.css'
// import axios from 'axios';
// import { useEffect } from 'react';
// import { useState } from 'react';
// import { assets } from '../../assets/assets';

// const Orders = ({ url }) => {

//   const [data, setData] = useState([])

//   const fetchOrders = async () => {
//     const response = await axios.get(url + '/api/order/listorders');
//     setData(response.data.data)
//   }

//   const statusChange = async (event) =>{
//     //setStatus(event.target.value);

//     const body = {
//       orderId:event.target.id,
//       status:event.target.value
//     }
//     console.log("Status",body)
//     const response = await axios.post(url+'/api/order/status',body);
//     if(response.data.success){
//       await fetchOrders();
//     }
//   }

//    //console.log("Status",status);

//   useEffect(() => {
//     fetchOrders()
   
    
//   }, [])

  

//   return (
//     <div className='order-add'>
//       <h3>Order page</h3>
//       <div className='order-list'>
//         {data.map((order, index) => {
//           return (
//             <div key={index} className='order-item'>
//               <img src={assets.parcel_icon} alt="" />
//               <div>
//                 <p className="order-item-food">{order.items.map((item, index) => {
//                   if (index === order.items.length - 1) {
//                     return (item.name + ' x ' + item.quantity)
//                   }
//                   else {
//                     return (item.name + ' x ' + item.quantity + ', ')
//                   }

//                 })}
//                 </p>
//                 <p className="order-item-name">{order.address.firstName + " " + order.address.lastName}</p>
//                 <div className="order-item-address">
//                   <p >{order.address.street + ","}</p>
//                   <p>{order.address.city + ", " + order.address.state + ", " + order.address.country + ", " + order.address.zipcode + ","}</p>
//                 </div>
//                 <div className="order-item-phone">
//                   <p>{order.address.phone}</p>
//                 </div>
//               </div>
//               <p>Items : {order.items.length}</p>
//               <p>${order.amount}.00</p>
//               <div>
//                 <select value={order.status} id={order._id} onChange={statusChange}>
//                   <option value="Food Processing">Food Processing</option>
//                   <option value="Out for delivery">Out for delivery</option>
//                   <option value="Delivered">Delivered</option>
//                 </select>
//               </div>
//             </div>
//           )
//         })}
//       </div>
//     </div>
//   )
// }

// export default Orders



import React, { use, useContext } from 'react'
import './Orders.css'
import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';
import { assets } from '../../assets/assets';
import { StoreContext } from '../../context/StoreContext';

const Orders = () => {

  //const [data, setData] = useState([])
  const {token,url,data,fetchOrders} = useContext(StoreContext);




  const statusChange = async (event) =>{
    event.preventDefault();
    //setStatus(event.target.value);

    const body = {
      userId:data.userId,
      orderId:event.target.id,
      status:event.target.value
    }
       
    const response = await axios.post(url+'/api/order/status',body,{headers: {"token":token}});

    

    if(response.data.success){
      await fetchOrders(token);
      //return await data
    }
    else{
      alert(response.data.message);
    }
  }



  

  return (
    <div className='order-add'>
      <h3>Orders</h3>
      <br/>
      <div className='order-list'>
        {data?.map((order, index) => {
          return (
            <div key={index} className='order-item'>
              <img src={assets.parcel_icon} alt="" />
              <div>
                <p className="order-item-food">{order.items.map((item, index) => {
                  if (index === order.items.length - 1) {
                    return (item.name + ' x ' + item.quantity)
                  }
                  else {
                    return (item.name + ' x ' + item.quantity + ', ')
                  }

                })}
                </p>
                <p className="order-item-name">{order.address.firstName + " " + order.address.lastName}</p>
                <div className="order-item-address">
                  <p >{order.address.street + ","}</p>
                  <p>{order.address.city + ", " + order.address.state + ", " + order.address.country + ", " + order.address.zipcode + ","}</p>
                </div>
                <div className="order-item-phone">
                  <p>{order.address.phone}</p>
                </div>
              </div>
              <p>Items : {order.items.length}</p>
              <p>${order.amount}.00</p>
              <div>
                <select value={order.status} id={order._id} onChange={statusChange}>
                  <option value="Food Processing">Food Processing</option>
                  <option value="Out for delivery">Out for delivery</option>
                  <option value="Delivered">Delivered</option>
                </select>
                
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Orders;

