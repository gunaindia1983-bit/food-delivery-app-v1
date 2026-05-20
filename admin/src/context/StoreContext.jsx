// import axios from "axios";
// import { createContext, useEffect, useState } from "react";

// export const StoreContext = createContext(null);

// const StoreContextProvider = (props) => {
//   const [token, setToken] = useState("");
//   const [admin, setAdmin] = useState(false);


//   useEffect(() => {
//     async function loadData() {
//       if (localStorage.getItem("token")) {
//         setToken(localStorage.getItem("token"));
//       }
//       if (localStorage.getItem("admin")) {
//         setAdmin(localStorage.getItem("admin"));
//       }
//     }
//     loadData();
//   }, []);

//   const contextValue = {
//     token,
//     setToken,
//     admin,
//     setAdmin,
//   };
//   return (
//     <StoreContext.Provider value={contextValue}>
//       {props.children}
//     </StoreContext.Provider>
//   );
// };
// export default StoreContextProvider;


import { createContext, useEffect, useState } from "react";
import Navbar from "../Components/Navbar/Navbar";
import axios from "axios";


export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const url = 'https://food-delivery-backend-lou8.onrender.com';
  const [token, setToken] = useState("");
  const [data, setData] = useState([]);

  const getInitialLogin = () => {
   
    const showLogin = localStorage.getItem("token") ? false : true;
    
    return showLogin;

  }

  const [showLogin, setShowLogin] = useState(getInitialLogin);

  const fetchOrders = async (token) => {
    
    const response = await axios.get(url + '/api/order/listorders', { headers: { "token": token } });
    
    setData(response.data.data)
  }

  useEffect(() => {
 const loadData = async () => {    
    localStorage.getItem("token");
    setToken(localStorage.getItem("token"));
    fetchOrders(localStorage.getItem("token"));}
    loadData();
  }, [token])

  const contextValue = {
    url,
    token,
    setToken,
    showLogin,
    setShowLogin,
    data,
    fetchOrders
  };


  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
}

export default StoreContextProvider;
