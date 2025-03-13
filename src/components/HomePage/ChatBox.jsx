import { useState } from "react";
import { FaTimes, FaPaperPlane, FaRegCommentDots } from "react-icons/fa";

function ChatBox() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");

  return (
    <div
      style={{ position: "fixed", bottom: "20px", right: "20px", zIndex: 1000 }}
    >
      {/* Hộp thoại chat */}
      <div
        style={{
          width: "320px",
          height: isOpen ? "400px" : "0px",
          background: "linear-gradient(135deg, #ff7f7f, #ffe6e6)",
          boxShadow: isOpen ? "0 4px 10px rgba(0, 0, 0, 0.2)" : "none",
          borderRadius: "12px",
          padding: isOpen ? "15px" : "0px",
          display: isOpen ? "flex" : "none",
          flexDirection: "column",
          transition: "height 0.3s ease-in-out",
          position: "absolute",
          right: "0px",
          bottom: "60px",
        }}
      >
        {/* Header Chatbox */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderBottom: "1px solid rgba(255, 255, 255, 0.5)",
            paddingBottom: "8px",
          }}
        >
          <h3
            style={{
              margin: 0,
              color: "#fff",
              fontSize: "18px",
              fontWeight: "bold",
            }}
          >
            Chatbox
          </h3>
          <button
            onClick={() => setIsOpen(false)}
            style={{
              cursor: "pointer",
              background: "none",
              border: "none",
              fontSize: "18px",
              color: "#fff",
            }}
          >
            <FaTimes />
          </button>
        </div>

        {/* Nội dung tin nhắn */}
        <div style={{ flex: 1, overflowY: "auto", padding: "10px" }}>
          <p style={{ fontSize: "14px", color: "#fff", fontStyle: "italic" }}>
            Hello! Type your message...
          </p>
        </div>

        {/* Ô nhập tin nhắn */}
        <div
          style={{ display: "flex", alignItems: "center", marginTop: "5px" }}
        >
          <input
            type="text"
            placeholder="Type a message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            style={{
              flex: 1,
              padding: "10px",
              borderRadius: "20px",
              border: "1px solid rgba(255, 255, 255, 0.8)",
              outline: "none",
              background: "rgba(255, 255, 255, 0.9)",
              fontSize: "14px",
            }}
          />
          <button
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              marginLeft: "8px",
              color: "#ff3b30",
              fontSize: "20px",
              transition: "color 0.3s ease-in-out",
            }}
            onMouseOver={(e) => (e.target.style.color = "#d32f2f")}
            onMouseOut={(e) => (e.target.style.color = "#ff3b30")}
          >
            <FaPaperPlane />
          </button>
        </div>
      </div>

      {/* Nút mở chatbox */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          width: "60px",
          height: "60px",
          borderRadius: "50%",
          backgroundColor: "white",
          color: "red",
          border: "2px solid red",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
          fontSize: "20px",
          position: "absolute",
          right: "0px",
          bottom: "0px",
          transition: "transform 0.3s ease-in-out",
        }}
        onMouseOver={(e) => (e.target.style.transform = "scale(1.1)")}
        onMouseOut={(e) => (e.target.style.transform = "scale(1)")}
      >
        <FaRegCommentDots />
      </button>
    </div>
  );
}

export default ChatBox;
