import axios from "axios";
import React, { useEffect, useState } from "react";
import Stack from "@mui/material/Stack";
import LinearProgress from "@mui/material/LinearProgress";
import { ToastContainer, toast } from 'react-toastify';

function AddMembers() {
  const [loaderImage, setLoaderImage] = useState(false);
  const [membershipList, setMembershipList] = useState([]);
  const [ selectedOption, setSelectedOption] = useState("");
  const [inputField, setInputField] = useState({
    name: "",
    mobileNo: "",
    address: "",
    membership: "",
    profilePic:
      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAeFBMVEX///8AAAD+/v4EBAT7+/v29vbt7e309PReXl65ubnx8fFbW1vf398uLi7U1NStra0nJycSEhKGhoafn580NDR+fn7l5eUXFxeQkJBLS0vKysplZWXAwMAgICCnp6czMzOVlZVzc3NAQEA8PDxTU1N2dnaAgIDOzs5RJ0+5AAAQP0lEQVR4nO1diWLiOAx1jBMSCAHCDYGWo+3//+FaknNAC/WRBDqbNzvtdkpsv1iWZVmWGevQoUOHDh06dOjQoUOHDh06dOjwfwDnVz/Jn+Xf+x/40wBu8EV9e3ZzGgGxy7/9Q+AEUaUlf+L836B6QwKI8ge//wtAVYLqJG98EG+j2WJ3nnglJufdYhZt46B8pnjy1cFz8ZNNFf34kIanKrVrTE5heoj7QmnZvyG3KIbQzn42261uGPUqX0usdrOsj/PGzWh9TXAmBPPjw3BSkurlpHq9/Evxr+qHyfAQ+/Do6zOUCA7D6VXH3Xbaz7+ZDg/Bs5v+AELgBMDYMjqVDEoCk024W6Trd8A6XezCzeSnj52iJQ5lWdqLyatsEDRJxOkolzzV7NVomEZJvAx8Ufm88INlnETp8G1VGaHwZZTGgiFDcbe2pwDeOM/C6z7p7d6zGH9d2DK81CfUR3H2vis+T/8TZviZ55H5CbLJg2heahbP21/WCXabskThIzlH+QVVipochJ+sL/vKs948G7BXo8iijVeRt804xm7CrqUOU9M5LyZ4RhMEow6Nx5uKbHub6Ll0FAq5Y9FbRTrDWZ/ZaP3+LKxI61tUGEjP1DnUA/GOmgUtm3wkava2KKiffEyKkrxdzJQ4Pw2g1gUL0lI6z7OgYtYYlaUUUDA7l9KaBjANPbEPQeFxVDAkoJvIV6JrPJnx3DRlzMch3cMi5xGU9USG8pUvSKpg5ov6xJnT6s+wLGV3A59+tCKLRxa7CKzGtDuEbIpU51FhfM3HdbaDj+eFURcxrKttmjA82CBFaZLtmK7liKmzeBasp3nh6YDhgG8ZkmBcvOcwBs41lg6FxWEhH/ETXHJSbMZTpQ5GESqJWhniTBiNlMqZRua6yx3vub4LA+VXqrFw5bsKwlyrrtsch2h39Yeq6mnWmHMFys2mqp5hX9l8LQBn+bOaAy8JqNWGaoKSk4uabs84+zdU0029stqRMpDX0Igm+1CWv1YKZ5TUq83uQ7DtniRnH9G82BhDmAcFi/YkqfttY9Jyg20+NmKcp0SDDKnwOB/z20bqua0T7BicpYbt+Y2CoaozYo29TwKMjK2qbNemYyzYqVq3DbvFgeAUKup5H22a/FJ2Pqja6bZZ80aIZE/Ke+2LFh0psi5/TdPTPmlUofJgRMJyZOZrXJd6wWVwVJNG0FC9OCf0z7T8To1aRwtGcfOvQhQ7OJqglYx3HqA/1aAJekDTekjmxdHXbhbHCRNsEb8fR7P0c/GZzqK479M7EwYWNfeP5N0YNqNQ4bWtSU52BtYTJ2exn73n3kblvn/PkKSBqSlf1I4W/utGjAxZ5Jh6cBgYrJSwm5JFvhHVU74JwGSRCGawnSZZBUqIxk3Yb9KyWJFlMWAGoiVbst2Vvjjl1+4plrutQVPhtQ5oKK7imu03dMgP0Gnv7WPtx9C5klxL5y02iapAE/EeH5sPaGugLqDOS6kH9b3tUgB9nq6+7/mWgO5IYYTrj6qIejGt1ReOZY2ppWv99yYfSk6FL/UeQ+xGg6aqxZQcijVShDkrUFrGoFRpo08fE1S/XEUGCpVzpW0CZrpz8KhUJhZY6jQ2UdNjpVoe9KHiPzZoi4hx8eYtRH1WlSxIeX4zzZ1L3IJIH/TdLdZMc4qDT2W5p7hGKR28YTtCXWuU+9CDj3rvpiehF7UMJTTzaBPubVCjlKIxAzav5pvmrFgna3IEHa3HECb+ET6yrk+ZJnkjdBlKMwbdxQ+1TEEPPzdNtLQ0tSAixZ640aqUiuagF3Kh7XXiJ68aHPQLQ/y20WsLBaKEZCDX0Ido/kfYhZqWkkAts9AUzyoWXNepJdCC9NBt47ybAAWcaa7XVV0w008fWTJ3OnKacE3nsqyB5v2z+/YpaC7qwvNAb82E7rjTb4S+M/RAToXeJC6rGJxVJ3JHG1y2d4B7zmAl6SlnWWFmTJA4ZppiAi0Z00sZuJpuUghwsvdWuu9X9rSvQjOM+KHm8HUnIynPFC4Wua4wJK25KkkT5FG1xJeBmUJvfu6qaQRInHy/m77uExydYpY4GqwU+xuUk8x1HIohiJDBqlCwwd6a4WRg0LaI3FKuO25kzrwZONeU+NjBZB3lv9Vi2KTIcGZQMU5VtkhNKpohQxPf7W0JchAvwccthUdfErh/dmB40hcWxgcQA+eNlhbxSVQARQSBFv8wUckDB4LoyNOEHH8f2DrrdSK+GHKUJSZO9MSJof6okm2iqja2eyi4EMMiQt9ECsamJmmJnpk/g/u0FF5aWm5A6uCRnjGxbx0UjWT4btA+oXTNgdmFoYC7c4gV9432XW0WTiU+DRhy1sdnhr7dURuBfnwP5dxEzD+cGH7oV1ToCblytTLd5PMHrHQMUq5fwtGJ4VG7HmwUOSwP1l43FNJ9wox8r231IbYJN929oQ05KMLHPbGL4bHANsch5xAT5k0M7IQrwEK2560Nn3Ix2kx0aV4baNPM8CkC2H2AL8PnDqaL3yvoz4eEL3zKwG6ugAvc2ZyaSsCX9YQPMFwpcB/PAe7sllA+zhU73/CxwMmmMQ20Qo+JtzJtJGGJq/uZ4VPcHzl04tlYZ8xwUCxNW4lfaa7JTI/38NSBocH6ULWU/HrjSrv1ngPg7tgqNpZwtzW+ITjZXWml3dqPMtgb8N5MtZTggb2fZm98akOwNxi/obky5SxAx3VoahDJT++sGR5NGyobh4bXKTCmKM3uCXW/KUNu5/JGGIdWcrXVPIktZkTy65q7CLjoXzzNrcMK4IGL0VIbK8tdezbx0dQTicVbpb0cC69+xCxqI1eGjd1GNtvSfBwKwUYGO9yKofwzN485lB9f4vOm0zYA1wgT06mUHFiZuV0jKW6tzhYtUV8sTB+TQC8P6CjTtwouLGN1KqX0yK36kHT+zugxAOz8SoR9q+Uz78897UgFVDJSRm1sS/DVYFecDSdSWD/jvL3T3DX8VsBWn2GPQgK3VvXkS6C9YQwYfNYj8bbyRIrcEanbhegStKyKnArM0GjjimFqGR7nw/lETWWD5yjeGdPeorxqZx5dZm6VMgo7sosEwLF7NJgTP5hRkGkBQXtdsh4zfYE621Ov1n4D8t0rTrLf7z98CzazmWpqLizMyF2GpzWxBe8OBDk/9IoMEHcI0gcODhvVHF+k53Ejewg+KtQ2gn2YKsz85an6e13oeXOHo0ycGMpShDFD9z6ELEGD469R0Ec55fr2nWjbh3WMQzrzk43u8gOMttwpNs1yHDrr0quCxhclkdfyCbiMXTQZu9KlNrOFZz8flgXJF+tn4YpksudVvq/CzHc9L2k9H7raNJWSKGnXcry4zi04WYyXOFRdYwstbRpnu7QsiQ5ky1L8YDtLj8fd8ZjOtoFPGaJc0+tY26Wua4tKE4pjhtfFcJUK0jGJgPXaAoCvxnx92C4c1ofWa/zWYb/Gt/TTtAsnP42lr61dOPnabP2lrcLBX1rxeb9a/sIqHHzeuY4avnwfFj5B42fzvadX7kJoptXe0/X+4Sv3oe3+ocsecLuw3QMmLHFVYhfIQfVRTgiVupRfNaH8B6cs3hgSY7GPT8hjMWx83vSlmnyUC7/v+/5gMPABhTlayVNu5bZ0iMVQRnvPLpCDFd3E/GUWyVXFZTPKc2CvRqfLMT1E2RLVmMPJeqd4GtuYqAJyzRTEUboZ3WZmL7EabdIodknH4hITZRvXViCZHath+/f9UefjzPrQRB7XZsXQODZRZaJBczg63iX0M46Qq1wtmHVrc45NVPGlsW58Ka7YpWz6X8e5IT/qyi8fd5D1/PvYptglvtQ8Rphy5C1nRM90lxswPywZ13yf7jHCFnHeUsCWx32eocWMYY9o7o9L3XSz7nHeFKuPCWl03+ryM89CYxptUm6n9j6XemNC/hlg+2xj9eGZ/LzFo07khVWyNMkT8QjpMvdUPeAKvy3OW9gZRVJayEMw9B+WQM5CIcaP/fe6wLTnYzz6/3D0l2dmAsurTfAFapx7ws8JFl8sZPMORVnIJWY/+CCrkIq7OPdka9iii0CdXXvUh8BwpkIq3Bn2KDTDm4lfhr/Agw89yoZt14d65w9hCuwPPYPoEh2KHg6Ohy2vnj90WOJRdqg7dh/nlLQ5m/7WaitQiuJ7oop6BjNGuYFE/d45YPLLj+vouZ/QGz/IMl3XOWBBacN/jk4mK3JtH5z/K9YPNm/oLHfo6EcSaoHx83l8EH9KoNAIPRiOO//elAHn8T338/jyBVICpR87EXY/jya5hIw5QhbKO+OQPMFvzjkV8rwYU3YtLTgA5Vi4NMStBAQOi++VM9JuznkxrnKb3FQChuuxcYLQi+LmPDoQrCu3SZ6fRi5sguscjph99LN5fpJHKm4uPZF9GuQJSVzz07B7OYZQUNbGiyQLhhi3JG4qry/HUCVP1PQqTxTsTn81qWSu8MWubvCQVvC0tjxRgDzXl+DlbSiQXL8ZS+YnTIuU+oL8OPXl+iJU8rXl6xQ5QIetEYSMlOrNXudrq4thmXOvDAIVKpysLbyrIVLk3PPqzLl3nTdRiX3cKkG4pUAxlFQbyJv4Pfel+XkDR6gxp3JfqkxmNTJU+Ut7CVPZx8ctE0SnJvlukl79+UtZkYP2gppM/pdfV9ge9vRuubg0kYOWF3mEYb0p56aDV4vHQhfo1ziQIqe8TvXmEWbVXNDjMtKqZUA0gqC06XXngr7K5w0OZpuTW66g+ZgltFVXdz5vQJmTPeAWmR/rwInxpnKyA4TI8+pfgrjtDiT0kkBpmWby6sthru5GCN2Se1gT9NZkjjZ2N4JQ91u0tJ74gSFNhE3db4Em6QC2rZ9JESpu6o4SRH7PzPM6scF7ZhB4V9CzKFK9Td8VpO57el4fNn3fU35nV4sGW4UgnqV1PYPyK8NyWnwCQ5oIWwiW3OK1FS1b3oAW7s5DFPcftsgQSbZ2/yHdYdmquum1e4cl3kN6apUi1HVq7x5SjHodhC1PGcMBnmxthaHCezuzRu8J9wEjON4E1ArFZ93pzPN7uRtn+KR7ucu71Zsn+Jy71TndWe+Sm00XGBGkG7BYO00WLMjiqClaKAcVB38XQcsa9JohdmMeMFsrwzykNuLum6BODHH2Rx9t7QzR/4yz/FPPJdEGe7yrfbmBsTSxCu18Ij+ex/FHNqHrjzGP1DB4bh+WiPK7Kt36Mn96Y5wFs2GAHw770XE8qvE3jwYvd3YVhiPPaHPWekiqB8OMs5cjSDfZMxGnI89eUOG5URqLvLiXgsjDJJfR48tjH2MDZ4MoqPPF+rAE2DmHYTXUpvezT6d363edDg9PtV90gSeX/PgwzK9xpr+3Cog2IbxCoifDQ+zjoadnE/gVuC0E4trPZrv7Jw+rWO1mWV+lO3m10fcDeOXYq5B9mYanyV1uk1OYHuK+uH3wpZGbOeWhxSDeRrPP8FxNEb0/h5+zaBsH5TPFk38N103+dpHpX6T0DUr6bmJg/4pMGiE/g//PEVNAXqrf/iWON6OOfTtT+A9x7dChQ4cOHTp06NChQ4cOHTp06PAI/wE4CKgdgsrBxwAAAABJRU5ErkJggg==",
    joiningDate: "",
  });

  const handleOnChange = (event, name) => {
    setInputField({ ...inputField, [name]: event.target.value });
  };
  console.log(inputField);

  const uploadImage = async (event) => {
    setLoaderImage(true);
    console.log("Image Uploading....");
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
      console.log(response);
      const imageUrl = response.data.url;
      setInputField({ ...inputField, ["profilePic"]: imageUrl });
      setLoaderImage(false);
    } catch (error) {
      console.log(error);
      setLoaderImage(false);
    }
  };

  const fetchMembership = async()=>{
    await axios.get('http://localhost:4000/plans/get-membership',{withCredentials:true}).then((response)=>{
     setMembershipList(response.data.membership)
     if(response.data.membership.length===0){
      return toast.error("No Any Membership Added Yet",{
        className:"text-lg"
      })
     }else{
      let a = response.data.membership[0]._id;
      setSelectedOption(a)
      setInputField({...inputField,membership:a})
     }
     
    }).catch(err=>{
     console.log(err);
    })
   }

   useEffect(()=>{
     fetchMembership()
   },[])

   const handleOnChangeSelect =(event)=>{
   let value= event.target.value;
   setSelectedOption(value)
   setInputField({...inputField,membership:value})
   }

   const handleRegisterButton = async()=>{
     await axios.post('http://localhost:4000/members/register-member',inputField,{withCredentials:true}).then((response)=>{
      toast.success("Added Successfully");
      setTimeout(()=>{
        window.location.reload()
      },2000);
     }).catch(err=>{
      console.log(err);
      toast.error("Something Wrong Happedned");
     })
   }
   

  return (
    <div className="text-black">
      <div className="grid gap-5 grid-cols-2 text-lg">
        <input
          value={inputField.name}
          onChange={(event) => {
            handleOnChange(event, "name");
          }}
          type="text"
          placeholder="Name of the joinee"
          className="border-2 w-[90%] pl-3 pr-3 pt-2 pb-2  border-slate-400 rounded-md h-12"
        />
        <input
          value={inputField.mobileNo}
          onChange={(event) => {
            handleOnChange(event, "mobileNo");
          }}
          type="text"
          placeholder="Mobile no"
          className="border-2 w-[90%] pl-3 pr-3 pt-2 pb-2  border-slate-400 rounded-md h-12"
        />
        <input
          value={inputField.address}
          onChange={(event) => {
            handleOnChange(event, "address");
          }}
          type="text"
          placeholder="Enter the address"
          className="border-2 w-[90%] pl-3 pr-3 pt-2 pb-2  border-slate-400 rounded-md h-12"
        />
        <input
          value={inputField.joiningDate}
          onChange={(event) => {
            handleOnChange(event, "joiningDate");
          }}
          type="date"
          className="border-2 w-[90%] pl-3 pr-3 pt-2 pb-2 border-slate-400 rounded-md h-12"
        />

        <select value={selectedOption} onChange={handleOnChangeSelect} className="border-2 w-[90%] h-12 pt-2 pb-2 border-slate-400 rounded-md placeholder:text-gray">
          {
            membershipList.map((item,index)=>{
              return(
                <option key={index} value={item._id}>{item.months} Months Membership</option>
              )
            })
          }
    
        </select>

        <input type="file" onChange={(e) => uploadImage(e)} />

        <div className="w-[100px] h-[100px]">
          <img
            src={inputField.profilePic}
            alt=""
            className="w-full h-full rounded-full"
          />

          {loaderImage && (
            <Stack sx={{ width: "100%", color: "grey.500" }} spacing={2}>
              <LinearProgress color="secondary" />
            </Stack>
          )}
        </div>

        <div onClick={()=>handleRegisterButton()} className="p-3 border-2 w-28 text-lg h-14 text-center  bg-slate-900 text-white rounded-xl cursor-pointer hover:bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:text-black">
          Register
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default AddMembers;
