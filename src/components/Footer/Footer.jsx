import styles from "./styles.module.scss";

function MyFooter() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContainer}>
        {/* Cột 1 */}
        <div className={styles.footerColumn}>
          <h2>MAY WE HELP YOU?</h2>
          <ul>
            <li>
              <a href="#">Contact Us</a>
            </li>
            <li>
              <a href="#">My Order</a>
            </li>
            <li>
              <a href="#">FAQs</a>
            </li>
            <li>
              <a href="#">Email Unsubscribe</a>
            </li>
            <li>
              <a href="#">Sitemap</a>
            </li>
          </ul>
        </div>

        {/* Cột 2 */}
        <div className={styles.footerColumn}>
          <h2>THE COMPANY</h2>
          <ul>
            <li>
              <a href="#">About Gucci</a>
            </li>
            <li>
              <a href="#">Gucci Equilibrium</a>
            </li>
            <li>
              <a href="#">Code of Ethics</a>
            </li>
            <li>
              <a href="#">Careers</a>
            </li>
            <li>
              <a href="#">Legal</a>
            </li>
            <li>
              <a href="#">Privacy & Cookie Policy</a>
            </li>
            <li>
              <a href="#">Cookie Settings</a>
            </li>
            <li>
              <a href="#">Corporate Information</a>
            </li>
          </ul>
        </div>

        {/* Cột 3 */}
        <div className={styles.footerColumn}>
          <h2>STORE LOCATOR</h2>
          <p>Country/Region, City</p>
          <h2>SIGN UP FOR GUCCI UPDATES</h2>
          <p>
            By entering your email address below, you consent to receiving our
            newsletter with access to our latest collections, events and
            initiatives. More details on this are provided in our{" "}
            <a href="#">Privacy Policy</a>.
          </p>
          <input type="email" placeholder="Email" />
          <h2>COUNTRY/REGION</h2>
          <p className={styles.boldText}>UNITED STATES</p>
        </div>
      </div>
    </footer>
  );
}

export default MyFooter;
