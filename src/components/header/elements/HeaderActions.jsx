import Link from "next/link";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import ProductSearchModal from "@/components/header/elements/ProductSearchModal";
import MiniCart from "@/components/header/elements/MiniCart";
import { miniCartHandler } from "@/store/slices/productSlice";
import { mobileMenu } from "@/store/slices/menuSlice";
import { UserAuth } from "@/context/AuthContext";

const HeaderActions = (props) => {
  const { user, logoutUser } = UserAuth();

  const [searchToggle, setSearchToggle] = useState(false);
  const [accountDropdown, setaccountDropdown] = useState(false);

  const dispatch = useDispatch();
  const getProducts = useSelector((state) => state.productData);
  // console.log(getProducts.wishlistItems.length);

  const searchBoxToggleHandler = () => {
    setSearchToggle((toggler) => !toggler);
  };

  const accountDropdownToggler = () => {
    setaccountDropdown((toggler) => !toggler);
  };

  const cartHandler = (data) => {
    dispatch(miniCartHandler(data));
  };

  const mobileMenuHandler = (data) => {
    dispatch(mobileMenuHandler(data));
  };

  return (
    <div className="header-action">
      <ul className="action-list">
        {props.searchBox && (
          <li className="axil-search" onClick={searchBoxToggleHandler}>
            <input
              type="search"
              className="placeholder product-search-input"
              name="search2"
              placeholder="What are you looking for?"
              autoComplete="off"
            />
            <button type="submit" className="icon wooc-btn-search">
              <i className="far fa-search" />
            </button>
          </li>
        )}
        {props.searchIcon && (
          <li className="axil-search axil-search-icon">
            <button
              className="header-search-icon"
              onClick={searchBoxToggleHandler}
            >
              <i className="far fa-search" />
            </button>
          </li>
        )}

        <li className="wishlist">
          <Link href="/wishlist">
            {getProducts.wishlistItems.length > 0 && (
              <span className="cart-count">
                {getProducts.wishlistItems.length}
              </span>
            )}
            <i className="far fa-heart" />
          </Link>
        </li>
        <li className="shopping-cart">
          <button
            className="cart-dropdown-btn"
            onClick={() => cartHandler(true)}
          >
            <span className="cart-count">{getProducts.cartItems.length}</span>
            <i className="far fa-shopping-cart" />
          </button>
        </li>
        <li className="my-account">
          <button onClick={accountDropdownToggler}>
            <i className="far fa-user" />
          </button>
          <div
            className={`my-account-dropdown ${accountDropdown ? "open" : ""}`}
          >
            <span className="title">QUICKLINKS</span>
            <ul>
              <li>
                <Link href="/dashboard">My Account</Link>
              </li>
              <li>
                <Link href="dashboard/orders">Orders</Link>
              </li>
              <li>
                <Link href="dashboard/account-details">Settings</Link>
              </li>
            </ul>
            {user?.userEmail || user?.email ? (
              <div className="login-btn">
                <button
                  onClick={logoutUser}
                  className="axil-btn btn-bg-primary"
                >
                  Logout
                </button>
              </div>
            ) : (
              <>
                <div className="login-btn">
                  <Link href="/sign-in" className="axil-btn btn-bg-primary">
                    Login
                  </Link>
                </div>
                <div className="reg-footer text-center">
                  No account yet?
                  <Link href="/sign-up" className="btn-link">
                    REGISTER HERE.
                  </Link>
                </div>
              </>
            )}
          </div>
        </li>
        <li className="axil-mobile-toggle">
          <button
            className="menu-btn mobile-nav-toggler"
            onClick={() => mobileMenuHandler(true)}
          >
            <i className="fal fa-bars"></i>
          </button>
        </li>
      </ul>
      <MiniCart />
      {(props.searchIcon || props.searchBox) && (
        <ProductSearchModal
          toggleHandler={searchBoxToggleHandler}
          toggler={searchToggle}
        />
      )}
    </div>
  );
};

export default HeaderActions;
