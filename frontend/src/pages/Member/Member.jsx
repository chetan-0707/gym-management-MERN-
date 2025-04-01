import React, { useEffect, useState } from 'react'
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import AddIcon from '@mui/icons-material/Add';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SearchIcon from '@mui/icons-material/Search';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import CircleIcon from '@mui/icons-material/Circle';
import { Link } from 'react-router-dom';
import MemberCard from '../../components/MemberCard/MemberCard';
import Modal from '../../components/Modal/Modal';
import AddMembership from '../../components/AddMembership/AddMembership';
import AddMembers from '../../components/AddMembers/AddMembers';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

export default function Member() {

  const [addMembership, setAddMembership] = useState(false);
  const [addMember, setAddMember] = useState(false);
  const[data,setData] = useState([]);
  const[skip,setSkip] = useState(0);
  const[search,setSearch] = useState("");
  const[isSearchModeOn,setIsSearchModeOn]= useState(false);

  const [currentPage, setCurrentPage] = useState(1);

  const [startFrom, setStartFrom] = useState(0);
  const [endTo, setEndTo] = useState(9);
  const [totalData, setTotalData] = useState(0);

  const [noPage, setNoPage] = useState(0);
  const [limit, setLimit] = useState(9);

  useEffect(() => {
    fetchData(0, 9);
  }, [])

  const fetchData = async (skip, limits) => {
    await axios.get(`http://localhost:4000/members/all-member?skip=${skip}&limit=${limits}`, { withCredentials: true }).then((response) => {
      console.log(response)
      let totalData = response.data.totalMembers;
      setTotalData(totalData);
      setData(response.data.members)

      let extraPage = totalData % limit === 0 ? 0 : 1;
      let totalPage = parseInt(totalData / limit) + extraPage;
      setNoPage(totalPage);

      if (totalData === 0) {
        setStartFrom(-1);
        setEndTo(0);
      } else if (totalData < 10) {
        setStartFrom(0);
        setEndTo(totalData);
      }
    }).catch(err=>{
      console.log(err)
      toast.error("Something Technical Issue")
    })

  }

  const handleMembership = () => {
    setAddMembership(prev => !prev);
  }

  const handleMembers = () => {
    setAddMember(prev => !prev);
  }

  const handlePrev = () => {
    if (currentPage !== 1) {
      let currPage = currentPage - 1;
      setCurrentPage(currPage);
      var from = (currPage - 1) * 9;
      var to = (currPage * 9);
      setStartFrom(from);
      setEndTo(to);

      let skipVal = skip-9;
      setSkip(skipVal);
      fetchData(skipVal,9);
      
    }
  }

  const handleNext = () => {
    if (currentPage !== noPage) {
      let currPage = currentPage + 1;
      setCurrentPage(currPage);
      var from = (currPage - 1) * 9;
      var to = (currPage * 9);

      if (to > totalData) {
        to = totalData;
      }
      setStartFrom(from);
      setEndTo(to);

      let skipVal = skip+9;
      setSkip(skipVal);
      fetchData(skipVal,9);
    }
  }

  const handleSearchData =async()=>{
     if(search!==""){
      setIsSearchModeOn(true);
      await axios.get(`http://localhost:4000/members/searched-members?searchTerm=${search}`,{withCredentials:true}).then((response)=>{
       setData(response.data.members);
       setTotalData(response.data.totalMembers);
      }).catch(err=>{
        console.log(err)
        toast.error("Something Technical Issue in search")
      })

     }else{
      if(isSearchModeOn){
        window.location.reload();
      }else{
        toast.error("Please Enter Any Value")
      }
     }
  }
  return (
    <div className='text-black p-5 w-3/4 h-[100vh]'>
      {/* block for banner */}
      <div className='border-2 bg-slate-900 flex justify-between w-full text-white rounded-lg p-3'>
        <div className='border-2 pl-3 pr-3 pt-1 pb-1 rounded-2xl cursor-pointer hover:bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:text-black' onClick={() => handleMembers()}>Add Member <FitnessCenterIcon /></div>
        <div className='border-2 pl-3 pr-3 pt-1 pb-1 rounded-2xl cursor-pointer hover:bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:text-black' onClick={() => handleMembership()}>Membership <AddIcon /></div>
      </div>

      {/* block for back to dashboard button */}
      <Link to={"/dashboard"}><ArrowBackIcon />Back To Dashboard</Link>

      <div className='mt-5 w-1/2 flex gap-2'>
        <input type="text" value={search} onChange={(e)=>{setSearch(e.target.value)}} className='border-2 w-full p-2 rounded-lg' placeholder='Search by name or mobile number' />
        <div onClick={()=>{handleSearchData()}} className='bg-slate-900 p-3 border-2 text-white rounded-lg cursor-pointer hover:bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:text-black'>
          <SearchIcon />
        </div>
      </div>

      <div className='mt-5 text-xl flex justify-between text-slate-900'>
        <div>Total Member { isSearchModeOn?totalData:null}</div>
        {
          !isSearchModeOn ?
          <div className='flex gap-5'>
          <div>{startFrom + 1}-{endTo} of {totalData} Members</div>
          <div className={`w-8 h-8 cursor-pointer border-2 flex items-center justify-center hover:text-white hover:bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 ${currentPage === 1 ? 'bg-gray-200 text-gray-400' : null}`} onClick={() => { handlePrev() }}><ChevronLeftIcon /></div>
          <div className={`w-8 h-8 cursor-pointer border-2 flex items-center justify-center hover:text-white hover:bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 ${currentPage === noPage ? 'bg-gray-200 text-gray-400' : null}`} onClick={() => { handleNext() }}><ChevronRightIcon /></div>
        </div> : null
        }
        
      </div>

      <div className='bg-slate-100 p-5 mt-5 rounded-lg grid gap-2 grid-cols-3 overflow-x-auto h-[65%]'>
        
        {
          data.map((item,index)=>{
            return(
              <MemberCard item={item}/>
            )
          })
        }

      </div>
      {
        addMembership && <Modal header="Add Membership" handleClose={handleMembership} content={<AddMembership handleClose={handleMembership} />} />
      }

      {
        addMember && <Modal header="Add New Member" handleClose={handleMembers} content={<AddMembers />} />
      }
      <ToastContainer />
    </div>

  )
}
