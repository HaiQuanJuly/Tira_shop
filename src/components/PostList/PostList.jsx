import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Footer from "../Footer/Footer";
import styles from "./styles.module.scss";

function PostList() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  // const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchPosts = async () => {
    try {
      setLoading(true);
      // setError(null); // Reset error trước khi fetch
      const token = localStorage.getItem("token");

      if (!token) {
        throw new Error("Please login to view news.");
      }

      const url = "http://localhost:8080/tirashop/posts?author=duo";
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 401) {
        toast.error("Session expired. Please login again.");
        localStorage.removeItem("token");
        navigate("/auth");
        return;
      }

      if (!response.ok) {
        throw new Error(`Failed to fetch posts: ${response.status}`);
      }

      const data = await response.json();
      console.log("API Response Data:", data);

      if (data.status === "success" && data.data?.elementList?.length > 0) {
        setPosts(data.data.elementList);
      } else {
        setPosts([]);
        toast.info("No news available at the moment.");
      }
    } catch (err) {
      console.error("Error fetching posts:", err);
      setError(err.message);
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []); // Chỉ chạy khi mount

  const handlePostClick = (postId) => {
    navigate(`/post/${postId}`);
  };

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.spinner}></div>
        <p>Loading news...</p>
      </div>
    );
  }

  // if (error) {
  //   return (
  //     <div className={styles.errorContainer}>
  //       <div className={styles.errorIcon}>!</div>
  //       <p>{error}</p>
  //       <button className={styles.refreshButton} onClick={fetchPosts}>
  //         Try Again
  //       </button>
  //     </div>
  //   );
  // }

  return (
    <>
      <div className={styles.postListContainer}>
        <div className={styles.postHeader}>
          <h2 className={styles.postTitle}>News</h2>
          <div className={styles.postFilter}>
            <span className={styles.activeFilter}>All</span>
            <span>Latest</span>
            <span>Popular</span>
          </div>
        </div>

        {posts.length > 0 ? (
          <div className={styles.postGrid}>
            {posts.map((post) => (
              <div
                key={post.id}
                className={styles.postCard}
                onClick={() => handlePostClick(post.id)}
              >
                <div className={styles.postImageWrapper}>
                  <img
                    src={post.imageUrl || "https://via.placeholder.com/250"}
                    alt={post.name || "News Image"}
                    className={styles.postImage}
                  />
                  <div className={styles.postTopic}>
                    {post.topic || "General"}
                  </div>
                </div>
                <div className={styles.postDetails}>
                  <h3 className={styles.postName}>{post.name || "Untitled"}</h3>
                  <p className={styles.postShortDescription}>
                    {post.shortDescription || "No description available"}
                  </p>
                  <div className={styles.postMeta}>
                    <div className={styles.postAuthorInfo}>
                      <div className={styles.postAuthorAvatar}>
                        {(post.authorName || "A")[0].toUpperCase()}
                      </div>
                      <span className={styles.postAuthorName}>
                        {post.authorName || "Anonymous"}
                      </span>
                    </div>
                    <span className={styles.postDate}>
                      {new Date(post.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className={styles.emptyPostContainer}>
            <div className={styles.emptyPostIcon}>📭</div>
            <p>No news available at the moment</p>
            <button className={styles.refreshButton} onClick={fetchPosts}>
              Refresh
            </button>
          </div>
        )}
      </div>
    </>
  );
}

export default PostList;
