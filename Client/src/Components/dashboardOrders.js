import React, { useEffect } from 'react'
import { getAllOrders } from '../api'
import {useSelector,useDispatch} from "react-redux"
import { setAllOrders } from '../Context/Actions/ordersActions'
import {MainLoader, OrderData} from '../Components'
const DashboardOrders = () => {
  const order= useSelector((state)=>state.order)
  const dispatch=useDispatch()
  useEffect(()=>{

    if(!order){
      getAllOrders().then((data)=>{
        console.log("card",data)
        dispatch(setAllOrders(data))
      })
    }
  },[])
  return (
    <div className="flex items-center justify-center flex-col pt-6 w-full gap-4" >
      {
        order?<>{order.map((item,i)=>(
         <OrderData key={i} data={item} index={i} admin={true} />
        ))}</>:<><MainLoader/></>
      }
    </div>
  )
}


export default DashboardOrders