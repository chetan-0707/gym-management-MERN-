import React, { useEffect, useState } from 'react'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Link } from 'react-router-dom';
import MemberCard from '../../components/MemberCard/MemberCard';
import { getMonthlyJoined,threeDayExpire,fourToSevenDaysExpire,expired,inActiveMembers } from './data';

export default function GeneralUser() {

    const[header, setHeader] = useState("");
    const [data,setData] = useState([]);

    useEffect (()=>{
       const func = sessionStorage.getItem('func');
       funcationCall(func)
    },[])

    const funcationCall = async (func) =>{
        switch (func){
            case "monthlyJoined":
                setHeader("Monthly joined members")
                var datas = await getMonthlyJoined();
                setData(datas.members);
                break;
            
            case "threeDayExpire":
                setHeader("Expired with in 3 days member")
                var datas = await threeDayExpire();
                setData(datas.members);
                break;

            case "fourToSevenDaysExpire":
                setHeader("Expired with in 4-7 days member")
                var datas = await fourToSevenDaysExpire();
                setData(datas.members);
                break;

            case "expired":
                setHeader("Expired member")
                var datas = await expired();
                setData(datas.members);
                break;

            case "inActiveMembers":
                setHeader("Inactive member")
                var datas = await inActiveMembers();
                setData(datas.members);
                break;
        }
    }
  return (
    <div className='text-black p-5 w-3/4 flex-col'>
         <div className='border-2 bg-slate-900 flex justify-between w-full text-white rounded-lg p-3'>
              <Link  to='/dashboard' className='border-2 pl-3 pr-3 pt-1 pb-1 rounded-2xl cursor-pointer hover:bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:text-black'>
                  <ArrowBackIcon/> Back To Dashboard
              </Link>
         </div>

         <div className='mt-5 text-xl text-slate-900'>
            {header}
         </div>

         <div className='bg-slate-100 p-5 mt-5 rounded-lg grid gap-2 grid-cols-3 overflow-x-auto h-[80%]'>
        {
            data.map((item,index)=>{
                return(
                    <MemberCard item={item}/>
                )
            })
        }
        
         </div>
    </div>
  )
}
