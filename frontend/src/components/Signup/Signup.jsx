import React, { useState } from "react";
import "./Signup.css";
import Modal from "../Modal/Modal";
import Forgotpassword from "../Forgotpasssword/Forgotpassword";
import axios from "axios";
import Stack from "@mui/material/Stack";
import LinearProgress from "@mui/material/LinearProgress";
import { toast, ToastContainer } from 'react-toastify';

function Signup() {
  const [forgotPassword, setForgotPassword] = useState(false);
  const [loaderImage, setLoaderImage] = useState(false);
  const [inputField, setInputField] = useState({
    gymName: "",
    email: "",
    userName: "",
    password: "",
    profilePic:
      "https://images.pexels.com/photos/3289711/pexels-photo-3289711.jpeg?cs=srgb&dl=pexels-cesar-galeao-1673528-3289711.jpg&fm=jpg",
  });

  const handleClose = () => {
    setForgotPassword((prev) => !prev);
  };

  const handleOnChange = (event, name) => {
    setInputField({ ...inputField, [name]: event.target.value });
  };


  const uploadImage = async (event) => {
    console.log("Image Uploading....");
    setLoaderImage(true)
    const files = event.target.files;
    const data = new FormData();
    data.append("file", files[0]);

    // dempljmdf
    data.append("upload_preset", "gym-management");

    try {
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dempljmdf/image/upload",
        data
      );
      // console.log(response);
      const imageUrl = response.data.url;
      setLoaderImage(false);
      setInputField({ ...inputField, ["profilePic"]: imageUrl });
    } catch (error) {
      console.log(error);
      setLoaderImage(false);
    }
  };

  const handleRegister = async () => {
    await axios.post('http://localhost:4000/auth/register', inputField).then((response) => {
      const successMsg = response.data.message;
      toast.success(successMsg);
    }).catch(err => {
      const errorMessage = err.response.data.error
      // console.log(err);
      toast.error(errorMessage);
    })
  }
  return (
    <div className="customSignup w-1/3 mt-20 ml-20 p-10 m-10 bg-gray-50 bg-opacity-50 h-[800px] overflow-auto">
      <div className="font sans text-white text-center text-3xl">Register</div>
      <input
        value={inputField.email}
        onChange={(event) => {
          handleOnChange(event, "email");
        }}
        type="text"
        className="w-full my-10 p-2 rounded-lg"
        placeholder="Email..."
      />
      <input
        value={inputField.gymName}
        onChange={(event) => {
          handleOnChange(event, "gymName");
        }}
        type="text"
        className="w-full mb-10 p-2 rounded-lg"
        placeholder="GYM name..."
      />
      <input
        value={inputField.userName}
        onChange={(event) => {
          handleOnChange(event, "userName");
        }}
        type="text"
        className="w-full mb-10 p-2 rounded-lg"
        placeholder="Enter username..."
      />
      <input
        value={inputField.password}
        onChange={(event) => {
          handleOnChange(event, "password");
        }}
        type="password"
        className="w-full mb-10 p-2 rounded-lg"
        placeholder="Enter password..."
      />
      <input
        type="file"
        onChange={(e) => {
          uploadImage(e);
        }}
        className="w-full mb-10 p-2 rounded-lg"
      />
      {
        loaderImage && <Stack sx={{ width: "100%", color: "grey.500" }} spacing={2}>
          <LinearProgress color="secondary" />
        </Stack>
      }
      <img
        src={inputField.profilePic}
        alt=""
        className="mb-10 h-[200px] w-[250px]"
      />
      <div className="p-2 w-[80%] border-2 bg-slate-800 mx-auto rounded-lg text-white text-center text-lg hover:bg-white hover:text-black font-semibold cursor-pointer" onClick={() => handleRegister()}>
        Register
      </div>
      <div
        className="p-2 w-[80%] mt-5 border-2 bg-slate-800 mx-auto rounded-lg text-white text-center text-lg hover:bg-white hover:text-black font-semibold cursor-pointer"
        onClick={() => handleClose()}
      >
        Forgot Password
      </div>
      {forgotPassword && (
        <Modal
          header="Forgot Password"
          handleClose={handleClose}
          content={<Forgotpassword />}
        />
      )}

      <ToastContainer />
    </div>
  );
}

export default Signup;
