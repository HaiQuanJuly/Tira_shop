// ProductList.js
import { useEffect, useState, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import styles from "./styles.module.scss";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useAppContext } from "../../Context/AppContext";
import React from "react";

const responsive = {
  superLargeDesktop: { breakpoint: { max: 4000, min: 3000 }, items: 5 },
  desktop: { breakpoint: { max: 3000, min: 1024 }, items: 4 },
  tablet: { breakpoint: { max: 1024, min: 464 }, items: 2 },
  mobile: { breakpoint: { max: 464, min: 0 }, items: 1 },
};

function ProductList({ isAuthenticated, categoryId }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedSizes, setSelectedSizes] = useState({});
  const navigate = useNavigate();
  const { fetchCart, setIsSidebarOpen, selectedCategory } = useAppContext();

  const fetchProducts = useCallback(async () => {
    console.log("Fetching products...");
    setLoading(true);
    try {
      const url = categoryId
        ? `http://localhost:8080/tirashop/product?categoryId=${categoryId}`
        : selectedCategory
        ? `http://localhost:8080/tirashop/product?categoryId=${selectedCategory.id}`
        : "http://localhost:8080/tirashop/product";

      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log("Response status:", response.status);
      const data = await response.json();
      console.log("API data:", data);
      if (data.status === "success") {
        const productList = data.data.elementList || [];
        setProducts(productList);
        const initialSizes = productList.reduce((acc, product) => {
          acc[product.id] = "M";
          return acc;
        }, {});
        setSelectedSizes(initialSizes);
      } else {
        setError("Failed to fetch products");
      }
    } catch (err) {
      console.error("Fetch error:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [categoryId, selectedCategory]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleProductClick = useCallback(
    (productId) => {
      navigate(`/product/${productId}`);
    },
    [navigate]
  );

  const handleSizeChange = useCallback((productId, size) => {
    setSelectedSizes((prev) => ({
      ...prev,
      [productId]: size,
    }));
  }, []);

  const handleAddToCart = useCallback(
    async (product) => {
      const token = localStorage.getItem("token");
      if (!token || !isAuthenticated) {
        toast.error("Please log in to add to cart");
        navigate("/auth");
        return;
      }

      try {
        const response = await fetch(
          "http://localhost:8080/tirashop/cart/add",
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              productId: product.id,
              quantity: 1,
              productSize: selectedSizes[product.id] || "M",
            }),
          }
        );

        const data = await response.json();
        if (response.ok && data.status === "success") {
          toast.success("Added to cart successfully!");
          await fetchCart();
          setIsSidebarOpen(true);
        } else {
          toast.error(
            `Failed to add to cart: ${data.message || "Unknown error"}`
          );
        }
      } catch (error) {
        console.error("Error adding to cart:", error);
        toast.error("Error adding to cart. Please try again.");
      }
    },
    [isAuthenticated, navigate, fetchCart, setIsSidebarOpen, selectedSizes]
  );

  const memoizedProducts = useMemo(() => products.slice(0, 7), [products]);

  const handleSeeMore = useCallback(() => {
    const targetCategoryId =
      categoryId || (selectedCategory && selectedCategory.id);
    if (targetCategoryId) {
      navigate(`/category/${targetCategoryId}`);
    } else {
      navigate("/category/all");
    }
  }, [categoryId, selectedCategory, navigate]);

  if (loading) return <p>Loading products...</p>;
  if (error) return <p>Error: {error}</p>;
  if (memoizedProducts.length === 0) return <p>No products available.</p>;

  return (
    <div className={styles.productListContainer}>
      <p className={styles.bestProduct}>Our Best Products</p>
      <div className={styles.container}>
        <Carousel
          responsive={responsive}
          className={styles.productGrid}
          infinite={true}
          autoPlay={false}
          keyBoardControl={true}
          showDots={true}
        >
          {memoizedProducts.map((product) => (
            <div key={product.id} className={styles.productItem}>
              <div
                className={styles.boxImg}
                onClick={() => handleProductClick(product.id)}
              >
                <img
                  src={
                    product.imageUrls && product.imageUrls.length > 0
                      ? `http://localhost:8080${product.imageUrls[0]}`
                      : "https://via.placeholder.com/250"
                  }
                  alt={product.name || "Unnamed Product"}
                />
              </div>
              <div className={styles.title}>
                {product.name || "Unnamed Product"}
              </div>
              <div className={styles.category}>
                {product.brandName || "Unknown Brand"} -{" "}
                {product.categoryName || "No Category"}
              </div>
              <div className={styles.priceCl}>
                ${product.price ? product.price.toFixed(2) : "N/A"}
              </div>
              <div className={styles.sizeSelector}>
                <label>Select Size:</label>
                <select
                  onChange={(e) => handleSizeChange(product.id, e.target.value)}
                  value={selectedSizes[product.id] || "M"}
                >
                  <option value="S">S</option>
                  <option value="M">M</option>
                  <option value="L">L</option>
                </select>
              </div>
              <button
                onClick={() => handleAddToCart(product)}
                className={styles.addToCartBtn}
              >
                Add to Cart
              </button>
            </div>
          ))}
        </Carousel>
      </div>
      <div className={styles.buttonContainer}>
        <button className={styles.button} onClick={handleSeeMore}>
          See More Products
        </button>
      </div>
    </div>
  );
}

export default React.memo(ProductList, (prevProps, nextProps) => {
  return (
    prevProps.isAuthenticated === nextProps.isAuthenticated &&
    prevProps.categoryId === nextProps.categoryId
  );
});
