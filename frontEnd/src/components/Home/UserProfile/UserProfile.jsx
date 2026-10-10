import React, { useEffect } from "react";
import "../../../style/UserProfile/UserProfile.css";
import UserLeftSide from "./UserLeftSide";
import UserRightSide from "./UserRightSide";
import { useState } from "react";
import axios from "axios";

const UserProfile = () => {
  const [offres, setOffres] = useState([]);
  const [publications, setPublications] = useState([]);
  const [userData, setUserData] = useState({});
  const data = JSON.parse(sessionStorage.getItem("userData"));
  const token = sessionStorage.getItem("loginData");
  console.log(data);
  // fetching data
  useEffect(() => {
    const fetchingData = async () => {
      try {
        const response = axios.get(
          `http://localhost:3000/api/allDataUser/${data.id_user}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setOffres((await response).data.offres);
        setPublications((await response).data.publications);
        setUserData(data);
      } catch (e) {
        console.error("erreur de fetching data ", e);
      }
    };
    fetchingData();
    
    
  }, []);

  return (
    <div className="userProfile">
      <div className="left">
        <UserLeftSide userData={userData}/>
      </div>
      <div className="right">
        <UserRightSide offres={offres} publications={publications}/>
      </div>
    </div>
  );
};

export default UserProfile;
