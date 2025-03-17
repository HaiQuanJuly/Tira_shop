// <<<<<<< Updated upstream
import { useState } from "react";
// =======
import React, { useState, useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";
// >>>>>>> Stashed changes
import { FaTimes, FaPaperPlane, FaRegCommentDots } from "react-icons/fa";
import styles from "./chatbot.module.scss";


const API_URL = "https://4cd6-27-72-100-51.ngrok-free.app"; // Cập nhật API của bạn

const ChatBox = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    const updatedMessages = [
      { role: "system", content: "Bạn là trợ lý ảo của Tira Shop. Hãy giúp khách hàng tìm sản phẩm hoặc tư vấn." },
      ...messages,
      userMessage,
    ];

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ messages: updatedMessages }),
      });
      const data = await response.json();
      const botMessage = { role: "assistant", content: data || "Xin lỗi, tôi không hiểu." };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Lỗi API:", error);
      setMessages((prev) => [...prev, { role: "assistant", content: "Lỗi kết nối. Vui lòng thử lại sau!" }]);
    }
  };

  return (
// <<<<<<< Updated upstream
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
=======
    <div className={styles.chatContainer}>
      {isOpen && (
        <div className={styles.chatBox}>
          <div className={styles.chatHeader}>
            <div></div>
            <h3>Tira-AI</h3>
            <button onClick={() => setIsOpen(false)} className={styles.closeButton}>
              <FaTimes />
            </button>
          </div>

          <div className={styles.chatMessages}>
            {messages.length === 0 ? (
              <p className={styles.placeholderText}>Hello! Type your message...</p>
            ) : (
              messages.map((msg, index) => (
                <div
                  style={{
                    display: "flex",
                    justifyContent: msg.role === "user" ? "flex-end" : "flex-start",
                  }}
                >
                  <div key={index} className={msg.role === "user" ? styles.userMessage : styles.assistantMessage}>
                    <span>
                      <ReactMarkdown>{msg.content}</ReactMarkdown>
                    </span>
                  </div>
                </div>
              ))
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className={styles.inputContainer}>
            <input
              type="text"
              placeholder="Type a message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className={styles.inputField}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />
            <button onClick={sendMessage} className={styles.sendButton}>
              <FaPaperPlane />
            </button>
          </div>
>>>>>>> Stashed changes
        </div>
      )}
      <button onClick={() => setIsOpen(!isOpen)} className={styles.toggleButton}>
        <FaRegCommentDots />
      </button>
    </div>
  );
};

export default ChatBox;
