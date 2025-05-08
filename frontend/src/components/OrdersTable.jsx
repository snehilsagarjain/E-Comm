// src/components/OrdersTable.jsx
import React from "react";

const orders = [
    { id: 1, customer: "John Doe", total: "$250", status: "Delivered" },
    { id: 2, customer: "Jane Smith", total: "$480", status: "Pending" },
    { id: 3, customer: "Bob Lee", total: "$122", status: "Cancelled" },
];

const OrdersTable = () => {
    return (
        <div className="bg-white p-6 shadow-lg rounded-2xl mt-10" style={{ padding: '10px' }}>
            <h3 className="text-lg font-semibold text-gray-700 mb-4">Recent Orders</h3>
            <table className="w-full text-left border-separate border-spacing-y-2">
                <thead>
                    <tr className="text-gray-600">
                        <th className="p-2">Customer</th>
                        <th className="p-2">Total</th>
                        <th className="p-2">Status</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map((order) => (
                        <tr
                            key={order.id}
                            className="bg-gray-50 hover:bg-gray-100 rounded-lg shadow-sm"
                        >
                            <td className="p-2 font-medium text-gray-800">{order.customer}</td>
                            <td className="p-2 text-gray-700">{order.total}</td>
                            <td className="p-2">
                                <span
                                    className={`text-sm px-3 py-1 rounded-full font-semibold ${order.status === "Delivered"
                                        ? "bg-green-100 text-green-700"
                                        : order.status === "Pending"
                                            ? "bg-yellow-100 text-yellow-700"
                                            : "bg-red-100 text-red-700"
                                        }`}
                                >
                                    {order.status}
                                </span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default OrdersTable;
