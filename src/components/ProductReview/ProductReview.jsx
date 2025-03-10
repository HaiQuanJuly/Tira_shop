import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import styles from "./styles.module.scss";

function ProductReview() {
  const { id } = useParams();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setReviews([]);
          setLoading(false);
          return;
        }

        const response = await fetch(
          `http://localhost:8080/tirashop/reviews/product/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 401) {
          localStorage.removeItem("token");
          toast.error("Your session has expired. Please log in again.", {
            position: "top-right",
            autoClose: 3000,
          });
          setLoading(false);
          return;
        }

        const data = await response.json();

        if (data.status === "success") {
          setReviews(data.data.elementList || []);
        } else {
          setError(data.message || "Failed to fetch reviews");
          toast.error(data.message || "Failed to fetch reviews", {
            position: "top-right",
            autoClose: 3000,
          });
        }
      } catch (err) {
        setError(err.message);
        toast.error(err.message, {
          position: "top-right",
          autoClose: 3000,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [id]);

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span
          key={i}
          className={i <= rating ? styles.filledStar : styles.emptyStar}
        >
          {i <= rating ? "★" : "☆"}
        </span>
      );
    }
    return stars;
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return dateString;
  };

  if (loading) return <p>Loading reviews...</p>;

  return (
    <div className={styles.reviewsContainer}>
      <h3 className={styles.reviewsTitle}>Product Reviews</h3>

      {reviews.length === 0 ? (
        <p className={styles.noReviews}>No reviews yet for this product.</p>
      ) : (
        <div className={styles.reviewsList}>
          {reviews.map((review) => (
            <div key={review.id} className={styles.reviewItem}>
              <div className={styles.reviewHeader}>
                <div className={styles.reviewUser}>
                  <strong>{review.username}</strong>
                </div>
                <div className={styles.reviewDate}>
                  {formatDate(review.createdAt)}
                </div>
              </div>

              <div className={styles.reviewRating}>
                {renderStars(review.rating)}
              </div>

              <div className={styles.reviewText}>{review.reviewText}</div>

              {review.image && (
                <div className={styles.reviewImage}>
                  <img
                    src={`http://localhost:8080${review.image}`}
                    alt="Review"
                    className={styles.reviewImg}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ProductReview;
