import React from 'react'
import { useEffect, useState } from 'react';
import axios from 'axios';
import api from './api';
import { Link, useNavigate } from 'react-router-dom';
import './UserView/UserView.css'; // Add this import
// import './UserView.css'; // Add this import
const MyCart = () => {
    const [carts, setCarts] = useState([]);
    const [refresh, setRefresh] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCarts = async () => {
            const cartResponse = await api.get(`/cart/getProductsFromPendingCartsByUserId`);
            console.log(cartResponse);

            setCarts(cartResponse.data);
        };
        fetchCarts();
    }, [refresh]);

    console.log('carts>>>>>>>', carts);

    const removeFromCart = async (productId) => {
        const response = await api.delete(`/cart/deleteCart/${productId}`);
        if (response) { /*remove that particular wishlist from set */ setRefresh(!refresh); }
        else console.log(`Product deletion from cart failed!!!`);
    }

    const update = async (id, Quantity) => {
        // const Quanty = Quantity + 1;
        const response = await api.put(`/cart/editCart/${id}`, { quantity: Quantity });
        if (response.data) {
            // Quantity = response.data.Quantity;
            setRefresh(!refresh);
        }
    };
    return (
        // <div>
        //     <h1>Shopping Cart</h1>
        //     {carts.length === 0 ?
        //         (<p>Your cart is empty</p>) : (
        //             carts.map((item) => (
        //                 // <div key={item._id}>
        //                 //     <h2>{item.productId.Name}</h2>
        //                 //     <p>${item.productId.Price}</p>
        //                 //     <div style={{ display: 'inline-block' }}>
        //                 //         <div className="text-2xl font-bold" style={{ display: 'inline-block', border: '1px solid black', padding: '5px 10px' }}>{item.quantity}</div>
        //                 //         <div className="flex space-x-3" style={{ display: 'inline-block', marginLeft: '5px' }}>
        //                 //             <button
        //                 //                 onClick={() => update(item._id, item.quantity + 1)}
        //                 //                 className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
        //                 //                 style={{ fontSize: '22px', padding: '5px', paddingTop: '0px', margin: '5px' }}
        //                 //             >
        //                 //                 +
        //                 //             </button>
        //                 //             <button
        //                 //                 onClick={() => update(item._id, item.quantity - 1)}
        //                 //                 className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
        //                 //                 style={{ fontSize: '22px', padding: '5px', paddingLeft: '9px', paddingRight: '9px', paddingTop: '0px', margin: '5px' }}
        //                 //             >
        //                 //                 -
        //                 //             </button>
        //                 //         </div>
        //                 //     </div>
        //                 //     <button onClick={() => { removeFromCart(item._id) }}>Remove</button>
        //                 //     {/* <Link to={"/user/userDashboard/address"} state={{ cartId: item._id }}> */}
        //                 //     <button onClick={() => { navigate("/user/userDashboard/address", { state: { cartId: item._id }, }); }}> Place Order </button>
        //                 //     {/* </Link> */}
        //                 // </div>
        //             ))
        //         )}
        // </div>
        <div className="user-view-container">
            <h2 className="user-view-title">Shopping Cart</h2>
            <div className="card-grid">
                {carts.length === 0 ?
                    (<p>Your cart is empty</p>) : (
                        carts.map((item, index) => (
                            // {products.map((item, index) => (
                            <div className="product-card" key={index}>
                                <div className="product-image">
                                    {/* Optional image placeholder */}
                                    <img src={item.productId.Image} style={{ border: '3px solid red', height: '100%', width: '100%' }} />
                                </div>
                                <div className="product-info">
                                    <h3>{item.productId.Name}</h3>
                                    <div className="product-color" style={{ backgroundColor: item.productId.Color }}></div>
                                    <p><strong>Size:</strong> {item.productId.Size}</p>
                                    <p><strong>Price:</strong> ₹{item.productId.Price}</p>
                                    <div style={{ display: 'inline-block' }}>
                                        <div style={{ display: 'inline-block', border: '1px solid black', padding: '5px 10px' }}>{item.quantity}</div> {/* className="text-2xl font-bold" */}
                                        <div style={{ display: 'inline-block', marginLeft: '5px' }}>
                                            {/* className="flex space-x-3" */}
                                            <button
                                                onClick={() => update(item._id, item.quantity + 1)}
                                                // className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                                                style={{ fontSize: '22px', padding: '5px', paddingTop: '0px', margin: '5px' }}
                                            >
                                                +
                                            </button>
                                            <button
                                                onClick={() => update(item._id, item.quantity - 1)}
                                                // className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                                                style={{ fontSize: '22px', padding: '5px', paddingLeft: '9px', paddingRight: '9px', paddingTop: '0px', margin: '5px' }}
                                            >
                                                -
                                            </button>
                                        </div>
                                    </div>
                                    {/* <p><strong>Qty:</strong> {item.Quantity}</p> */}
                                    <p><strong>Brand:</strong> {item.productId.BrandName}</p>
                                </div>
                                <div className="product-actions">
                                    <button onClick={() => { removeFromCart(item._id) }}>Remove</button>
                                    {/* <Link to={"/user/userDashboard/address"} state={{ cartId: item._id }}> */}
                                    <button onClick={() => { navigate("/userDashboard/address", { state: { cartId: item._id }, }); }}> Place Order </button>
                                    {/* <button onClick={() => { navigate("/user/userDashboard/address", { state: { cartId: item._id }, }); }}> Place Order </button> */}

                                    {/* </Link> */}
                                    {/* 
                                        <button onClick={() => handleCart(item._id)}>
                                            {cart.some(c => c.toString() === item._id.toString()) ? "Remove from Cart" : "Add to Cart"}
                                        </button>
                                        <button onClick={() => handleWishlist(item._id)}>
                                            {wishList.some(w => w.toString() === item._id.toString()) ? "Remove from Wishlist" : "Add to Wishlist"}
                                        </button> 
                                    */}
                                </div>
                            </div>
                            // ))}
                        ))
                    )}
            </div>
        </div>
    )
}

export default MyCart

// const OrderHistory = () => {
//     const [orders, setOrders] = useState([]);



//     return (
//         <div>
//             <h1>My Orders</h1>
//             {orders.length === 0 ? (
//                 <p>You have no orders.</p>
//             ) : (
//                 orders.map((order) => (
//                     <div key={order._id}>
//                         <p>Order ID: {order._id}</p>
//                         <p>Total: ${order.totalPrice}</p>
//                         <p>Status: {order.isPaid ? 'Paid' : 'Not Paid'}</p>
//                     </div>
//                 ))
//             )}
//         </div>
//     );
// };

// export default OrderHistory;
