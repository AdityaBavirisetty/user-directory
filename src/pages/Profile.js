import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Timer from "../components/Timer";

function Profile({ match }) {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedPost, setSelectedPost] = useState(null);
  const params = useParams();
  const navigate = useNavigate();

  const fetchCountries = () => {
    axios
      .get(`https://worldtimeapi.org/api/timezone`)
      .then((response) => {
        setCountries(response.data);
      })
      .catch((error) => {
        console.error("Error fetching user details:", error);
      });
  };

  const handleSelectCountry = (e) => {
    setSelectedCountry(e.target.value);
  };

  useEffect(() => {
    const userId = params.id;

    // Fetch user details
    axios
      .get(`https://jsonplaceholder.typicode.com/users?id=${userId}`)
      .then((response) => {
        setUser(response.data[0]);
      })
      .catch((error) => {
        console.error("Error fetching user details:", error);
      });

    // Fetch user posts
    axios
      .get(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)
      .then((response) => {
        setPosts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching user posts:", error);
      });

    fetchCountries();
  }, [params.id]);

  return (
    <div className="profile-wrapper">
      <div className="profile-header">
        <button
          onClick={() => {
            navigate("/");
          }}
        >
          Back
        </button>
        <div className="profile-timer">
          <div className="profile-country">
            <select
              onChange={(e) => {
                handleSelectCountry(e);
              }}
            >
              <option value="" style={{ display: "none" }}>
                Select country{" "}
              </option>
              {countries.map((country) => {
                return <option value={country}>{country}</option>;
              })}
            </select>
          </div>
          <Timer country={selectedCountry} status="running" />
        </div>
      </div>
      {user && (
        <div>
          <h1>{user.name}'s Profile</h1>
          <div className="user-details-box">
            <div className="detail">
              <label>Name:</label>
              <div>{user.name}</div>
            </div>
            <div className="detail">
              <label>Username:</label>
              <div>{user.username}</div>
            </div>
            <div className="detail">
              <label>Email:</label>
              <div>{user.email}</div>
            </div>
            <div className="detail">
              <label>Phone:</label>
              <div>{user.phone}</div>
            </div>
          </div>
          <h2>Posts:</h2>
          <div className="post-container">
            {posts.map((post) => (
              <div
                key={post.id}
                className="post"
                onClick={() => setSelectedPost(post)}
              >
                <h3>{post.title}</h3>
                <p>{post.body.split(" ").slice(0, 10).join(" ")}...</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {selectedPost && (
        <div class="modal" onClick={() => setSelectedPost(null)}>
          <div class="modal-content">
            <div class="modal-body">
              <p>
                <b>Title :</b> {selectedPost.title}
              </p>
              <p>
                <b>Body :</b> {selectedPost.body}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Profile;
