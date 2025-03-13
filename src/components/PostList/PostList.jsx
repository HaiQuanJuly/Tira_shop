import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import styles from "./styles.module.scss";

function PostList() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      if (!token) {
        throw new Error("Unauthorized: No access token found. Please login.");
      }

      // Chỉ gọi API với author=duo
      const url = "http://localhost:8080/tirashop/posts?author=duo";

      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("API Response Status:", response.status);

      if (response.status === 401) {
        toast.error("Session expired. Please login again.", {
          position: "top-right",
          autoClose: 3000,
        });
        localStorage.removeItem("token");
        navigate("/auth");
        return;
      }

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log("API Response Data:", data);

      if (data.status === "success" || data.code === 0 || data.code === 200) {
        if (data.data?.elementList && data.data.elementList.length > 0) {
          setPosts(data.data.elementList);
        } else {
          setPosts([]);
          toast.info("No posts available", {
            position: "top-right",
            autoClose: 3000,
          });
        }
      } else {
        throw new Error(data.message || "Failed to fetch posts");
      }
    } catch (err) {
      console.error("Error fetching posts:", err);
      setError(err.message);
      toast.error(err.message, { position: "top-right", autoClose: 3000 });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []); // Chạy fetchPosts ngay khi component mount

  const handlePostClick = (postId) => {
    navigate(`/post/${postId}`);
  };

  if (loading) return <p>Loading posts...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className={styles.postListContainer}>
      <h2 className={styles.postTitle}>Posts</h2>
      <div className={styles.postGrid}>
        {posts.length > 0 ? (
          posts.map((post) => (
            <div
              key={post.id}
              className={styles.postItem}
              onClick={() => handlePostClick(post.id)}
            >
              <img
                src={post.imageUrl || "https://via.placeholder.com/250"}
                alt={post.name || "Post Image"}
                className={styles.postImage}
              />
              <div className={styles.postDetails}>
                <h3 className={styles.postName}>{post.name || "Untitled"}</h3>
                <p className={styles.postTopic}>{post.topic || "No Topic"}</p>
                <p className={styles.postAuthor}>
                  {post.authorName || "Anonymous"}
                </p>
                <p className={styles.postDate}>
                  {new Date(post.createdAt).toLocaleDateString()}
                </p>
                <p className={styles.postShortDescription}>
                  {post.shortDescription || "No description available"}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p>No posts available</p>
        )}
      </div>
    </div>
  );
}

export default PostList;
