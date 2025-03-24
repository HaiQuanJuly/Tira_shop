import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import styles from "./styles.module.scss";
import voiceIcon from "../../assets/icons/images/voice.png";
import imageSearchIcon from "../../assets/icons/images/imageSearch.png";

const Search = ({ isSearchOpen, setIsSearchOpen }) => {
  const fileInputRef = useRef(null);
  const navigate = useNavigate();
  const [isListening, setIsListening] = useState(false);

  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = SpeechRecognition ? new SpeechRecognition() : null;

  const handleVoiceSearch = () => {
    if (!SpeechRecognition) {
      toast.error(
        "Trình duyệt của bạn không hỗ trợ tính năng nhận diện giọng nói. Vui lòng sử dụng Chrome hoặc Edge."
      );
      return;
    }

    recognition.lang = "vi-VN";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    setIsListening(true);
    recognition.start();

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setIsListening(false);
      toast.info(`Bạn đã nói: "${transcript}"`);
      searchProducts(transcript);
    };

    recognition.onerror = (event) => {
      setIsListening(false);
      toast.error(`Lỗi khi nhận diện giọng nói: ${event.error}`);
    };

    recognition.onend = () => {
      setIsListening(false);
    };
  };

  const searchProducts = async (query) => {
    try {
      // Kiểm tra query không rỗng
      if (!query || query.trim() === "") {
        toast.error("Vui lòng cung cấp từ khóa tìm kiếm.");
        return;
      }

      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Vui lòng đăng nhập để tìm kiếm sản phẩm");
        navigate("/auth");
        return;
      }

      const formData = new FormData();
      formData.append("file", query);

      const response = await fetch(
        "http://localhost:8080/tirashop/product/search?page=0&size=10",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
          body: formData,
        }
      );

      const data = await response.json();
      if (response.ok && data.status === "success") {
        const products = data.data.elementList || [];
        if (products.length === 0) {
          toast.info("Không tìm thấy sản phẩm nào phù hợp.");
          navigate("/category/all", { state: { searchResults: [], query } });
        } else if (products.length === 1) {
          // Nếu chỉ tìm thấy 1 sản phẩm, điều hướng trực tiếp đến ProductDetail
          navigate(`/product/${products[0].id}`, {
            state: { product: products[0] },
          });
        } else {
          // Nếu tìm thấy nhiều sản phẩm, điều hướng đến CategoryPage
          navigate("/category/all", {
            state: { searchResults: products, query },
          });
        }
      } else {
        console.log("Error response:", data); // In thông báo lỗi từ backend
        toast.error(
          data.message || "Không thể tìm kiếm sản phẩm. Vui lòng thử lại."
        );
      }
    } catch (err) {
      toast.error(`Lỗi khi tìm kiếm: ${err.message}`);
    }
  };

  const handleImageSearch = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    if (event.target.files.length > 0) {
      alert(`Bạn đã chọn ảnh: ${event.target.files[0].name}`);
    }
  };

  if (!isSearchOpen) return null;

  return (
    <div className={styles.searchBar}>
      <input
        type="text"
        placeholder="What are you looking for?"
        className={styles.searchInput}
      />

      <div className={styles.searchIcons}>
        <button
          className={styles.iconButton}
          onClick={handleVoiceSearch}
          disabled={isListening}
        >
          <img src={voiceIcon} alt="Voice Search" width="22" height="22" />
          {isListening && <span>Đang nghe...</span>}
        </button>

        <button className={styles.iconButton} onClick={handleImageSearch}>
          <img
            src={imageSearchIcon}
            alt="Image Search"
            width="22"
            height="22"
          />
        </button>

        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          className={styles.hiddenFileInput}
          onChange={handleFileChange}
        />

        <button
          className={styles.closeSearch}
          onClick={() => setIsSearchOpen(false)}
        >
          ✖
        </button>
      </div>
    </div>
  );
};

export default Search;
