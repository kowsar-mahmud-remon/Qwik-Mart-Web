import Image from "next/image";
import Link from "next/link";
import { ScocialLink, Logo } from "@/data/Common";
import { FooterData } from "@/data/Footer";

const FooterOne = (props) => {
  return (
    <footer
      className={`axil-footer-area footer-style-1 ${
        props.dark ? "footer-dark" : "bg-color-white"
      }`}
    >
      <div className="footer-top">
        <div className="container">
          <div className="row">
            <div className="col-md-3 col-sm-12">
              <div className="axil-footer-widget">
                <div className="mb--30">
                  
                  <div className="pb-3 d-flex justify-content-center  ">
                  <Link href="/">
                    <Image
                      className="light-logo"
                      src={props.dark ? Logo.light : Logo.dark}
                      width={100}
                      height={50}
                      alt="Logo"
                    />
                  </Link>
                  </div>
                </div>
                <div className="inner">
                  <p
                    dangerouslySetInnerHTML={{
                      __html: FooterData.footerInfo.address,
                    }}
                  ></p>
                  <div className="social-share">
                    <Link href={ScocialLink.facebook.url}>
                      <i className={ScocialLink.facebook.icon} />
                    </Link>
                    <Link href={ScocialLink.instagram.url}>
                      <i className={ScocialLink.instagram.icon} />
                    </Link>
                    <Link href={ScocialLink.twitter.url}>
                      <i className={ScocialLink.twitter.icon} />
                    </Link>
                    <Link href={ScocialLink.linkedin.url}>
                      <i className={ScocialLink.linkedin.icon} />
                    </Link>
                    <Link href={ScocialLink.discord.url}>
                      <i className={ScocialLink.discord.icon} />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            {FooterData.footerLink.slice(0, 3).map((items, index) => (
              <div className="col-md-3 col-sm-4" key={index}>
                <div className="axil-footer-widget">
                  <h5 className="widget-title">{items.label}</h5>
                  <div className="inner">
                    <ul>
                      {items.linkList.map((link, index) => (
                        <li key={index}>
                          <Link href={link.url}>{link.name}</Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="copyright-area copyright-default separator-top">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-xl-7 col-lg-12">
              <div className="copyright-left d-flex flex-wrap justify-content-xl-start justify-content-center">
                <ul className="quick-link">
                  <li>
                    <Link href="/privacy-policy">Privacy Policy</Link>
                  </li>
                  <li>
                    <Link href="/terms-of-use">Terms of Service</Link>
                  </li>
                </ul>
                <ul className="quick-link">
                  <li>
                    © {new Date().getFullYear()}. All rights reserved by{" "}
                    <Link target="_blank" href="https://qwikit.ca/">
                      Qwik IT
                    </Link>
                    .
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-xl-5 col-lg-12">
              <div className="copyright-right d-flex flex-wrap justify-content-xl-end justify-content-center align-items-center">
                <span className="card-text">Accept For</span>
                <ul className="payment-icons-bottom quick-link">
                  <li>
                    <Image
                      src="/images/icons/cart/cart-1.png"
                      alt="paypal cart"
                      width={20}
                      height={23}
                    />
                  </li>
                  <li>
                    <Image
                      src="/images/icons/cart/cart-2.png"
                      alt="paypal cart"
                      width={37}
                      height={23}
                    />
                  </li>
                  <li>
                    <Image
                      src="/images/icons/cart/cart-3.png"
                      alt="paypal cart"
                      width={58}
                      height={23}
                    />
                  </li>
                  <li>
                    <Image
                      src="/images/icons/cart/cart-4.png"
                      alt="paypal cart"
                      width={50}
                      height={23}
                    />
                  </li>
                  <li>
                    <Image
                      src="/images/icons/cart/cart-5.png"
                      alt="paypal cart"
                      width={50}
                      height={23}
                    />
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterOne;
