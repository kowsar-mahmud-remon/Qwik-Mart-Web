"use client";
import { useSelector } from "react-redux";
import Section from "@/components/elements/Section";
import FooterTwo from "@/components/footer/FooterTwo";
import HeaderFive from "@/components/header/HeaderFive";
import { useEffect, useState } from "react";
import { calculateTotalAmount } from "@/utils";
import { UserAuth } from "@/context/AuthContext";

const OrderReceived = () => {

  const [orders, setOrders] = useState([]);
  const { Token , user } = UserAuth();
  useEffect(() => {
    const apiUrl = "https://qwikmart.pythonanywhere.com/orders/";

    fetch(apiUrl, {
      headers: {
        Authorization: `Token ${Token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        // Filter orders based on user.uid
        const filteredOrders = data.filter(
          (order) => order.userid === user.uid
        );
        setOrders(filteredOrders);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [Token, user.uid]);
  //   console.log(orders);
  const latestOrder = orders[orders?.length - 1];
  // console.log(latestOrder);

  const date = latestOrder?.orderedat.slice(0, 10);
  const time = latestOrder?.orderedat.slice(11, 19);
  return (
    <>
      <HeaderFive />
      <main className="main-wrapper">
        <Section pClass="order-received">
          {latestOrder && (
            <>
              <h1 className="thank-you-text">
                Thank you. Your order has been received.
              </h1>
              <ul className="order-overview">
                <li className="overview-item order-number">
                  ORDER NUMBER: <strong>{latestOrder.id}</strong>
                </li>
                <li className="overview-item order-number">
                  DATE: <strong>{time + " " + date}</strong>
                </li>
                <li className="overview-item order-number">
                  EMAIL: <strong>{user.email}</strong>
                </li>
                <li className="overview-item order-number">
                  TOTAL: <strong>{latestOrder.totalamount}</strong>
                </li>
                <li className="overview-item order-number">
                  PAYMENT METHOD: <strong>{latestOrder.paymenttype}</strong>
                </li>
              </ul>
              <div className="order-details">
                <h5 className="block-title">Order details</h5>
                <table className="table">
                  <thead>
                    <tr>
                      <th>Product</th>
                      <th>Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {latestOrder.productlist.map((data, index) => (
                      <tr key={index}>
                        <td>
                          {data.title} <strong>X {data.cartQuantity}</strong>
                        </td>
                        <td>${data.salePrice ? data.salePrice : data.price}</td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr>
                      <th>Shipping:</th>
                      <th>
                        {latestOrder.deliverytype === "free"
                          ? "Free"
                          : latestOrder.deliverytype === "local"
                          ? "$15.00"
                          : latestOrder.deliverytype === "flat"
                          ? "$20.00"
                          : ""}
                      </th>
                    </tr>
                    <tr>
                      <th>Payment Method:</th>
                      <th>{latestOrder.paymenttype}</th>
                    </tr>
                    <tr>
                      <th>Total:</th>
                      <th>${latestOrder.totalamount}</th>
                    </tr>
                  </tfoot>
                </table>
              </div>
              <div className="customer-details">
                <div className="row">
                  <div className="col-lg-6">
                    <div className="customer-address">
                      <h5 className="block-title">Billing address</h5>
                      <address>
                        {latestOrder.username} <br />
                        {latestOrder.address.street1}
                        <br />
                        {latestOrder.address.street2}
                        <br />
                        {latestOrder.address.city}
                        <br />
                        <p className="address-phone">
                          <i className="far fa-phone"></i> {latestOrder.phone}
                        </p>
                        <p className="address-email">
                          <i className="far fa-envelope"></i> {user.email}
                        </p>
                      </address>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </Section>
      </main>
      <FooterTwo />
    </>
  );
};

export default OrderReceived;
