import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import styles from "./styles.module.scss";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useAppContext } from "../../Context/AppContext";

const responsive = {
  superLargeDesktop: { breakpoint: { max: 4000, min: 3000 }, items: 5 },
  desktop: { breakpoint: { max: 3000, min: 1024 }, items: 4 },
  tablet: { breakpoint: { max: 1024, min: 464 }, items: 2 },
  mobile: { breakpoint: { max: 464, min: 0 }, items: 1 },
};

function ProductList({ isAuthenticated }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedSizes, setSelectedSizes] = useState({});
  const navigate = useNavigate();
  const { fetchCart, setIsSidebarOpen } = useAppContext();

  useEffect(() => {
    console.log("Fetching products...");
    fetch("http://localhost:8080/tirashop/product", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        console.log("Response status:", response.status);
        return response.json();
      })
      .then((data) => {
        console.log("API data:", data);
        if (data.status === "success") {
          const productList = data.data.elementList || [];
          setProducts(productList);
          const initialSizes = {};
          productList.forEach((product) => {
            initialSizes[product.id] = "M";
          });
          setSelectedSizes(initialSizes);
        } else {
          setError("Failed to fetch products");
        }
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        setError(err.message);
      })
      .finally(() => setLoading(false));
  }, []);

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  const handleSizeChange = (productId, size) => {
    setSelectedSizes((prev) => ({
      ...prev,
      [productId]: size,
    }));
  };

  const handleAddToCart = async (product) => {
    const token = localStorage.getItem("token");
    if (!token || !isAuthenticated) {
      toast.error("Please log in to add to cart");
      navigate("/auth");
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/tirashop/cart/add", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productId: product.id,
          quantity: 1,
          productSize: selectedSizes[product.id] || "M", // Đổi sang productSize để đồng bộ với API
        }),
      });

      const data = await response.json();
      if (response.ok && data.status === "success") {
        toast.success("Added to cart successfully!");
        await fetchCart(); // Cập nhật giỏ hàng
        setIsSidebarOpen(true); // Mở sidebar
      } else {
        toast.error(
          `Failed to add to cart: ${data.message || "Unknown error"}`
        );
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
      toast.error("Error adding to cart. Please try again.");
    }
  };

  if (loading) return <p>Loading products...</p>;
  if (error) return <p>Error: {error}</p>;
  if (products.length === 0) return <p>No products available.</p>;

  return (
    <div className={styles.productListContainer}>
      <p className={styles.bestProduct}>Our Best Products</p>
      <div className={styles.container}>
        <Carousel
          responsive={responsive}
          className={styles.productGrid}
          infinite={true} // Vòng lặp vô hạn
          autoPlay={false} // Tắt tự động chạy, bạn có thể bật nếu muốn
          keyBoardControl={true} // Cho phép điều khiển bằng bàn phím
          showDots={true} // Hiển thị chấm điều hướng
        >
          {products.map((product) => (
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
              {isAuthenticated ? (
                <button
                  onClick={() => handleAddToCart(product)}
                  className={styles.addToCartBtn}
                >
                  Add to Cart
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
          ))}
        </Carousel>
      </div>
      <div className={styles.buttonContainer}>
        <button className={styles.button}>See More Products</button>
      </div>
    </div>
  );
}

export default ProductList;
