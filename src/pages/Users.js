import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Users() {
  const [users, setUsers] = useState([]);
  const [post, setPosts] = useState([]);


  const fetchUsers = () => {

    axios.get('https://jsonplaceholder.typicode.com/users')
      .then(response => {
        setUsers(response.data);
      })
      .catch(error => {
        console.error('Error fetching users:', error);
      });

  }

  const fetchPosts = () => {

    axios.get('https://jsonplaceholder.typicode.com/posts')
      .then(response => {
        setPosts(response.data);
      })
      .catch(error => {
        console.error('Error fetching Posts:', error);
      });

  }

  useEffect(() => {
    fetchUsers()
    fetchPosts()
  }, []);

  return (
    <div>
      <h1>User Directory</h1>
      <ul>
        {users.map(user => (
          <li key={user.id}>
            <div className="user-card">
            <Link to={`/profile/${user.id}`}>
              <div className="user-details">
                <div className="user-name">Name : {user.name}</div>
                <div className="post-count">Posts: {post.filter((pos)=> pos.userId === user.id).length}</div>
              </div>
            </Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Users;
