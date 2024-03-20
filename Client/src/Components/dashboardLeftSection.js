import React from 'react'
import { NavLink} from 'react-router-dom'
import { isActiveStyles,isNotActiveStyles } from '../utils/style'
const DashboardLeftSection = () => {
  return (
    <div className="h-full py-12 flex flex-col bg-lightOverLay backdrop-blur-md shadow-md min-w-210 w-300 gap-3">
        <NavLink to={"/"} className="flex items-center justify-start gap-4 px-6">
        <h1 className="w-12">LOGO</h1>
      </NavLink>
      <hr className=" border-[1.5px] border-[#FFD700] rounded-md w-full  " />
      <ul className="flex flex-col gap-4">
      
          <NavLink
            className={({ isActive }) =>
              isActive ? `${isActiveStyles} px-4 py-2 border-l-8 border-[#FFD700]` : isNotActiveStyles
            }
            to={"/dashboard/home"}
          >
            Home
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive ? `${isActiveStyles} px-4 py-2 border-l-8 border-[#FFD700]` : isNotActiveStyles
            }
            to={"/dashboard/orders"}
          >
            Orders
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive ? `${isActiveStyles} px-4 py-2 border-l-8 border-[#FFD700]` : isNotActiveStyles
            }
            to={"/dashboard/items"}
          >
            Items
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive ? `${isActiveStyles} px-4 py-2 border-l-8 border-[#FFD700]` : isNotActiveStyles
            }
            to={"/dashboard/addNewItem"}
          >
           Add New Item
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive ? `${isActiveStyles} px-4 py-2 border-l-8 border-[#FFD700]` : isNotActiveStyles
            }
            to={"/dashboard/users"}
          >
           Users
          </NavLink>
        </ul>
      
    </div>
  )
}

export default DashboardLeftSection