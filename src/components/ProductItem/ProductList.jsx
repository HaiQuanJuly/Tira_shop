import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./styles.module.scss";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const responsive = {
  superLargeDesktop: { breakpoint: { max: 4000, min: 3000 }, items: 5 },
  desktop: { breakpoint: { max: 3000, min: 1024 }, items: 5 },
  tablet: { breakpoint: { max: 1024, min: 464 }, items: 2 },
  mobile: { breakpoint: { max: 464, min: 0 }, items: 1 },
};

function ProductList({ handleAddToCart }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch products from API
    fetch("http://localhost:8080/tirashop/product")
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "success") {
          setProducts(data.data.elementList || []);
        } else {
          setError("Failed to fetch products");
        }
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  const handleProductClick = (productId) => {
    // Navigate to product detail page
    navigate(`/product/${productId}`);
  };

  return (
    <div>
      <p className={styles.bestProduct}>_Our best product_</p>
      <div className={styles.container}>
        <Carousel responsive={responsive} className={styles.productGrid}>
          {products.map((product) => (
            <div key={product.id} className={styles.productItem}>
              <div
                className={styles.boxImg}
                onClick={() => handleProductClick(product.id)} // Navigate to detail page
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
              <button
                onClick={() => handleAddToCart(product)} // Add product to cart
                className={styles.addToCartBtn}
              >
                Add to Cart
              </button>
            </div>
          ))}
        </Carousel>
      </div>
      <div className={styles.buttonContainer}>
        <button className={styles.button}>See more products</button>
      </div>
    </div>
  );
}

export default ProductList;
