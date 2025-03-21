import React, { useState } from "react";
import styles from "./styles.module.scss";

const TryOn = ({ isOpen, onClose }) => {
  const [prompt, setPrompt] = useState("");
  const [generatingCount, setGeneratingCount] = useState(4);

  if (!isOpen) return null;

  return (
    <div className={styles.tryOnOverlay}>
      <div className={styles.tryOnContainer}>
        <div className={styles.header}>
          <div className={styles.leftSection}>
            <h2>AI Images</h2>
          </div>
        </div>

        <div className={styles.tabs}>
          <div className={styles.tabActive}>
            Text to Image <span className={styles.newBadge}>NEW</span>
          </div>
          <div className={styles.tab}>AI Virtual Try-On</div>
          <div className={styles.assetsButton}>Assets</div>
        </div>

        <div className={styles.mainContent}>
          <div className={styles.sidebar}>
            <div className={styles.promptSection}>
              <div className={styles.promptHeader}>
                <div className={styles.promptIcon}>✨</div>
                <div>Prompt</div>
                <div className={styles.deepSeek}>DeepSeek</div>
              </div>
              <textarea
                className={styles.promptInput}
                placeholder="Please describe your creative ideas for the image, or view Help Center for a quick start."
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
              ></textarea>
              <div className={styles.hintSection}>
                <span>Hints:</span>
                <button className={styles.hintButton}>Fisheye Shiba Inu</button>
                <button className={styles.hintButton}>
                  Future architecture
                </button>
                <button className={styles.refreshButton}>↻</button>
              </div>
            </div>

            <div className={styles.referenceSection}>
              <div className={styles.referenceHeader}>
                <div className={styles.uploadIcon}>📁</div>
                <div>Upload a Reference</div>
                <div className={styles.optional}>(Optional)</div>
                <div className={styles.demoButton}>Demo</div>
              </div>
              <div className={styles.referenceNote}>
                Higher Face Reference means more reference to the face of the
                subject
              </div>
              <div className={styles.uploadBox}>
                <div className={styles.uploadIcon}>↑</div>
                <div>Click / Drop / Paste</div>
                <div className={styles.uploadFrom}>
                  Select from{" "}
                  <span className={styles.historyLink}>History</span>
                </div>
                <div className={styles.supportText}>Support JPG/PNG Files</div>
              </div>
            </div>

            <div className={styles.settingsSection}>
              <div className={styles.settingsHeader}>
                <div className={styles.settingsIcon}>⚙️</div>
                <div>Settings</div>
              </div>
              <div className={styles.aspectRatio}>
                <div>Aspect Ratio:</div>
                <div className={styles.ratioOptions}>
                  <button className={styles.ratioOption}>1:1</button>
                  <button className={styles.ratioOption}>16:9</button>
                  <button className={styles.ratioOption}>4:3</button>
                  <button className={styles.ratioOption}>3:2</button>
                  <button className={styles.ratioOption}>2:3</button>
                  <button className={styles.ratioOption}>3:4</button>
                  <button className={styles.ratioOption}>9:16</button>
                  <button className={styles.ratioOption}>21:9</button>
                </div>
              </div>
              <div className={styles.generatingCount}>
                <div>Generating Count: {generatingCount}</div>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={generatingCount}
                  onChange={(e) => setGeneratingCount(e.target.value)}
                  className={styles.countSlider}
                />
              </div>
              <button className={styles.generateButton}>Generate</button>
            </div>
          </div>

          <div className={styles.previewArea}>
            <div className={styles.emptyState}>
              <div className={styles.emptyIcon}>🖼️</div>
              <div className={styles.emptyText}>
                Release your creative potential. Experience the magic of KLING
                AI.
              </div>
            </div>
          </div>
        </div>

        <div className={styles.footer}>
          <div className={styles.disclaimer}>
            The generated contents do not represent the views, positions or
            attitudes of KLING AI. Please use them responsibly and kindly.
          </div>
        </div>

        <button className={styles.closeButton} onClick={onClose}>
          ✖
        </button>
      </div>
    </div>
  );
};

export default TryOn;
