import React, { useEffect, useState } from 'react'
import api from './api';
import './UserView/UserView.css';
// import './UserView.css';
const OrderList = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await api.get("/supplierOrder/getOrdersByUserId");
                console.log(`>>>>>>>>11 response.data>>>>>>>`, response.data);

                setOrders(response.data);
            } catch (error) {
                console.error("Error fetching orders:", error);
            }
        };
        fetchOrders();
    }, []);

    const handleChange = async (event, orderId) => {
        const newStatus = event.target.value;
        setOrders((prevOrders) => prevOrders.map((order) => order._id === orderId ? { ...order, status: newStatus } : order));
        try { await api.patch(`/supplierOrder/editorder/${orderId}`, { status: newStatus }); }
        catch (error) { console.error("Error updating order status:", error); }
    };

    return (

        <div className="user-view-container">
            {/* <h2 className="user-view-title">Explore Products</h2> */}
            <h1 className="user-view-title"> Order List</h1>
            {orders.length === 0 ?
                (<p>Your Order List is empty</p>) :

                <div className="card-grid">
                    {
                        orders.map((item) => (
                            <div key={item._id} style={{ border: '1px solid blue' }} className="product-card">
                                {/* key={index} */}
                                <div className="product-image">
                                    {/* Optional image placeholder */}
                                    <img src={item.productId.Image} style={{ border: '3px solid red', height: '100%', width: '100%' }} />
                                </div>
                                <div className="product-info">
                                    <h2>{item.productId.Name}</h2>
                                    {/* <div style={{ paddingLeft: '40px' }}> */}
                                    <div className="product-color" style={{ backgroundColor: item.productId.Color }}></div>
                                    <div style={{ display: 'flex', width: '100%', border: '1px solid black' }}>
                                        <div style={{ width: '50%', paddingLeft: '10px' }}>
                                            <p style={{ textAlign: 'left' }}><strong>Size:</strong> {item.productId.Size}</p>
                                            <p style={{ textAlign: 'left' }}><strong>Price:</strong> ₹{item.productId.Price}</p>
                                        </div>
                                        <div style={{ width: '50%', paddingLeft: '10px' }}>
                                            <p style={{ textAlign: 'left' }}><strong>Quantity:</strong> {item.quantity}</p>
                                            <p style={{ textAlign: 'left' }}><strong>Brand:</strong> {item.productId.BrandName}</p>
                                        </div>
                                    </div>
                                    <p style={{ textAlign: 'left' }}><strong>Status:</strong> {item.status}
                                        <select value={item.status} onChange={(event) => handleChange(event, item._id)} style={{ marginLeft: '10px' }}>
                                            {(item.status == "Initial") &&
                                                (<> <option value="Initial">Initial</option> <option value="Cancelled">Cancelled</option> </>)
                                            }
                                            {item.status == "Delivered" && (<> <option value="Delivered">Delivered</option><option value="Return"> Return </option></>)}
                                        </select>
                                    </p>
                                    {/* </div> */}

                                </div>
                            </div>
                        ))
                    }
                </div>

            }
            {/* {products.map((item, index) => (
                    // ( console.log(`item: `, item) ),
                    <div className="product-card" key={index}>
                        <div className="product-image">
                            {/* Optional image placeholder */}{/*
                        </div>
                        <div className="product-info">
                            <h3>{item.productId.Name}</h3>
                            <div className="product-color" style={{ backgroundColor: item.Color }}></div>
                            <div style={{ display: 'flex', width: '100%', border: '1px solid black' }}>
                                <div style={{ width: '50%', paddingLeft: '10px' }}>
                                    <p style={{ textAlign: 'left' }}><strong>Size:</strong> {item.productId.Size}</p>
                                    <p style={{ textAlign: 'left' }}><strong>Price:</strong> ₹{item.productId.Price}</p>
                                </div>
                                <div style={{ width: '50%', paddingLeft: '10px' }}>
                                    <p style={{ textAlign: 'left' }}><strong>Quantity:</strong> {item.quantity}</p>
                                    <p style={{ textAlign: 'left' }}><strong>Brand:</strong> {item.productId.BrandName}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                ))} */}

        </div>

        // <div>
        //     {/* <h1>Order List</h1> */}
        //     {orders.length === 0 ?
        //         (<p>Your Order List is empty</p>) :
        //         (
        //             orders.map((item) => (
        //                 <div key={item._id}>
        //                     <h2>{item.productId.Name}</h2>
        //                     <p>${item.productId.Price}</p>
        //                     <label>Status: </label> {item.status}
        //                     <p>
        //                         <label style={{ border: '1px solid blue' }}>Status:</label>
        //                         <select value={item.status} onChange={(event) => handleChange(event, item._id)}>
        //                             {(item.status == "Initial") &&
        //                                 (<> <option value="Initial">Initial</option> <option value="Cancelled">Cancelled</option> </>)
        //                             }
        //                             {item.status == "Delivered" && (<> <option value="Delivered">Delivered</option><option value="Return"> Return </option></>)}
        //                         </select>
        //                     </p>
        //                 </div>
        //             ))
        //         )
        //     }
        // </div>
    )
}

export default OrderList