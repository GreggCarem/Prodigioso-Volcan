import "../style/footer.scss";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-links">
        <a
          href="https://www.instagram.com/gregg.rott/"
          target="_blank"
          rel="linked"
        >
          <i className="fa-brands fa-instagram footer-link-single"></i>
        </a>

        <a
          href="https://es.linkedin.com/in/gregoirecareme"
          target="_blank"
          rel="linked"
        >
          <i className="fa-brands fa-linkedin footer-link-single"></i>
        </a>

        <a href="https://github.com/GreggCarem" target="_blank" rel="linked">
          <i className="fa-brands fa-github footer-link-single"></i>
        </a>

        <a href="mailto:gregor.ten1@gmail.com">
          <i className="fa-solid fa-envelope footer-link-single"></i>
        </a>
      </div>
      <p className="footer-credit">
        © {new Date().getFullYear()} Gregoire Careme. All rights reserved.
      </p>
    </footer>
  );
}
