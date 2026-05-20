// import React, { useContext, useEffect, useState } from "react";
// import "./MyOrders.css";
// import { StoreContext } from "../../context/StoreContext";
// import axios from "axios";
// import { assets } from "../../assets/frontend_assets/assets";

// const MyOrders = () => {
//   const { url, token } = useContext(StoreContext);
//   console.log("UR",url);
//   const [data, setData] = useState([]);

//   const fetchOrders = async () => {
//     const response = await axios.post(
//       url + "/api/order/userorders",
//       {},
//       { headers: { token } }
//     );
//     if (response.data.success) {
//       setData(response.data.data);
//     }
//   };

//   useEffect(() => {
//     if (token) {
//       fetchOrders();
//     }
//   }, [token]);
//   return (
//     <div className="my-orders">
//       <h2>Orders</h2>
//       <div className="container">
//         {data.map((order, index) => {
//           return (
//             <div key={index} className="my-orders-order">
//               <img src={assets.parcel_icon} alt="" />
//               <p>
//                 {order.items.map((item, index) => {
//                   if (index === order.items.length - 1) {
//                     return item.name + " X " + item.quantity;
//                   } else {
//                     return item.name + " X " + item.quantity + ",";
//                   }
//                 })}
//               </p>
//               <p>${order.amount}.00</p>
//               <p>items: {order.items.length}</p>
//               <p>
//                 <span>&#x25cf;</span>
//                 <b> {order.status}</b>
//               </p>
//               <button onClick={fetchOrders}>Track Order</button>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// };

// export default MyOrders;

import React, { useContext, useEffect, useState } from "react";
import "./MyOrders.css";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";
import { assets } from "../../assets/frontend_assets/assets";
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';


const MyOrders = () => {
  const { url, token } = useContext(StoreContext);
  const [data, setData] = useState([]);
  const [comment, setShowComment] = useState(false);

  const navigate = useNavigate();

  const currentDate = new Date(); 


  //const formattedStartTime = index.startTime.toL  ocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });

  const fetchOrders = async () => {
    console.log("Fetch Orders Event"); 
    const response = await axios.post(
      url + "/api/order/userorders",
      {},
      { headers: { token } }
    );
    if (response.data.success) {
      setData(response.data.data);
    }
    response.data.data.map((order)=>{
     
        if(order.status === 'Delivered'){
        setShowComment(true);
       
        }
      })
  };


  const fetchOrderStatus = async(event)=>{
    const response = await axios.post(
      url + "/api/order/userorders",
       {body:{_id:event}},
      {},
      { headers: { token } }
    );
    return response;
  }



  const handleClick = async (event) => {
    const response = await fetchOrderStatus(event);

    
    if (response.data.success) {
      setData(response.data.data);
      toast.success("Order updated for",response.data.data.name);
      
  };



  //   const handleClick = async (event) => {
  //   console.log("Fetch Orders Event", event); 
  //   const response = await axios.post(
  //     url + "/api/order/userorders",
  //      {body:{_id:event}},
  //     {},
  //     { headers: { token } }
  //   );
  //   if (response.data.success) {
  //     setData(response.data.data);
  //     toast.success("Order updated for",response.data.data.name);
      
  // };

 
  }


   const handleComment = async (event)=>{
    console.log("handle Comment Event", event);
    const body = {_id:event};
    const response = await axios.post(url + "/api/order/listselectedorder",body);

    navigate("/comments",{state:response.data.data});
       
    }

  

  useEffect(() => {
    if (token) {
      fetchOrders();
      
    }
    
  }, [token]);


  return (
    <div className="my-orders">
      <h2>Past Orders</h2>

      <div className="container">


        {[...data]
        .sort((a,b)=> new Date(b.date) - new Date(a.date))
        
        
        .map((order, index) => {
          return (
            <div key={index} className="my-orders-order">
              <img src={assets.parcel_icon} alt="" />
              <div key={index}>
                <p key={index} className='my-orders-order-p' >Order date: { (order.date).substring(0,10)}</p>
                <br />
                
                
                {order.items.map((item, index) => {
                  
                   
                    
                  
                  
                  if (index === order.items.length - 1) {
                    return <p key={index}><span className='boxed-number' key={index}>{item.quantity}</span>{" "+ item.name }</p>
                  } else {
                    return <p key={index}><span className='boxed-number' key={index}>{item.quantity}</span>{" "+ item.name }</p>
                    
                  } 
                })}

              </div>
              <p>${order.amount}.00</p>
              <p>items: {order.items.length}</p>
              <p>
                <span>&#x25cf;</span>
                <b> {order.status}</b>
              </p>
              <div className="my-orders-order-buttons">
                <button onClick={()=>handleClick(order._id)}>Track Order</button>
      
            {!comment?<></>:
            <button onClick={()=>handleComment(order._id)}>Comment</button>}
              </div>
              
           
            </div>
          );
        })}
      </div>
     
    </div>
  );
};

export default MyOrders;

