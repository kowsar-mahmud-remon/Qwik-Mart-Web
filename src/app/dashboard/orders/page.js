"use client";
import { UserAuth } from "@/context/AuthContext";
import Link from "next/link";
import { useEffect, useState } from "react";
const UserOrders = () => {
  const [orders, setOrders] = useState([]);
  const { Token, user } = UserAuth();
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
  // console.log(orders);
  return (
    <>
      {user?.displayName ? (
        <div className="axil-dashboard-order">
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Order Id</th>
                  <th scope="col">YYYY/MM/DD</th>
                  <th scope="col">Status</th>
                  <th scope="col">Total</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id}>
                    <th scope="row">{order.id}</th>
                    <td>{order.orderedat.slice(0, 10)}</td>
                    <td>{order?.status ? order.status : "Pending"}</td>
                    <td>
                      ${order.totalamount} for {order.productlist.length} items
                    </td>
                    <td>
                      <Link
                        disabled
                        href={`dashboard/orders/view/${order.id}`}
                        className="axil-btn view-btn"
                      >
                        View
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        
        <><h3>Please <Link href='/sign-in' className="text-primary">
        Login
        </Link> and Order your desire product.</h3>
        
        </>
      )}
    </>
  );
};

export default UserOrders;
