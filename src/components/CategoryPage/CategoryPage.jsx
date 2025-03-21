// CategoryPage.js
import { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import styles from "./styles.module.scss";
import { useAppContext } from "../../Context/AppContext";

function CategoryPage() {
  const { categoryId } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useAppContext();
  const [category, setCategory] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCategoryAndProducts = useCallback(async () => {
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

      // Trường hợp categoryId là "all"
      if (categoryId === "all") {
        setCategory({
          name: "All Categories",
          description: "Browse all products.",
        });

        // Fetch tất cả sản phẩm mà không lọc theo category
        const productResponse = await fetch(
          `http://localhost:8080/tirashop/product`,
          {
            method: "GET",
            headers,
          }
        );

        const productText = await productResponse.text();
        const productData = JSON.parse(productText);
        if (productData.status === "success") {
          setProducts(productData.data.elementList || []);
        } else {
          throw new Error(productData.message || "Failed to fetch products");
        }
      } else {
        // Fetch thông tin category
        const categoryResponse = await fetch(
          `http://localhost:8080/tirashop/category/get/${categoryId}`,
          {
            method: "GET",
            headers,
          }
        );

        if (!categoryResponse.ok) {
          if (categoryResponse.status === 401) {
            toast.error("Please log in to view this category");
            navigate("/auth");
            return;
          }
          throw new Error(`HTTP error! Status: ${categoryResponse.status}`);
        }

        const categoryText = await categoryResponse.text();
        const categoryData = JSON.parse(categoryText);
        if (categoryData.status === "success" && categoryData.data) {
          setCategory(categoryData.data);
        } else {
          throw new Error(categoryData.message || "Failed to fetch category");
        }

        // Fetch tất cả sản phẩm của category
        const productResponse = await fetch(
          `http://localhost:8080/tirashop/product?categoryId=${categoryId}`,
          {
            method: "GET",
            headers,
          }
        );

        const productText = await productResponse.text();
        const productData = JSON.parse(productText);
        if (productData.status === "success") {
          setProducts(productData.data.elementList || []);
        } else {
          throw new Error(productData.message || "Failed to fetch products");
        }
      }
    } catch (err) {
      console.error("Error:", err);
      setError(err.message);
      toast.error(`Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  }, [categoryId, navigate]);

  useEffect(() => {
    fetchCategoryAndProducts();
  }, [fetchCategoryAndProducts]);

  if (loading) return <p>Loading category...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!category) return <p>Category not found.</p>;

  return (
    <div className={styles.categoryPage}>
      <h2>{category.name}</h2>
      <p>{category.description || "No description available."}</p>
      <div className={styles.productList}>
        {products.length === 0 ? (
          <p>No products available in this category.</p>
        ) : (
          products.map((product) => (
            <div key={product.id} className={styles.productItem}>
              <img
                src={
                  product.imageUrls && product.imageUrls.length > 0
                    ? `http://localhost:8080${product.imageUrls[0]}`
                    : "https://via.placeholder.com/250"
                }
                alt={product.name || "Unnamed Product"}
                onClick={() => navigate(`/product/${product.id}`)}
              />
              <h3>{product.name || "Unnamed Product"}</h3>
              <p>
                {product.brandName || "Unknown Brand"} -{" "}
                {product.categoryName || "No Category"}
              </p>
              <p>${product.price ? product.price.toFixed(2) : "N/A"}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default CategoryPage;
