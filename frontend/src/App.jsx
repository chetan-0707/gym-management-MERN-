
import { useEffect, useState } from 'react';
import './App.css'
import Siderbar from './components/Sidebar/Siderbar';
import Dashboard from './pages/Dashboard/Dashboard';
import Home  from "./pages/Home/Home";
import {Routes,Route, useNavigate} from 'react-router-dom';
import Member from './pages/Member/Member';
import GeneralUser from './pages/GeneralUser/GeneralUser';
import MemberDetails from './pages/MemberDetails/MemberDetails';
import 'react-toastify/dist/ReactToastify.css';
import Aboutus from './pages/About/Aboutus';
import ContactUs from './pages/Contact/ContactForm';

function App() {
  const navigate= useNavigate();
  const [isLogin, setIsLogin] = useState(false);

  useEffect(()=>{
     let isLogedIn = localStorage.getItem("isLogin");  
     if(isLogedIn){
      setIsLogin(true);
      navigate('/dashboard')
     }else{
      setIsLogin(false);
      navigate("/")
      
     }

  },[localStorage.getItem("isLogin")])
  return (
    <div className='flex'>
      {
        isLogin && <Siderbar/>
      }
    
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/about-us' element={<Aboutus/>}/>
        <Route path='/contact-us' element={<ContactUs/>}/>
        <Route path='/dashboard' element={<Dashboard/>}/>
        <Route path='/member' element={<Member/>}/>
        <Route path='/specific/:page' element={<GeneralUser/>}/>
        <Route path='/member/:id' element={<MemberDetails/>}/>
      </Routes>
     
    </div>
  )
}

export default App
