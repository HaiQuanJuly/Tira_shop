import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import ReactMarkdown from "react-markdown";
import { FaTimes, FaPaperPlane, FaRegCommentDots } from "react-icons/fa";
import styles from "./chatbot.module.scss";
import { useAppContext } from "../../context/AppContext"; // Import AppContext

<<<<<<< HEAD
const API_URL = "https://4e19-202-93-156-66.ngrok-free.app/"; // Cập nhật API của bạn
=======
const API_URL = "https://4e19-202-93-156-66.ngrok-free.app"; // Cập nhật API của bạn
>>>>>>> 0d2fb6e7341ccd1c6f1da5ce514d34d42a9c9072

const ChatBox = () => {
  const { isAuthenticated } = useAppContext(); // Lấy trạng thái đăng nhập
  const navigate = useNavigate(); // Thêm useNavigate
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleLinkClick = (productId) => {
    if (!isAuthenticated) {
      navigate("/auth");
      return;
    }
    navigate(`/product/${productId}`);
  };

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    const updatedMessages = [
      {
        role: "system",
        content:
          "You are a virtual assistant of Tira Shop. Help customers find products or give advice.",
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

      let botMessage;
      if (!isAuthenticated) {
        botMessage = {
          role: "assistant",
          content:
            "Please log in to view product details. You can log in [here](/auth).",
        };
      } else {
        // Thay thế các liên kết bằng văn bản có thể nhấp
        const contentWithLinks = data.replace(
          /http:\/\/localhost:5173\/product\/(\d+)/g,
          (match, productId) => {
            return `[View Product ${productId}](#product-${productId})`;
          }
        );
        botMessage = {
          role: "assistant",
          content: contentWithLinks,
        };
      }
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Lỗi API:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Connection error. Please try again later!",
        },
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
                      <ReactMarkdown
                        components={{
                          a: ({ href, children }) => {
                            if (href.startsWith("#product-")) {
                              const productId = href.replace("#product-", "");
                              return (
                                <a
                                  href="#"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    handleLinkClick(productId);
                                  }}
                                >
                                  {children}
                                </a>
                              );
                            }
                            return <a href={href}>{children}</a>;
                          },
                        }}
                      >
                        {msg.content}
                      </ReactMarkdown>
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
