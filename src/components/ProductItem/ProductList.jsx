import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8080/tirashop/product")
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "success") {
          setProducts(data.data.elementList);
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
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h2 style={{ textTransform: "uppercase", fontSize: "22px", marginBottom: "15px" }}>Our Best Products</h2>
      <div 
        style={{ 
          display: "grid", 
          gridTemplateColumns: "repeat(3, 1fr)", 
          gap: "10px", 
          justifyContent: "center" 
        }}
      >
        {products.map((product) => (
          <div 
            key={product.id} 
            style={{ 
              textAlign: "center", 
              border: "1px solid #ddd", 
              borderRadius: "8px", 
              padding: "12px", 
              background: "#fff", 
              width: "250px",
              margin: "0 auto"
            }}
          >
            <img 
              src={product.imageUrls && product.imageUrls.length > 0 ? `http://localhost:8080${product.imageUrls[0]}` : "https://via.placeholder.com/250"} 
              alt={product.name} 
              style={{ width: "100%", height: "250px", objectFit: "cover", borderRadius: "8px" }}
            />
            <h3 style={{ fontSize: "16px", margin: "10px 0" }}>{product.name}</h3>
            <p style={{ fontSize: "14px", color: "gray" }}>{product.categoryName}</p>
            <p style={{ fontSize: "16px", fontWeight: "bold", color: "red" }}>${product.price.toFixed(2)}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

ProductList.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      categoryName: PropTypes.string,
      imageUrls: PropTypes.array,
    })
  ),
};

export default ProductList;
