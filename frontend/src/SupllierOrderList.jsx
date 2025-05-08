import React, { useState, useEffect } from "react";
import api from "./api.js";

const SupplierOrderList = () => {
    const [orders, setOrders] = useState([]);
    const [filterorders, setFilterOrders] = useState([]);
    const [nstatus, setNstatus] = useState("");
    const [refresh, setRefresh] = useState(true);
    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await api.get("/supplierOrder/getOrdersByUserId");
                setOrders(response.data);
                setFilterOrders(response.data);
            } catch (error) {
                console.error("Error fetching orders:", error);
            }
        };
        fetchOrders();
    }, []);

    // const handleStatus = (event) => {
    //     let newStatus = event.target.value; console.log(`newStatus: `, newStatus);
    //     if (newStatus == "") {
    //         setFilterOrders(() =>
    //             orders.map((order) =>
    //                 order
    //             )
    //         );
    //     }
    //     else {
    //         setFilterOrders(() =>
    //             orders.map((order) =>
    //                 order.status === newStatus && (order)
    //             )
    //         );
    //     }
    // }
    const handleStatus = (event) => {
        let newStatus = event.target.value;
        setNstatus(event.target.value);
        console.log(`newStatus: `, newStatus);

        if (newStatus === "") { setFilterOrders(orders); /* show all orders */ }
        else { setFilterOrders(orders.filter(order => order.status === newStatus)); }
    };

    const handleChange = async (event, orderId) => {
        let newStatus = event.target.value;
        newStatus == "Approve" && (newStatus = "Returned");
        setFilterOrders((prevOrders) =>
            prevOrders.map((order) =>
                order._id === orderId ? { ...order, status: newStatus } : order
            )
        );

        try {
            const response = await api.patch(`/supplierOrder/editorder/${orderId}`, { status: newStatus });
            setOrders(response.data);
            // if (nstatus === "") { setFilterOrders(orders); /* show all orders */ }
            // else { setFilterOrders(orders.filter(order => order.status === nstatus)); }
        }
        catch (error) { console.error("Error updating order status:", error); }
    };

    return (

        <div className="user-view-container">
            {/* <h2 className="user-view-title">Explore Products</h2> */}
            <h1 className="user-view-title">Supplier Order List</h1>
            <select value={nstatus} onChange={(event) => handleStatus(event)}>
                <option value="">All Orders</option>
                <option value="Initial">Initial</option>
                <option value="Cancelled">Cancelled</option>
                <option value="Packaging">Packaging</option>
                <option value="Delivered">Delivered</option>
                <option value="Return"> Return </option>
                <option value="Returned">Returned</option>
            </select>
            {orders.length === 0 ?
                (<p>Your Order List is empty</p>) :

                <div className="card-grid">
                    {
                        filterorders.map((item) => (
                            <div key={item._id} style={{ border: '1px solid blue' }} className="product-card">
                                {/* key={index} */}
                                <div className="product-image">
                                    {/* Optional image placeholder */}
                                    <img src={item.productId.Image} style={{ border: '3px solid red', height: '100%', width: '100%' }} />
                                </div>
                                <div className="product-info">
                                    <h2>{item.productId.Name}</h2>
                                    {/* <div style={{ paddingLeft: '40px' }}> */}
                                    {/* <p style={{ textAlign: 'left' }}><strong>Price:</strong> ₹{item.productId.Price}</p>
                                        <p style={{ textAlign: 'left' }}><strong>Status:</strong> {item.status}

                                            <select value={item.status} onChange={(event) => handleChange(event, item._id)} style={{ marginLeft: '10px' }} >
                                                {item.status == "Initial" && (<> <option value="Initial">Initial</option> <option value="Cancelled">Cancelled</option> <option value="Packaging">Packaging</option></>)}
                                                {item.status == "Packaging" && (<> <option value="Packaging">Packaging</option><option value="Delivered">Delivered</option></>)}
                                                {item.status == "Return" && (<> <option value="Return"> Return </option> <option value="Approve">Approve</option> </>)}
                                                {/* {item.status == "Approve"?.(<></>)}
                                                <option value="Initial">Initial</option>
                                                <option value="Cancelled">Cancelled</option>
                                                <option value="Packaging">Packaging</option> */}

                                    {/* </select> */}
                                    {/* </p> */}
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
                                                (<> <option value="Initial">Initial</option> <option value="Cancelled">Cancelled</option> <option value="Packaging">Packaging</option> </>)
                                            }
                                            {item.status == "Packaging" && (<> <option value="Packaging">Packaging</option><option value="Delivered">Delivered</option></>)}
                                            {/* {item.status == "Delivered" && (<> <option value="Delivered">Delivered</option><option value="Return"> Return </option></>)} */}
                                            {item.status == "Return" && (<> <option value="Return"> Return </option> <option value="Approve">Approve</option> </>)}
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
        //     <h1>Supplier Order List</h1>
        //     {orders.length === 0 ? (<p>Your Order List is empty</p>) : (
        //         <>

        //             {
        //                 filterorders.map((item) => (
        //                     <div key={item._id}>
        //                         <h2>{item.productId.Name}</h2>
        //                         <p>${item.productId.Price}</p>
        //                         <label>Status: </label> {item.status}
        //                         <p>
        //                             <label>Status:</label>

        //                         </p>
        //                     </div>
        //                 ))
        //             }
        //         </>
        //     )}
        // </div>
    );
};

export default SupplierOrderList;
