import React from 'react'
import { DashboardHeader, DashboardHome ,DashboardItems,DashboardAddNewItem,DashboardOrders,DashboardUsers} from "../Components"
import { Routes,Route } from 'react-router-dom'
const DashboardRightSection = () => {
  return (
    <div className="flex flex-col py-12 px-12 flex-1 h-full ">
      <DashboardHeader/>
      <div className="flex flex-col flex-1 overflow-y-scroll scrollbar-none ">
        <Routes>
          <Route path="/home" element={<DashboardHome/>}/>
          <Route path="/orders" element={<DashboardOrders/>}/>
          <Route path="/items" element={<DashboardItems/>}/>
          <Route path="/addNewItem" element={<DashboardAddNewItem/>}/>
          <Route path="/users" element={<DashboardUsers/>}/>
           
  
        </Routes>
      </div>
      </div>
  )
}

export default DashboardRightSection