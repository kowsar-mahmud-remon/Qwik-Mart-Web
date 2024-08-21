import Link from "next/link";

const SplashFooter = () => {
  return (
    <footer className="axil-footer-area footer-style-2 pv-footer-area">
      <div className="copyright-area copyright-default">
        <div className="container">
          <div className="copyright-left d-flex flex-wrap justify-content-center">
            <ul className="quick-link">
              <li>
                © {new Date().getFullYear()}. All rights reserved by{" "}
                <Link target="_blank" href="https://qwikit.ca/" className="text-success">
                  Qwik IT
                </Link>
                .
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default SplashFooter;
