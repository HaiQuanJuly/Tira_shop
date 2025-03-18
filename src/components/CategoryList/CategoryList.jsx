// CategoryList.js
import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../../Context/AppContext";
import { toast } from "react-toastify";
import styles from "./styles.module.scss";

function CategoryList() {
  const { setSelectedCategory } = useAppContext();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchCategories = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(
        "http://localhost:8080/tirashop/category/list",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();
      if (data.status === "success" && data.data) {
        setCategories(data.data);
      } else {
        setError(data.message || "Failed to fetch categories");
        toast.error(data.message || "Failed to fetch categories");
      }
    } catch (err) {
      setError(err.message);
      toast.error(`Error fetching categories: ${err.message}`);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    if (category) {
      navigate(`/category/${category.id}`);
    } else {
      navigate("/");
    }
  };

  if (loading) return <p>Loading categories...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className={styles.categoryListContainer}>
      <h3>Categories</h3>
      <div className={styles.categoryButtons}>
        <button
          className={styles.categoryBtn}
          onClick={() => handleCategorySelect(null)}
        >
          All
        </button>
        {categories.map((category) => (
          <button
            key={category.id}
            className={styles.categoryBtn}
            onClick={() => handleCategorySelect(category)}
          >
            {category.name}
          </button>
        ))}
      </div>
    </div>
  );
}

export default CategoryList;
