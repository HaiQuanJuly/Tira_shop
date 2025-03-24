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
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const headers = {
        "Content-Type": "application/json",
        Accept: "application/json",
      };
      if (token) headers["Authorization"] = `Bearer ${token}`;

      const url = categoryId
        ? `http://localhost:8080/tirashop/product?categoryId=${categoryId}`
        : selectedCategory
        ? `http://localhost:8080/tirashop/product?categoryId=${selectedCategory.id}`
        : "http://localhost:8080/tirashop/product";

      const response = await fetch(url, { method: "GET", headers });
      const data = await response.json();
      if (data.status === "success") {
        const productList = data.data.elementList || [];
        setProducts(productList);
        setSelectedSizes(
          productList.reduce((acc, product) => {
            acc[product.id] = "M";
            return acc;
          }, {})
        );
      } else {
        setError("Không thể lấy danh sách sản phẩm");
      }
    } catch (err) {
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
    setSelectedSizes((prev) => ({ ...prev, [productId]: size }));
  }, []);

  const handleAddToCart = useCallback(
    async (product) => {
      const token = localStorage.getItem("token");
      if (!token || !isAuthenticated) {
        toast.error("Vui lòng đăng nhập để thêm vào giỏ hàng");
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
          toast.success("Đã thêm vào giỏ hàng thành công!");
          await fetchCart();
          setIsSidebarOpen(true);
        } else {
          toast.error(
            `Không thể thêm vào giỏ hàng: ${
              data.message || "Lỗi không xác định"
            }`
          );
        }
      } catch (error) {
        toast.error("Lỗi khi thêm vào giỏ hàng. Vui lòng thử lại.");
      }
    },
    [isAuthenticated, navigate, fetchCart, setIsSidebarOpen, selectedSizes]
  );

  const memoizedProducts = useMemo(() => products.slice(0, 7), [products]);

  const handleSeeMore = useCallback(() => {
    navigate("/category/all"); // Điều hướng đến trang hiển thị tất cả sản phẩm
  }, [navigate]);

  if (loading) return <p>Đang tải sản phẩm...</p>;
  if (error) return <p>Lỗi: {error}</p>;
  if (memoizedProducts.length === 0) return <p>Không có sản phẩm nào.</p>;

  return (
    <div className={styles.productListContainer}>
      <p className={styles.bestProduct}>Sản Phẩm Nổi Bật</p>
      <div className={styles.container}>
        <Carousel
          responsive={responsive}
          className={styles.productGrid}
          infinite
          autoPlay={false}
          keyBoardControl
          showDots
        >
          {memoizedProducts.map((product) => (
            <div key={product.id} className={styles.productItem}>
              <div
                className={styles.boxImg}
                onClick={() => handleProductClick(product.id)}
              >
                <img
                  src={
                    product.imageUrls?.[0]
                      ? `http://localhost:8080${product.imageUrls[0]}`
                      : "https://via.placeholder.com/250"
                  }
                  alt={product.name || "Sản phẩm không tên"}
                />
              </div>
              <div className={styles.title}>
                {product.name || "Sản phẩm không tên"}
              </div>
              <div className={styles.category}>
                {product.brandName || "Thương hiệu không xác định"} -{" "}
                {product.categoryName || "Không có danh mục"}
              </div>
              <div className={styles.priceCl}>
                {product.price ? product.price.toFixed(2) : "N/A"} $
              </div>
              <div className={styles.sizeSelector}>
                <label>Chọn Kích Thước:</label>
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
                Thêm Vào Giỏ Hàng
              </button>
            </div>
          ))}
        </Carousel>
      </div>
      <div className={styles.buttonContainer}>
        <button className={styles.button} onClick={handleSeeMore}>
          Xem Thêm Sản Phẩm
        </button>
      </div>
    </div>
  );
}

export default React.memo(
  ProductList,
  (prevProps, nextProps) =>
    prevProps.isAuthenticated === nextProps.isAuthenticated &&
    prevProps.categoryId === nextProps.categoryId
);
