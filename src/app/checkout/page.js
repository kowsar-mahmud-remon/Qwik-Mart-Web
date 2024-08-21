"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import Section from "@/components/elements/Section";
import FooterTwo from "@/components/footer/FooterTwo";
import HeaderFive from "@/components/header/HeaderFive";
import ServiceTwo from "@/components/services/ServiceTwo";
import { calculateTotalAmount, calculateTotalQuantity } from "@/utils";
import Swal from "sweetalert2";
import { UserAuth } from "@/context/AuthContext";

const Checkout = () => {
  const router = useRouter();
  const cartProducts = useSelector((state) => state.productData);

  const items = cartProducts.cartItems;
  const totalAmount = calculateTotalAmount(cartProducts.cartItems);
  const totalQuantity = calculateTotalQuantity(cartProducts.cartItems);

  //   console.log(items, totalAmount, totalQuantity);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { Token , user } = UserAuth();
  // console.log(user.uid);
  const [selectedShippingMethod, setSelectedShippingMethod] = useState("free");
  const checkoutFormHandler = (data) => {
    // router.push('checkout/order-received');
    let shippingCost = 0;
    if (selectedShippingMethod === "local") {
      shippingCost = 15;
    } else if (selectedShippingMethod === "flat") {
      shippingCost = 20;
    }

    const parsedTotalAmount = parseFloat(totalAmount);
    const parsedShippingCost = parseFloat(shippingCost);

    const grandTotal = (parsedTotalAmount + parsedShippingCost).toFixed(2);

    const orderDetails = {
      userid: user.uid,
      username: data.firstName + data.lastName,
      address: {
        street1: data.street1,
        street2: data.street2,
        city: data.city,
      },
      phone: data.phone,
      email: user.email,
      paymenttype: data.paymentMethod,
      deliverytype: selectedShippingMethod,
      productlist: items,
      totalamount: grandTotal,
      orderedAt: new Date().toLocaleString(),
    };
      // console.log(orderDetails);
    // const Token = "2765a05e87f2b4b07976cf55ce27073e29b9dd54";

    const requestOptions5 = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Token ${Token}`,
      },
      body: JSON.stringify(orderDetails),
    };

    fetch("https://qwikmart.pythonanywhere.com/orders/new", requestOptions5)
      .then((response) => response.json())
      .then((data) => {
        // console.log(data);
        if (data) {
          localStorage.removeItem("cartItems");
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Your Order is Successfull!!",
            showConfirmButton: false,
            timer: 1500,
          });
          router.push("checkout/order-received");
        }
      })
      .catch((error) => {
        console.error(error);
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Somethings is wrong!!",
          showConfirmButton: false,
          timer: 1500,
        });
      });
    //   dispatch(addToOrder(orderDetails));
  };

  return (
    <>
      <HeaderFive headerSlider />
      <main className="main-wrapper">
        <Section pClass="axil-checkout-area">
          {cartProducts.cartItems.length > 0 ? (
            <form onSubmit={handleSubmit(checkoutFormHandler)}>
              <div className="row">
                <div className="col-lg-6">
                  <div className="axil-checkout-billing">
                    <h4 className="title mb--40">Billing details</h4>
                    <div className="row">
                      <div className="col-lg-6">
                        <div className="form-group">
                          <label>
                            First Name <span>*</span>
                          </label>
                          <input
                            type="text"
                            {...register("firstName", { required: true })}
                            placeholder="Adam"
                          />
                          {errors.firstName && (
                            <p className="error">First Name is required.</p>
                          )}
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div className="form-group">
                          <label>
                            Last Name <span>*</span>
                          </label>
                          <input
                            type="text"
                            {...register("lastName", { required: true })}
                            placeholder="John"
                          />
                          {errors.lastName && (
                            <p className="error">Last Name is required.</p>
                          )}
                        </div>
                      </div>

                      <div className="col-lg-12">
                        <div className="form-group">
                          <label>
                            Street Address <span>*</span>
                          </label>
                          <input
                            type="text"
                            {...register("street1", { required: true })}
                            placeholder="House number and street name"
                          />
                          {errors.street1 && (
                            <p className="error">Street Address is required.</p>
                          )}
                        </div>
                      </div>
                      <div className="col-lg-12">
                        <div className="form-group">
                          <label>Street Address</label>
                          <input
                            type="text"
                            {...register("street2")}
                            placeholder="Apartment, suite, unit, etc. (optonal)"
                          />
                        </div>
                      </div>
                      <div className="col-lg-12">
                        <div className="form-group">
                          <label>
                            Town/ City <span>*</span>
                          </label>
                          <input
                            type="text"
                            {...register("city", { required: true })}
                          />
                          {errors.city && (
                            <p className="error">Town/ City is required.</p>
                          )}
                        </div>
                      </div>
                      <div className="col-lg-12">
                        <div className="form-group">
                          <label>
                            Phone <span>*</span>
                          </label>
                          <input
                            type="number"
                            {...register("phone", {
                              required: true,
                              maxLength: 11,
                            })}
                          />
                          {errors.phone && (
                            <p className="error">
                              Please enter 11 digit phone number.
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="col-lg-12">
                        <div className="form-group">
                          <label>
                            Email Address <span>*</span>
                          </label>
                          <input
                            defaultValue={user?.email}
                            disabled
                            type="email"
                            {...register("email", {})}
                          />
                          {errors.email && (
                            <p className="error">Email is required.</p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="axil-order-summery order-checkout-summery">
                    <h5 className="title mb--20">Your Order</h5>
                    <div className="summery-table-wrap">
                      <table className="table summery-table">
                        <thead>
                          <tr>
                            <th>Product</th>
                            <th>Subtotal</th>
                          </tr>
                        </thead>
                        <tbody>
                          {cartProducts.cartItems.map((items, index) => (
                            <tr className="order-product" key={index}>
                              <td>
                                {items.title}{" "}
                                <span className="quantity">
                                  x{items.cartQuantity}
                                </span>
                              </td>
                              <td>
                                $
                                {items.salePrice
                                  ? items.salePrice
                                  : items.price}
                              </td>
                            </tr>
                          ))}
                          <tr className="order-subtotal">
                            <td>Subtotal</td>
                            <td>
                              ${calculateTotalAmount(cartProducts.cartItems)}
                            </td>
                          </tr>
                          <tr className="order-shipping">
                            <td colSpan={2}>
                              <div className="shipping-amount">
                                <span className="title">Shipping Method</span>
                                <span className="amount">
                                  {selectedShippingMethod === "free"
                                    ? "Free"
                                    : selectedShippingMethod === "local"
                                    ? "$15.00"
                                    : selectedShippingMethod === "flat"
                                    ? "$20.00"
                                    : ""}
                                </span>
                              </div>
                              <div className="input-group">
                                <input
                                  type="radio"
                                  id="radio1"
                                  name="shipping"
                                  defaultChecked
                                  onClick={() =>
                                    setSelectedShippingMethod("free")
                                  }
                                />
                                <label htmlFor="radio1">Free Shippping</label>
                              </div>
                              <div className="input-group">
                                <input
                                  type="radio"
                                  id="radio2"
                                  name="shipping"
                                  onClick={() =>
                                    setSelectedShippingMethod("local")
                                  }
                                />
                                <label htmlFor="radio2">Local</label>
                              </div>
                              <div className="input-group">
                                <input
                                  type="radio"
                                  id="radio3"
                                  name="shipping"
                                  onClick={() =>
                                    setSelectedShippingMethod("flat")
                                  }
                                />
                                <label htmlFor="radio3">Flat rate</label>
                              </div>
                            </td>
                          </tr>
                          <tr className="order-total">
                            <td>Total</td>
                            <td className="order-total-amount">
                              $
                              {selectedShippingMethod === "free"
                                ? parseFloat(totalAmount).toFixed(2)
                                : selectedShippingMethod === "local"
                                ? (parseFloat(totalAmount) + 15).toFixed(2)
                                : selectedShippingMethod === "flat"
                                ? (parseFloat(totalAmount) + 20).toFixed(2)
                                : ""}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <div className="order-payment-method">
                      <div className="single-payment">
                        <div className="input-group">
                          <input
                            type="radio"
                            {...register("paymentMethod")}
                            id="bank"
                            value="bank"
                          />
                          <label htmlFor="bank">Direct bank transfer</label>
                        </div>
                        <p>
                          Make your payment directly into our bank account.
                          Please use your Order ID as the payment reference.
                          Your order will not be shipped until the funds have
                          cleared in our account.
                        </p>
                      </div>
                      <div className="single-payment">
                        <div className="input-group">
                          <input
                            type="radio"
                            {...register("paymentMethod")}
                            id="cash"
                            value="Cash on Delivery"
                          />
                          <label htmlFor="cash">Cash on Delivery</label>
                        </div>
                        <p>Pay with cash upon delivery.</p>
                      </div>
                      <div className="single-payment">
                        <div className="input-group justify-content-between align-items-center">
                          <input
                            type="radio"
                            {...register("paymentMethod")}
                            id="paypal"
                            value="paypal"
                          />
                          <label htmlFor="paypal">Paypal</label>
                          <Image
                            src="/images/others/payment.png"
                            height={28}
                            width={156}
                            alt="Paypal payment"
                          />
                        </div>
                        <p>
                          Pay via PayPal; you can pay with your credit card if
                          you don’t have a PayPal account.
                        </p>
                      </div>
                    </div>
                    <button
                      type="submit"
                      className="axil-btn btn-bg-primary checkout-btn"
                    >
                      Process to Checkout
                    </button>
                  </div>
                </div>
              </div>
            </form>
          ) : (
            <div className="text-center">
              <h4>There is no item for checkout</h4>
              <Link href="/shop" className="axil-btn btn-bg-primary">
                Back to shop
              </Link>
            </div>
          )}
        </Section>
        <ServiceTwo />
      </main>
      <FooterTwo />
    </>
  );
};

export default Checkout;
