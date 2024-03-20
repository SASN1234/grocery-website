import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllOrders, getAllProducts, getAllUserProfile } from '../api'
import { setAllProducts } from '../Context/Actions/productActions'
import {  setAllUserDetails } from '../Context/Actions/userDetailsActions'
import { getAllUserDetails } from '../api'
import { setAllUserProfile } from '../Context/Actions/allProfileActions'
import { setAllOrders } from '../Context/Actions/ordersActions'
import { HiCurrencyRupee } from 'react-icons/hi2'
import { statuses } from '../utils/style'

const DashboardHome = () => {
  const allUserDetails=useSelector((state)=> state.userDetails)
  const products=useSelector((state) => state.product)
  const allUserProfile=useSelector((state)=> state.allUserProfiles)
  const dispatch=useDispatch()
  useEffect(()=>{
    if(!products){
      getAllProducts().then((data)=>{
        console.log(data)
        dispatch(setAllProducts(data))
      })
    }
  },[])
 
  useEffect(()=>{
    if(!allUserProfile){
     getAllUserProfile().then((data)=>{
     dispatch(setAllUserProfile(data))
     })
    }
  },[])
  const order = useSelector((state) => state.order);
  const [preparingOrder, setPreparingOrder] = useState([]);
  const [dispatchedOrder, setDispatchedOrder] = useState([]);
  const [deliveredOrder, setDeliveredOrder] = useState([]);
  
  useEffect(() => {
    if (!order) {
      getAllOrders()
        .then((data) => {
          console.log("card", data);
          dispatch(setAllOrders(data));
        })
        .catch((error) => {
          console.error("Error fetching orders:", error);
        });
    } else {
      const preOr = [];
      const disOr = [];
      const delOr = [];
      
      order.forEach((data) => {
        switch (data.sts.toLowerCase()) {
          case "preparing":
            preOr.push(data);
            break;
          case "shipping":
            disOr.push(data);
            break;
          case "delivered":
            delOr.push(data);
            break;
          default:
            break;
        }
      });
  
      setPreparingOrder(preOr);
      setDispatchedOrder(disOr);
      setDeliveredOrder(delOr);
  
      console.log("Preparing Order: ", preOr);
      console.log("Dispatched Order: ", disOr);
      console.log("Delivered Order: ", delOr);
    }
  }, [order]);
  
  // useEffect(() => {
  //   setInterval(() => {
  //     const date = new Date();
      
  //     const day = date.getDate();
  //     const month = date.getMonth() + 1; // Note: getMonth() returns 0-based month
  //     const year = date.getFullYear();
  //     const hours = date.getHours();
  //     const minutes = date.getMinutes();
  //     const seconds = date.getSeconds();
  
  //     console.log(`Date: ${day}/${month}/${year}`);
  //     console.log(`Time: ${hours}:${minutes}:${seconds}`);
      
  //   }, 1000);
  
    
  // }, []);
  const [total, setTotal] = useState(0)
  const [quantity,setQuantity]=useState(0)
  const [totalProduct,setTotalProduct]=useState(0)
  const [todaySales,setTodaySales]=useState(0)
  const [todayProductSales,setTodayProductSales]=useState(0)
  useEffect(() => {
    let tot=0
    let quan=0
    let totProc=0
    let ts=0
    let tps=0
    let currentDate=new Date()
    let todayDate=currentDate.getDate();
    if (order) {
      order?.map(data => {
        tot += parseFloat(data?.total);
        data?.items.map(item => {
          totProc += parseFloat(item?.Quantity);
          data?.Day===todayDate &&  (tps+= parseFloat(item?.Quantity));
        });
        data?.Day===todayDate &&    (ts += parseFloat(data?.total));
        
      });
    }
    (console.log("Total Product : " ,totProc))
    setTotal(tot)
    setTotalProduct(totProc)
    setTodaySales(ts)
    setTodayProductSales(tps)
  console.log(tot)
  console.log(ts)
  console.log("Today product sales " ,tps)
  console.log("Today Date ", todayDate)
  
  }, [order])
  return (
    <>
    <div className=" flex items-center justify-center flex-col pt-6 w-full h-full ">
    <div className="flex items-center justify-center flex-wrap  gap-10 pt-6 overflow-auto scrollbar-none " >  
     <Card title={"Total Users"} icon={false} content={allUserProfile?.length-1}></Card>
     <Card title={"Total Product"} icon={false} content={products?.length}></Card>
     <Card title={"Total Category"} icon={false} content={statuses?.length}></Card>
     <Card title={"Total Orders"} icon={false} content={order?.length}></Card>
     <Card title={"Total Sales"} icon={true} content={total} ></Card>
     <Card title={"Total Product Sales"} icon={false} content={totalProduct} ></Card>
     <Card title={"Today Sales"} icon={true} content={todaySales} ></Card>
     <Card title={"Today Product sales"} icon={false} content={todayProductSales} ></Card>
     <Card title={"Total Prepare Orders"} icon={false} content={preparingOrder.length} ></Card>
     <Card title={"Total Dispatch Orders"} icon={false} content={dispatchedOrder.length} ></Card>
     <Card title={"Total Deliver Orders"} icon={false} content={deliveredOrder.length} ></Card>

    </div>
    
     {/* {order?order?.map((order,i)=>(
      order?.Day===16 && order?.email
     )):"NULL"}
     {total}
     {quantity} */}
    </div>
    </>
  )
}

const Card=({title,content,icon})=>{
  return(
    <>
     <div className=" h-auto w-275 cursor-pointer    bg-lightOverLay hover:drop-shadow-lg backdrop-blur-md flex-col rounded-xl flex items-center justify-center px-4 py-2   gap-3 border-[2.5px]" >
   <p className=" text-2xl text-yellow-400 font-semibold  " >
   {title}
   </p>
  { icon===true ? 
   <p className="text-lg font-semibold text-yellow-500 flex items-center justify-center gap-1">
   <HiCurrencyRupee className="text-yellow-500 text-4xl" />{" "}
   
   <p className=" text-2xl text-zinc-500 font-semibold" >
   {parseFloat(content).toFixed(2)}
   </p>
 </p>:
  <p className=" text-2xl text-zinc-500 font-semibold" >
   {content} 
   </p>}
  </div>
    </>
  )
}
 



export default DashboardHome