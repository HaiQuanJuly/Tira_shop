import { useState, useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";
import { FaTimes, FaPaperPlane, FaRegCommentDots } from "react-icons/fa";
import styles from "./chatbot.module.scss";

const API_URL = "https://4e19-202-93-156-66.ngrok-free.app/"; // Cập nhật API của bạn

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
      {
        role: "system",
        content:
          "Bạn là trợ lý ảo của Tira Shop. Hãy giúp khách hàng tìm sản phẩm hoặc tư vấn.",
      },
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
      const botMessage = {
        role: "assistant",
        content: data || "Xin lỗi, tôi không hiểu.",
      };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Lỗi API:", error);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Lỗi kết nối. Vui lòng thử lại sau!" },
      ]);
    }
  };

  return (
    <div className={styles.chatContainer}>
      {isOpen && (
        <div className={styles.chatBox}>
          <div className={styles.chatHeader}>
            <div></div>
            <h3>Tira-AI</h3>
            <button
              onClick={() => setIsOpen(false)}
              className={styles.closeButton}
            >
              <FaTimes />
            </button>
          </div>

          <div className={styles.chatMessages}>
            {messages.length === 0 ? (
              <p className={styles.placeholderText}>
                Hello! Type your message...
              </p>
            ) : (
              messages.map((msg, index) => (
                <div
                  style={{
                    display: "flex",
                    justifyContent:
                      msg.role === "user" ? "flex-end" : "flex-start",
                  }}
                >
                  <div
                    key={index}
                    className={
                      msg.role === "user"
                        ? styles.userMessage
                        : styles.assistantMessage
                    }
                  >
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
        </div>
      )}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={styles.toggleButton}
      >
        <FaRegCommentDots />
      </button>
    </div>
  );
};

export default ChatBox;
