import React, { useState, useEffect } from "react";
import "./userDetails.css";
import { IoLogOutOutline } from "react-icons/io5";
import API from "../../utils/api";
import Skeleton from "react-loading-skeleton";
import Error from "../layout/Error";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/authSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Membership from "./Membership";
import Addresses from "./Addresses";

const UserDetails = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await API.get("/user/profile");
        setUserData(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch user data");
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);
  const handleLogout = () => {
  
    toast.dark(
      ({ closeToast }) => (
        <div>
          <p>Are you sure you want to logout?</p>
          <div>
            <button
              className="confirmBtn"
              onClick={() => {
                dispatch(logout());
                closeToast(); 
                navigate("/login")
              }}
            >
              Yes
            </button>
            <button className="cancelBtn" onClick={closeToast}>
              No
            </button>
          </div>
        </div>
      )
    );
  };

  if (loading) {
    return (
      <>
      <div className="userDetailMain">
        <div className="userDetailRight">
          <div className="userPrimaryData">
            <div className="userIcon"><Skeleton /></div>
            <div className="userName"><Skeleton/></div>
            <div className="userEmail"><Skeleton/></div>  
          </div>
          <div className="profileOverView">

            <div className="profileOverviewHead">Profile Overview</div>
            <div className="profileDataItems">User Name - <span><Skeleton/></span></div>
            <div className="profileDataItems">Phone Number - <span><Skeleton/></span></div>
            <div className="profileDataItems">Email - <span><Skeleton/></span></div>
            <div className="profileDataItems">Is member - <span><Skeleton/></span></div>
            <div className="profileDataItems">Created - <span><Skeleton/></span></div>
            <div className="profileDataItems">Last Login - <span><Skeleton/></span></div>
            <button className="profileDataButtons logoutButton"><IoLogOutOutline /> Logout</button>
            <button className="profileDataButtons changePassButton">Change password</button>
          </div>
        </div> 
        <div className="userDetailLeft">
            <Membership />
        </div> 
      </div>
    </>
    );
  }

  if (error) {
    return <Error errorMessage={error}/>;
  }
  return (
    <>
    <div className="userDetailMain">
      <div className="userDetailRight">
        <div className="userPrimaryData">
          <div className="userIcon">{userData?.username?.slice(0,2).toUpperCase()}</div>
          <div className="userName">{userData?.username}</div>
          <div className="userEmail">{userData?.email}</div>
        </div>
        <div className="profileOverView">
          <div className="profileOverviewHead">Profile Overview</div>
          <div className="profileDataItems">User Name - <span>{userData?.username}</span></div>
          <div className="profileDataItems">Phone Number - <span>{userData?.phoneNumber || "N/A"}</span></div>
          <div className="profileDataItems">Email - <span>{userData?.email}</span></div>
          <div className="profileDataItems">Is member - <span>{userData?.isMember ? "Yes" : "No"}</span></div>
          <div className="profileDataItems">Created - <span>{new Date(userData?.createdAt).toLocaleDateString()}</span></div>
          <div className="profileDataItems">Last Login - <span>{new Date(userData?.dateLastLogged).toLocaleDateString()}</span></div>
          <button className="profileDataButtons logoutButton" onClick={handleLogout}>
            <IoLogOutOutline /> Logout
          </button>
          <button className="profileDataButtons changePassButton">Change password</button>
        </div>
      </div>
      <div className="userDetailLeft">
      <Membership userData={userData}/>
      <Addresses />
      </div>
    </div>
  </>
  );
};

export default UserDetails;
