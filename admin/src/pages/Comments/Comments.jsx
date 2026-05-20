import React, { useEffect, useState } from 'react'
import "./Comments.css"
import axios from 'axios';

const Comments = () => {

    const [data,setData] = useState([]);


    const fetchData = async () =>{
    const response = await axios.get("http://localhost:4000/api/food/sentiment",{});
    if(response.data.data){
        setData(response.data.data)

    }
    
    }
    

    useEffect(()=>{
        
        fetchData();
        
    },[])

    


  return (
    <div className='container'>

        {/* <h3>Comments</h3>
        <br /> */}
        {/* <h3>Comments</h3>
        {data.slice(0,10).map((item,index)=>(
            <div key={index}>
                <p>{item.food}</p>
            </div>
            
        ))

        
        } */}

        <iframe
  src="https://dbc-3ec1dcac-68ba.cloud.databricks.com/embed/dashboardsv3/01f14f0128a113efb77c4cab11233552?o=7474644685843976"
  width="1200px"
  height="1000"
  frameBorder="0">
</iframe>
      
    </div>
  )
}

export default Comments;
