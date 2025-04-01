import React, { useState } from 'react'
import Loader from '../Loader/Loader';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

function Forgotpassword() {
    const [emailSubmit, setEmailSubmit] = useState(false);
    const[otpValidate, setOtpValidate] = useState(false);
    const[loader,setLoader]=useState(false);
    const[contentvalue, setContentValue]=useState("Submit Your email");
    const [inputField , setInputField] = useState({ email:"", otp:"" , newPassword: "" });

    const handleSubmit = () =>{
        if(!emailSubmit){
            sendOtp();
        }
        else if (emailSubmit && !otpValidate){
            verifyOtp();
            // setOtpValidate(true);
            // setContentValue("Submit Your New Password")
        }else{
            changePassword();
        }
    }


    const sendOtp = async()=>{
        setLoader(true);
       await axios.post('http://localhost:4000/auth/reset-password/sendOtp',{email:inputField.email}).then((response)=>{
        setEmailSubmit(true);
        setContentValue("Submit Your OTP")
        toast.success(response.data.message)
        setLoader(false);
       }).catch(err=>{
        toast.error("Some technical issue while sending mail")
        console.log(err);
        setLoader(false);
       })
    }

    const verifyOtp = async()=>{
        setLoader(true);
        await axios.post('http://localhost:4000/auth/reset-password/checkOtp',{email:inputField.email,otp:inputField.otp}).then((response)=>{
            setOtpValidate(true);
            setContentValue("Submit Your New Password")
            toast.success(response.data.message);
            setLoader(false);
        }).catch(err=>{
            toast.error("Some technical issue while sending mail")
            console.log(err);
            setLoader(false);
           })
    }
    const changePassword =async()=>{
     await axios.post('http://localhost:4000/auth/reset-password',{email:inputField.email,newPassword:inputField.newPassword}).then((response)=>{
        toast.success(response.data.message);
     }).catch(err=>{
        toast.error("Some technical issue while sending mail")
        console.log(err);
        setLoader(false);
       })
    }

    const handleOnChange = (event, name) =>{
        setInputField({...inputField,[name]:event.target.value})
      }
     console.log(inputField);
  return (
    <div className='w-full'>
        <div className='w-full mb-5'>
            <div>Enter your email</div>
        <input value={inputField.email}  onChange={(event)=> {handleOnChange(event,"email")}} type="text" className="w-1/2  p-2 rounded-lg border-2 border-slate-400" placeholder="Email..." />
        </div>


       { emailSubmit && <div className='w-full mb-5'>
            <div>Enter your OTP</div>
        <input value={inputField.otp} onChange={(event)=> {handleOnChange(event,"otp")}} type="text" className="w-1/2  p-2 rounded-lg border-2 border-slate-400" placeholder="Enter OTP" />
        </div>}

        { otpValidate && <div className='w-full mb-5'>
            <div>Enter your new password</div>
        <input value={inputField.newPassword} onChange={(event)=> {handleOnChange(event,"newPassword")}} type="password" className="w-1/2  p-2 rounded-lg border-2 border-slate-400" placeholder="Enter your new password" />
        </div>}
        

        <div className='bg-slate-800 text-white mx-auto w-2/3 p-3 rounded-lg text-center font-semibold cursor-pointer hover:bg-white hover:text-black border-2' onClick={()=> handleSubmit()}>{contentvalue}</div>
       {loader && <Loader/> }
       <ToastContainer />
    </div>
  )
}

export default Forgotpassword