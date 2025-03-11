import { useRef } from "react";
import styles from "./styles.module.scss";
import voiceIcon from "../../assets/icons/images/voice.png";
import imageSearchIcon from "../../assets/icons/images/imageSearch.png";

const Search = ({ isSearchOpen, setIsSearchOpen }) => {
  const fileInputRef = useRef(null);

  // Xử lý voice search
  const handleVoiceSearch = () => {
    alert("Voice search activated!");
  };

  // Xử lý chọn ảnh
  const handleImageSearch = () => {
    fileInputRef.current.click(); // Mở thư mục chọn ảnh
  };

  // Xử lý file ảnh
  const handleFileChange = (event) => {
    if (event.target.files.length > 0) {
      alert(`Bạn đã chọn ảnh: ${event.target.files[0].name}`);
    }
  };

  if (!isSearchOpen) return null;

  return (
    <div className={styles.searchBar}>
      <input type="text" placeholder="What are you looking for?" className={styles.searchInput} />

      <div className={styles.searchIcons}>
        {/* Voice Search */}
        <button className={styles.iconButton} onClick={handleVoiceSearch}>
          <img src={voiceIcon} alt="Voice Search" width="22" height="22" />
        </button>

        {/* Image Search */}
        <button className={styles.iconButton} onClick={handleImageSearch}>
          <img src={imageSearchIcon} alt="Image Search" width="22" height="22" />
        </button>

        {/* Hidden input for image upload */}
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          className={styles.hiddenFileInput}
          onChange={handleFileChange}
        />

        {/* Close Button */}
        <button className={styles.closeSearch} onClick={() => setIsSearchOpen(false)}>✖</button>
      </div>
    </div>
  );
};

export default Search;
