import { useEffect, useState } from "react";
import styles from "./styles.module.scss";

function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
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

  return (
    <div className={styles.productGrid}>
      {products.map((product) => (
        <div key={product.id} className={styles.productItem}>
          <div className={styles.boxImg}>
            <img
              src={
                product.imageUrls && product.imageUrls.length > 0
                  ? `http://localhost:8080${product.imageUrls[0]}`
                  : "https://via.placeholder.com/250"
              }
              alt={product.name || "Unnamed Product"}
            />
            {product.imageUrls && product.imageUrls.length > 1 && (
              <img
                src={`http://localhost:8080${product.imageUrls[1]}`}
                className={styles.showImgWhenHover}
                alt="hover"
              />
            )}
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
        </div>
      ))}
    </div>
  );
}

export default ProductList;
