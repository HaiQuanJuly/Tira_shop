import PropTypes from "prop-types";
import styles from "../../components/Layout/styles.module.scss";

function MainLayout({ children }) {
  const { wrapLayout, container } = styles;
  return (
    <main className={wrapLayout}>
      <div className={container}>{children}</div>
    </main>
  );
}
MainLayout.propTypes = {
  children: PropTypes.node.isRequired, // Đảm bảo `children` được cung cấp
};
export default MainLayout;
