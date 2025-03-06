import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./styles.module.scss";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const responsive = {
  superLargeDesktop: { breakpoint: { max: 4000, min: 3000 }, items: 5 },
  desktop: { breakpoint: { max: 3000, min: 1024 }, items: 4 },
  tablet: { breakpoint: { max: 1024, min: 464 }, items: 2 },
  mobile: { breakpoint: { max: 464, min: 0 }, items: 1 },
};

function ProductList({ handleAddToCart, isAuthenticated }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedSizes, setSelectedSizes] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:8080/tirashop/product", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "success") {
          setProducts(data.data.elementList || []);
          const initialSizes = {};
          data.data.elementList.forEach((product) => {
            initialSizes[product.id] = "M";
          });
          setSelectedSizes(initialSizes);
        } else {
          setError("Failed to fetch products");
        }
      })
      .catch((err) => setError(err.message))
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

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className={styles.productListContainer}>
      <p className={styles.bestProduct}>Our Best Products</p>
      <div className={styles.container}>
        <Carousel responsive={responsive} className={styles.productGrid}>
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
                  onClick={() =>
                    handleAddToCart(product, selectedSizes[product.id])
                  }
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
