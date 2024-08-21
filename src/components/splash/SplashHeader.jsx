"use client";
import { useEffect, useRef } from "react";
import HeaderBrand from "../header/elements/HeaderBrand";
import HeaderTopNotify from "../header/elements/HeaderTopNotify";
import Link from "next/link";
import { HeaderMenu } from "@/data/Menu";

const SplashHeader = () => {
  const axilPlaceholder = useRef();
  const axilMainmenu = useRef();

  useEffect(() => {
    const mainMenu = axilMainmenu.current;
    const mainMenuHeight = axilMainmenu.current.clientHeight;
    const mainmenuPlaceholder = axilPlaceholder.current;
    window.addEventListener("scroll", (event) => {
      if (window.scrollY > 40) {
        mainmenuPlaceholder.style.height = mainMenuHeight + "px";
        mainMenu.classList.add("axil-sticky");
      } else {
        mainmenuPlaceholder.style.height = "0";
        mainMenu.classList.remove("axil-sticky");
      }
    });
  }, []);

  return (
    <header className="header axil-header header-style-3">
      <HeaderTopNotify bgImage="/images/others/campaign-bg2.png">
        <p>
          Introductory Offer Get Upto 50% Off <Link href="/shop">Buy Now</Link>
        </p>
      </HeaderTopNotify>
      <div id="axil-sticky-placeholder" ref={axilPlaceholder} />
      <div className="axil-mainmenu" ref={axilMainmenu}>
        <div className="container">
          <div className="header-navbar">
            <HeaderBrand />
            <div className="header-main-nav">
              <nav className="mainmenu-nav">
                <ul className="mainmenu">
                  {HeaderMenu.map((menuItem, index) =>
                    menuItem.hasChildren == true ? (
                      <li className="menu-item-has-children" key={index}>
                        <Link className="submenu-link" href={menuItem.url}>
                          {menuItem.name}
                        </Link>
                        <ul className="axil-submenu">
                          {menuItem.children.map((submenu, index) => (
                            <li key={index}>
                              <Link
                                onClick={() => mobileMneuHandler(false)}
                                href={submenu.url}
                              >
                                {submenu.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </li>
                    ) : (
                      <li key={index}>
                        <Link href={menuItem.url}>{menuItem.name}</Link>
                      </li>
                    )
                  )}
                 
                </ul>
              </nav>
              {/* End Mainmanu Nav */}
            </div>
            <div className="header-action">
              {/* <div className="header-btn">
                <Link href="/dashboard" className="axil-btn btn-bg-primary">
                  <i className="fas fa-th-large" /> Dashboard
                </Link>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default SplashHeader;
