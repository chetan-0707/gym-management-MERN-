import React, { useEffect, useRef, useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import SignalCellularAltIcon from '@mui/icons-material/SignalCellularAlt';
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';
import ErrorIcon from '@mui/icons-material/Error';
import ReportIcon from '@mui/icons-material/Report';
import { Link } from "react-router-dom";


function Dashboard() {
  const [accordianDashboard, setAccordianDashboard] = useState(false);
  const ref = useRef();

  useEffect(()=>{
    const checkIfClickedOutside = e=>{
      if(accordianDashboard && ref.current && !ref.current.contains(e.target)){
        setAccordianDashboard(false);
      }
    }
    document.addEventListener("mousedown",checkIfClickedOutside)
    return()=>{
      document.removeEventListener("mousedown",checkIfClickedOutside)
    }

  },[accordianDashboard]);

  const handleOnClickMenu =(value) =>{
    sessionStorage.setItem('func',value);
  }
  return (
    <div className="w-3/4 text-black p-5 relative">
      <div className="w-full bg-slate-900 text-white rounded-lg flex p-3 justify-between items-center">
        <MenuIcon sx={{cursor:"pointer"}} onClick={()=>{setAccordianDashboard(prev=>!prev)}}/>
        <img
          src="https://cdn.pixabay.com/photo/2021/07/02/04/48/user-6380868_640.png"
          alt="Image"
          className="w-8 h-8 rounded-3xl border-2 cursor-pointer"
        />
      </div>

      {accordianDashboard &&  <div ref={ref} className="absolute p-3 bg-slate-900 text-white rounded-xl text-lg font-extralight">
        <div>hi welcome to our gym management system.</div>
        <p>feel free to ask any queries</p>
      </div>}

      <div className='mt-5 pt-3 bg-slate-100 bg-opacity-50 grid gap-5 grid-cols-3 w-full pb-5 overflow-x-auto h-[80%]'>
         {/* design card */}
         <Link to={"/member"} className="w-full h-fit border-2 bg-white rounded-lg cursor-pointer">
          <div className="h-3 rounded-t-lg bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>
          <div className="py-7 px-5 flex-col justify-center items-center w-full text-center rounded-b-lg hover:bg-slate-900 hover:text-white">
            <PeopleAltIcon sx={{color:'green',fontSize:"50px"}}/>
            <p className="text-xl my-3 font-semibold font-mono">Joined Members</p>
            </div>
         </Link>

         <Link to={'/specific/monthly'} onClick={()=>handleOnClickMenu("monthlyJoined")} className="w-full h-fit border-2 bg-white rounded-lg cursor-pointer">
          <div className="h-3 rounded-t-lg bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>
          <div className="py-7 px-5 flex-col justify-center items-center w-full text-center rounded-b-lg hover:bg-slate-900 hover:text-white">
            <SignalCellularAltIcon sx={{color:'purple',fontSize:"50px"}}/>
            <p className="text-xl my-3 font-semibold font-mono">Monthly Joined</p>
            </div>
         </Link>

         <Link to={'/specific/expire-with-in-3-days'} onClick={()=>handleOnClickMenu("threeDayExpire")} className="w-full h-fit border-2 bg-white rounded-lg cursor-pointer">
          <div className="h-3 rounded-t-lg bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>
          <div className="py-7 px-5 flex-col justify-center items-center w-full text-center rounded-b-lg hover:bg-slate-900 hover:text-white">
            <AccessAlarmIcon sx={{color:'red',fontSize:"50px"}}/>
            <p className="text-xl my-3 font-semibold font-mono">Expiring within 3 days</p>
            </div>
         </Link>

         <Link to={'/specific/expire-with-in-4-7-days'} onClick={()=>handleOnClickMenu("fourToSevenDaysExpire")} className="w-full h-fit border-2 bg-white rounded-lg cursor-pointer">
          <div className="h-3 rounded-t-lg bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>
          <div className="py-7 px-5 flex-col justify-center items-center w-full text-center rounded-b-lg hover:bg-slate-900 hover:text-white">
            <AccessAlarmIcon sx={{color:'red',fontSize:"50px"}}/>
            <p className="text-xl my-3 font-semibold font-mono">Expiring within 4-7 days</p>
            </div>
         </Link>

         <Link to={'/specific/expired'} onClick={()=>handleOnClickMenu("expired")} className="w-full h-fit border-2 bg-white rounded-lg cursor-pointer">
          <div className="h-3 rounded-t-lg bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>
          <div className="py-7 px-5 flex-col justify-center items-center w-full text-center rounded-b-lg hover:bg-slate-900 hover:text-white">
            <ErrorIcon sx={{color:'red',fontSize:"50px"}}/>
            <p className="text-xl my-3 font-semibold font-mono">Expired</p>
            </div>
         </Link>

         <Link to={'/specific/inactive-members'} onClick={()=>handleOnClickMenu("inActiveMembers")} className="w-full h-fit border-2 bg-white rounded-lg cursor-pointer">
          <div className="h-3 rounded-t-lg bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>
          <div className="py-7 px-5 flex-col justify-center items-center w-full text-center rounded-b-lg hover:bg-slate-900 hover:text-white">
            <ReportIcon sx={{color:'brown',fontSize:"50px"}}/>
            <p className="text-xl my-3 font-semibold font-mono">InActive Members</p>
            </div>
         </Link>
      </div>

      <div className="md:bottom-4 p-4 w-3/4 mb-4 md:mb-0 absolute bg-black text-white mt-20 rounded-xl text-xl">
          Contact developer for any technical error at +91-9922161064
      </div>
    </div>
  );
}

export default Dashboard;
