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

  const mapCategoryDisplay = (category) => {
    const categoryMap = {
      "Tre Em": {
        name: "Children's Fashion",
        description: "Products designed for children.",
      },
      Gucci: null, // Bỏ qua category này
      Mens: {
        name: "Men's Fashion",
        description: "Products designed for men.",
      },
      Womens: {
        name: "Women's Fashion",
        description: "Products designed for women.",
      },
      "Both Male and Female": {
        name: "Unisex Fashion",
        description: "Products suitable for both men and women.",
      },
    };
    return (
      categoryMap[category.name] || {
        name: category.name,
        description: category.description,
      }
    );
  };

  const fetchCategories = useCallback(async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const headers = {
        "Content-Type": "application/json",
        Accept: "application/json",
      };
      if (token) {
        headers["Authorization"] = `Bearer ${token}`;
      }

      const response = await fetch(
        "http://localhost:8080/tirashop/category/list",
        {
          method: "GET",
          headers,
        }
      );

      if (!response.ok) {
        if (response.status === 401) {
          toast.error("Please log in to view categories");
          navigate("/auth");
          return;
        }
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const text = await response.text();
      console.log("Raw category list response:", text);

      if (!text) {
        throw new Error("Empty response from server");
      }

      const data = JSON.parse(text);
      if (data.status === "success" && data.data) {
        setCategories(data.data.elementList || []);
      } else {
        setError(data.message || "Failed to fetch categories");
        toast.error(data.message || "Failed to fetch categories");
      }
    } catch (err) {
      console.error("Error fetching categories:", err);
      setError(err.message);
      toast.error(`Error fetching categories: ${err.message}`);
    } finally {
      setLoading(false);
    }
  }, [navigate]);

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
        {categories
          .filter((category) => mapCategoryDisplay(category) !== null)
          .map((category) => {
            const display = mapCategoryDisplay(category);
            return (
              <button
                key={category.id}
                className={styles.categoryBtn}
                onClick={() => handleCategorySelect(category)}
              >
                {display.name}
              </button>
            );
          })}
      </div>
    </div>
  );
}

export default CategoryList;
