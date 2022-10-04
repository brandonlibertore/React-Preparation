import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Post() {
  let navigate = useNavigate();
  const { id } = useParams();
  const [post, setPost] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchId, setSearchId] = useState(id);

  async function fetchPosts(userId) {
    setLoading(true);
    const { data } = await axios.get(
      `https://jsonplaceholder.typicode.com/posts?userId=${userId || id}`
    );
    setPost(data);
    setLoading(false);
  }

  useEffect(() => {
    fetchPosts();
  }, []);

  function onSearch() {
    fetchPosts(searchId);
  }

  return (
    <>
      <div className="post__search">
        <button onClick={() => navigate("/")}>← Back</button>
        <div className="post__search--container">
          <label className="post__search--label">Search by Id</label>
          <input
            type="number"
            value={searchId}
            onChange={(event) => setSearchId(event.target.value)}
            onKeyPress={(event) => {
              event.key === "Enter" && onSearch();
            }}
          />
          <button onClick={() => onSearch()}>Enter</button>
        </div>
      </div>
      {loading
        ? new Array(10).fill(0).map((_, index) => (
            <div className="post" key={index}>
              <div className="post__title">
                <div className="post__title--skeleton"></div>
              </div>
              <div className="post__body">
                <p className="post__body--skeleton"></p>
              </div>
            </div>
          ))
        : post.map((elem) => (
            <>
              <div className="post" key={elem.id}>
                <div className="post__title">{elem.title}</div>
                <p className="post__body">{elem.body}</p>
              </div>
            </>
          ))}
    </>
  );
}
