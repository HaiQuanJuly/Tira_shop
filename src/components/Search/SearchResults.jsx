import { useLocation, useNavigate } from "react-router-dom";
import styles from "./SearchResults.module.scss"; // Tạo file CSS tương ứng
import { toast } from "react-toastify";

const SearchResults = () => {
  const { state } = useLocation(); // Lấy state từ navigate
  const navigate = useNavigate();
  const products = state?.products || []; // Danh sách sản phẩm từ state
  const query = state?.query || ""; // Từ khóa tìm kiếm

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`); // Điều hướng đến trang chi tiết sản phẩm
  };

  const handleAddToCart = async (product) => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Vui lòng đăng nhập để thêm vào giỏ hàng");
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
          productSize: "M", // Kích thước mặc định
        }),
      });
      const data = await response.json();
      if (response.ok && data.status === "success") {
        toast.success("Đã thêm vào giỏ hàng thành công!");
      } else {
        toast.error(
          `Không thể thêm vào giỏ hàng: ${data.message || "Lỗi không xác định"}`
        );
      }
    } catch (error) {
      toast.error("Lỗi khi thêm vào giỏ hàng. Vui lòng thử lại.");
    }
  };

  if (!products || products.length === 0) {
    return (
      <div className={styles.noResults}>
        <h2>Kết quả tìm kiếm cho: "{query}"</h2>
        <p>Không tìm thấy sản phẩm nào.</p>
        <button onClick={() => navigate("/")}>Quay lại trang chủ</button>
      </div>
    );
  }

  return (
    <div className={styles.searchResults}>
      <h2>Kết quả tìm kiếm cho: "{query}"</h2>
      <div className={styles.productList}>
        {products.map((product) => (
          <div key={product.id} className={styles.productItem}>
            <div className={styles.productImage}>
              <img
                src={
                  product.imageUrls?.[0]
                    ? `http://localhost:8080${product.imageUrls[0]}`
                    : "https://via.placeholder.com/250"
                }
                alt={product.name || "Unnamed product"}
                onClick={() => handleProductClick(product.id)}
              />
            </div>
            <div className={styles.productInfo}>
              <h3>{product.name || "Unnamed product"}</h3>
              <p className={styles.productCategory}>
                {product.brandName || "Unknown brand"} -{" "}
                {product.categoryName || "No category"}
              </p>
              <p className={styles.productPrice}>
                {product.price ? product.price.toFixed(2) : "N/A"} $
              </p>
              <button
                className={styles.addToCartBtn}
                onClick={() => handleAddToCart(product)}
              >
                Thêm vào giỏ hàng
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchResults;
