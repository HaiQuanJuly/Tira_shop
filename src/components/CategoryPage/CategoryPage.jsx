// CategoryPage.js
import { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import styles from "./styles.module.scss";
import ProductList from "../ProductItem/ProductList";
import { useAppContext } from "../../Context/AppContext";

function CategoryPage() {
  const { categoryId } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useAppContext(); // Vẫn giữ để truyền vào ProductList
  const [category, setCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCategory = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `http://localhost:8080/tirashop/category/get/${categoryId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();
      if (data.status === "success" && data.data) {
        setCategory(data.data);
      } else {
        setError(data.message || "Failed to fetch category");
        toast.error(data.message || "Failed to fetch category");
      }
    } catch (err) {
      setError(err.message);
      toast.error(`Error fetching category: ${err.message}`);
    } finally {
      setLoading(false);
    }
  }, [categoryId]);

  useEffect(() => {
    fetchCategory();
  }, [fetchCategory]);

  if (loading) return <p>Loading category...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!category) return <p>Category not found.</p>;

  return (
    <div className={styles.categoryPage}>
      <h2>{category.name}</h2>
      <p>{category.description || "No description available."}</p>
      <ProductList isAuthenticated={isAuthenticated} categoryId={categoryId} />
    </div>
  );
}

export default CategoryPage;
