import React, { useEffect, useState } from "react";
import PostCard from "../Layouts/PostCard";
import axios from "axios";

const Posts = () => {
  const [publications, setPublications] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch publications from the API
    const fetchPublications = async () => {
      try {
        const token = sessionStorage.getItem("loginData");
        console.log("Token:", token);
        const response = await axios.get(
          "http://localhost:3000/api/publication",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("API Response:", response.data);
        setPublications(response.data);
      } catch (error) {
        console.error("Error fetching publications:", error);
        setError(`Error fetching publications: ${error.message}`);
      }
    };

    fetchPublications();
  }, []); // Empty dependency array ensures this runs only once

  useEffect(() => {
    // Log publications when it changes
    console.log("Publications state:", publications);
  }, [publications]);

  return (
    <div>
      {error && <p>{error}</p>}
      {publications.map((pub) => (
        <PostCard
          key={pub.publication._id}
          profileImage={pub.auteur?.info.profilepath }
          profileName={`${pub.auteur?.info.prenom || ""} ${
            pub.auteur?.info.nom || ""
          }`.trim()}
          profileTitle={pub.auteur?.type || "Unknown"}
          postDescription={
            pub.publication.contenu || "No description available"
          }
          postImage={pub.publication.imagePath || "defaultPostImagePath"}
        />
      ))}
    </div>
  );
};

export default Posts;
