 "use client"
import Section from "@/components/elements/Section";
import { UserAuth } from "@/context/AuthContext";
import { useEffect, useState } from "react";

const OrderView = ({ params }) => {
    // console.log(params.id);
    const [order, setOrder] = useState([]);
  const { Token , user } = UserAuth();
  useEffect(() => {
    const apiUrl = `https://qwikmart.pythonanywhere.com/orders/${params.id}`;

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
        setOrder(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [Token, params.id]);

  const date = order?.orderedat?.slice(0, 10);
  const time = order?.orderedat?.slice(11, 19);
    return (
        <div className="axil-dashboard-order-view">
            {/* <p>Order <strong>#{params.id}</strong> was placed on <strong>October 16, 2023</strong> and is currently <strong>Processing</strong>.</p> */}
            <Section pClass="order-received">
          {order && (
            <>
              <h1 className="thank-you-text">Order <strong>#{order.id}</strong> was placed on <strong>{date}</strong> and is currently <strong>Processing</strong>.
              </h1>
              <ul className="order-overview">
                <li className="overview-item order-number">
                  ORDER NUMBER: <strong>{order.id}</strong>
                </li>
                <li className="overview-item order-number">
                  DATE: <strong>{time + " " + date}</strong>
                </li>
                <li className="overview-item order-number">
                  EMAIL: <strong>{user.email}</strong>
                </li>
                <li className="overview-item order-number">
                  TOTAL: <strong>{order.totalamount}</strong>
                </li>
                <li className="overview-item order-number">
                  PAYMENT METHOD: <strong>{order.paymenttype}</strong>
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
                    {order?.productlist?.map((data, index) => (
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
                        {order.deliverytype === "free"
                          ? "Free"
                          : order.deliverytype === "local"
                          ? "$15.00"
                          : order.deliverytype === "flat"
                          ? "$20.00"
                          : ""}
                      </th>
                    </tr>
                    <tr>
                      <th>Payment Method:</th>
                      <th>{order.paymenttype}</th>
                    </tr>
                    <tr>
                      <th>Total:</th>
                      <th>${order.totalamount}</th>
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
                        Name: {order?.username} <br />
                        Street-1: {order?.address?.street1}
                        <br />
                        Street-2: {order?.address?.street2}
                        <br />
                        City: {order?.address?.city}
                        <br />
                        <p className="address-phone">
                          <i className="far fa-phone"></i> {order.phone}
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
        </div>
    );
}

export default OrderView;