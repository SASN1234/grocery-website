import React from 'react'
import { useSelector,useDispatch  } from 'react-redux'
import { BsFillBellFill, BsToggles2, MdSearch,MdLogout } from "../Assets/icons"
import {motion} from "framer-motion"
import { buttonClick} from '../Animations'
import Avatar from "../Assets/img/avatar.png";
import {getAuth} from 'firebase/auth'
import {useNavigate } from "react-router-dom";
import { nullUserDetails } from "../Context/Actions/userActions";
import { app } from '../config/firebase.config'

const DashboardHeader = () => {
    const firebaseAuth=getAuth(app)
    const dispatch=useDispatch()
    const navigate=useNavigate()
    const user=useSelector(state=>state.user)
    const signOut=()=>{
        firebaseAuth.signOut().then(()=>{
          dispatch(nullUserDetails())
          navigate("/login", {replace : true})
        }).catch((err)=> console.log(err))
      }
  return (
    <div className="w-full flex items-center justify-between gap-3">
        <p className="text-3xl text-headingColor">
            Welcome to SASN Mart
            {user?.name && <span className="block text-base text-yellow-400">
                {`Hello ${user?.name}....!`}
                </span>}
        </p>
        <div className="flex items-center justify-center gap-4">
          <div className="flex items-center justify-center gap-3 px-4 py-2 bg-lightOverLay backdrop-blur-md rounded-md shadow-md">
           <MdSearch className="text-yellow-400 text-2xl" />
           <input type="text" placeholder="Search Here...." className="border-none outline-none placeholder-yellow-400 bg-transparent w-32 text-base font-semibold text-textColor" />
           <BsToggles2 className="text-yellow-400 text-2xl" />
          </div>
          <motion.div {...buttonClick} className="w-10 h-10 rounded-md cursor-pointer bg-lightOverLay backdrop-blur-md shadow-md flex items-center justify-center">
            <BsFillBellFill className="text-yellow-400 text-xl">

            </BsFillBellFill>


        </motion.div>
        <div className="flex items-center justify-center gap-2">
        <motion.div whileHover={{ scale: 1.15 }} className="w-10 h-10 rounded-md shadow-md cursor-pointer overflow-hidden  ">
                <motion.img
                  className="w-full  h-full object-cover"
                  src={user?.picture ? user?.picture : Avatar}
                  
                  referrerPolicy="no-referrer"
                />
              </motion.div>
              <motion.div
                    onClick={signOut}
                    {...buttonClick}
                    className="w-10 h-10 cursor-pointer flex items-center justify-center backdrop-blur-md rounded-md shadow-md bg-lightOverLay "
                  >
                    <MdLogout className=" text-yellow-400  text-2xl" />
                    
                  </motion.div>
        </div>
        </div>
       
        </div>
  )
}

export default DashboardHeader