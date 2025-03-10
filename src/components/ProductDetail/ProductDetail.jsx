import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import styles from "./styles.module.scss";
import ProductReview from "../ProductReview/ProductReview"; // Import the ProductReview component

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedSize, setSelectedSize] = useState("M");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);

    const fetchProduct = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          toast.error("Please log in to view product details", {
            position: "top-right",
            autoClose: 3000,
          });
          navigate("/auth");
          return;
        }

        const response = await fetch(
          `http://localhost:8080/tirashop/product/get/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await response.json();
        if (data.status === "success") {
          setProduct(data.data);
        } else {
          setError(data.message || "Failed to fetch product");
          toast.error(data.message || "Failed to fetch product", {
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
    fetchProduct();
  }, [id, navigate]);

  const handleAddToCart = async () => {
    if (!isAuthenticated) {
      toast.error("Please log in to add items to cart", {
        position: "top-right",
        autoClose: 3000,
      });
      navigate("/auth");
      return;
    }

    setIsAdding(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Please log in to add items to cart", {
          position: "top-right",
          autoClose: 3000,
        });
        navigate("/auth");
        return;
      }

      const parsedProductId = parseInt(product.id);
      if (isNaN(parsedProductId)) {
        toast.error("Invalid product ID", {
          position: "top-right",
          autoClose: 3000,
        });
        return;
      }

      const validSizes = ["S", "M", "L"];
      if (!validSizes.includes(selectedSize)) {
        toast.error("Invalid size. Please select S, M, or L.", {
          position: "top-right",
          autoClose: 3000,
        });
        return;
      }

      console.log("Adding to cart with:", {
        productId: parsedProductId,
        quantity: 1,
        size: selectedSize,
      });

      const response = await fetch("http://localhost:8080/tirashop/cart/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          productId: parsedProductId,
          quantity: 1,
          size: selectedSize,
        }),
      });

      if (response.status === 401) {
        localStorage.removeItem("token");
        setIsAuthenticated(false);
        toast.error("Your session has expired. Please log in again.", {
          position: "top-right",
          autoClose: 3000,
        });
        navigate("/auth");
        return;
      }

      const data = await response.json();
      console.log("Response from add to cart:", data);

      if (data.status === "success") {
        toast.success("Product added to cart!", {
          position: "top-right",
          autoClose: 3000,
        });
        setTimeout(() => {
          navigate("/");
        }, 1500);
      } else {
        setError(data.message || "Failed to add to cart");
        toast.error(data.message || "Failed to add to cart", {
          position: "top-right",
          autoClose: 3000,
        });
      }
    } catch (error) {
      setError(error.message);
      toast.error(error.message, {
        position: "top-right",
        autoClose: 3000,
      });
    } finally {
      setIsAdding(false);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!product) return <p>Product not found</p>;

  return (
    <div className={styles.productDetailPage}>
      <div className={styles.productDetailContainer}>
        <div className={styles.productDetail}>
          <div className={styles.productImageWrapper}>
            <img
              src={
                product.imageUrls && product.imageUrls.length > 0
                  ? `http://localhost:8080${product.imageUrls[0]}`
                  : "https://via.placeholder.com/300"
              }
              alt={product.name}
              className={styles.productImage}
            />
          </div>
          <div className={styles.productInfo}>
            <h2>{product.name}</h2>
            <p className={styles.brandCategory}>
              {product.brandName} | {product.categoryName}
            </p>
            <p className={styles.price}>${product.price.toFixed(2)}</p>
            <p className={styles.description}>
              {product.description || "No description available"}
            </p>
            <div className={styles.sizeSelector}>
              <label>Select Size:</label>
              <select
                value={selectedSize}
                onChange={(e) => setSelectedSize(e.target.value)}
              >
                <option value="S">S</option>
                <option value="M">M</option>
                <option value="L">L</option>
              </select>
            </div>
            {isAuthenticated ? (
              <button
                onClick={handleAddToCart}
                className={styles.addToCartBtn}
                disabled={isAdding}
              >
                {isAdding ? "Adding..." : "Add to Cart"}
              </button>
            ) : (
              <button
                onClick={() => navigate("/auth")}
                className={styles.addToCartBtn}
              >
                Sign In to Add
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Add the ProductReview component */}
      <ProductReview />
    </div>
  );
}

export default ProductDetail;
