import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { CheckCircle, Edit3, Trash, Trash2 } from 'lucide-react';
import { FaToggleOn, FaToggleOff } from "react-icons/fa"
import './UserView/UserView.css';
// import './UserView.css';
import api from './api';

const SupplierView = ({ status }) => {
    const [quantities, setQuantities] = useState({});
    const [products, setProducts] = useState([]);
    const [refresh, setRefresh] = useState(false);
    const [quantityAdd, setQuantityAdd] = useState(0);
    console.log(`>>>>>>status>>>>>`, status);
    console.log(`>>>>>>status>>>>>`, typeof (status));
    // const location = useLocation();
    // const status = location.pathname.includes('inactiveProducts') ? false : true;  // Get status from URL

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const user = JSON.parse(localStorage.getItem("user"));
                console.log(`>>>>>>>user>>`, user); console.log(`>>>>>>>usertoken>>`, user.token);
                // const path = (status == "true") ? 'getActiveProductBySupplierId' : 'getInActiveProductBySupplierId';
                const response = await api.get(`http://localhost:6080/inventory/getProductsBySupplierId/${status}`);
                // const response = await axios.get(`http://localhost:6080/product/${path}`,
                //     { headers: { 'Authorization': `Bearer ${user.token}`, 'Content-Type': 'application/json' } });
                console.log(`response>>>>>>>>`, response.data);
                if (response.data) { setProducts([]); setProducts(response.data); }
            } catch (error) { console.error('Error fetching products:', error); }
        };
        fetchProducts();
    }, [status, refresh]);
    console.log(`products>>>>>>`, products);

    const handleSoftDelete = async (id, status) => {
        try {
            console.log(id);
            console.log(status);
            const user = JSON.parse(localStorage.getItem("user"));
            // console.log(`>>>>>>>>>id>>>>>>>>>>`, id)
            // console.log(`>>>>>>>>>status>>>>>>>>>>`, status)
            // const data = { id, status };
            // console.log(`>>>>>>>>>34)data>>>>>>>>>>`, data)
            // axios.get(`http://localhost:6080/product?supplierId=${supplierId}&status=${status}`)
            const response = await api.patch(`http://localhost:6080/product/softdelete/${id}`, { Status: status });
            console.log(response);
            if (response.data) { setRefresh(!refresh); }
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    }

    const handleHardDelete = async (id) => {
        try {

            // const user = JSON.parse(localStorage.getItem("user"));
            const response =
                await api.delete(`http://localhost:6080/product/deleteProduct/${id}`, {});
            console.log(`>>>>>response:`, response);

            if (response.data) { setRefresh(!refresh); }
            console.log(`>>>>>>>>>>>>63>>>>>>>>`);

        } catch (error) {
            console.error('Error fetching products:', error);
        }
    }

    const Statuss = ({ status, id }) => {
        if (status == true) {
            return (
                <>
                    <button // className="absolute top-4 right-4 p-2 bg-gray-200 hover:bg-gray-300 rounded-full transition"
                    >
                        <Edit3 /> Edit Product
                    </button>

                    {/* Hard Delete Button */}
                    <button onClick={() => handleHardDelete(id)}
                    // className="absolute top-4 right-4 p-2 bg-gray-200 hover:bg-gray-300 rounded-full transition"
                    >
                        <Trash2 /> Delete Product
                    </button>
                </>
            );
        }
    }

    const update = async (id, quantity) => {
        // const Quanty = Quantity + 1;
        console.log(`id:`, id);
        console.log(`Quantity:`, quantity);


        // const response = await api.put(`/inventory/editInventory/${id}`, { quantity: Quantity });
        const response = await api.patch(`/product/editProductQuantity/${id}`, { quantity: quantity });
        if (response.data) { // Quantity = response.data.Quantity;
            setQuantities({});
            setRefresh(!refresh);
        }
        else { console.log(`response.data:`, response.data); }
    };

    // Update quantity per product
    const handleQuantityChange = (id, value) => {
        setQuantities(prev => ({
            ...prev,
            [id]: value
        }));
    };

    return (
        // <>
        //     <div>supplierView</div>
        //     {/* {products.map((item)=><div>{item}</div>)} */}
        //     {
        //         products.map((item, index) => (
        //             <div key={index}>

        //                 <div> {/* image */} </div>
        //                 <div>{item.Name} <div style={{ backgroundColor: item.Color, display: 'inline-block', width: '30px', height: '10px' }}></div> </div>
        //                 <div> {item.Size} </div>
        //                 <div> {item.Price}, {item.Quantity}, {item.BrandName} </div>

        //                 <Statuss status={status} />

        //                 {/* Soft Delete Button */}
        //                 <button
        //                     onClick={() => handleSoftDelete(item._id, item.Status === true ? false : true)}
        //                     className="absolute top-4 right-12 p-2 bg-gray-200 hover:bg-gray-300 rounded-full transition"
        //                 >
        //                     {item.Status === "true" ? <FaToggleOn className="text-green-500" /> : <FaToggleOff className="text-gray-500" />}
        //                     {/* <Trash className="w-5 h-5 text-gray-600" /> */}
        //                 </button>
        //             </div>
        //         ))
        //     }
        // </>
        <div className="user-view-container">
            <h2 className="user-view-title">Explore Products</h2>
            <div className="card-grid">
                {products.map((item, index) => (
                    // ( console.log(`item: `, item) ),
                    <div className="product-card" key={index}>
                        <div className="product-image">
                            {/* Optional image placeholder */}
                            <img src={item.productId.Image} style={{ border: '3px solid red', height: '100%', width: '100%' }} />
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
                            <>
                                {/* <div style={{ display: 'inline-block' }}>

                                <input
                                    type="text"
                                    value={quantities[item._id] || ""}
                                    onChange={(e) => handleQuantityChange(item._id, e.target.value)}
                                    style={{ padding: '0 10px' }}
                                />
                                <button
                                    onClick={() => update(item._id, item.Quantity + Number(quantities[item._id] || 0))}
                                    className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                                    style={{ border: '1px solid red', padding: '10px' }}
                                >
                                    Add more Quantity
                                </button>


                                {/* <span
                                        className="text-2xl font-bold"
                                        // style={{ display: 'inline-block', border: '1px solid black', padding: '5px 10px' }}
                                    >
                                    {/* <input type='text' onChange={(e) => { setQuantityAdd(e.target.value) }}
                                        value={quantityAdd} /> */}
                                {/*                                    <input
                                        type="text"
                                        value={quantities[item._id] || ""}
                                        onChange={(e) => handleQuantityChange(item._id, e.target.value)}
                                        style={{ padding: '0 10px' }}
                                    />
                                </span>
                                <span
                                    className="flex space-x-3"
                                    style={{ display: 'inline-block', marginLeft: '5px', marginTop: '5px' }}
                                >
                                    <button
                                        onClick={() => update(item._id, item.Quantity + Number(quantities[item._id] || 0))}
                                        className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                                        style={{ border: '1px solid red', padding: '10px' }}
                                    >
                                        Add more Quantity
                                    </button>
                                    {/* <button
                                        onClick={() => update(item._id, item.Quantity + quantityAdd)}
                                        className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                                        style={{ fontSize: '22px', padding: '5px', paddingTop: '0px', margin: '5px' }}
                                    >
                                        Quantity To Add
                                    </button> *//*}
                                </span> */}
                                {/* </div>  */}
                            </>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', margin: '10px 0' }}>
                                <input
                                    type="text"
                                    value={quantities[item._id] || ""}
                                    onChange={(e) => handleQuantityChange(item._id, e.target.value)}
                                    style={{
                                        padding: '6px 10px',
                                        border: '1px solid #ccc',
                                        borderRadius: '4px'
                                    }}
                                />
                                {/* { console.log(item.quantity + Number(quantities[item._id] || 0)) } */}
                                <button
                                    onClick={() => update(item._id, item.quantity + Number(quantities[item._id] || 0))}
                                    className=""
                                    style={{
                                        padding: '8px 12px',
                                        fontSize: '14px',
                                        border: '1px solid red'
                                    }}
                                >
                                    {/* bg-green-500 text-white rounded-md hover:bg-green-600 */}
                                    Add more Quantity
                                </button>
                            </div>
                        </div>
                        <div className="product-actions">
                            {/* <button onClick={() => handleCart(item._id)}>
                                {cart.some(c => c.toString() === item._id.toString()) ? "Remove from Cart" : "Add to Cart"}
                            </button>
                            <button onClick={() => handleWishlist(item._id)}>
                                {wishList.some(w => w.toString() === item._id.toString()) ? "Remove from Wishlist" : "Add to Wishlist"}
                            </button> */}

                            <Statuss status={status} id={item.productId._id} />

                            {/* Soft Delete Button */}
                            <button
                                onClick={() => handleSoftDelete(item.productId._id, item.productId.Status === true ? false : true)}
                            // className="absolute top-4 right-12 p-2 bg-gray-200 hover:bg-gray-300 rounded-full transition"
                            >
                                <>
                                    {item.Status === "true" ? <FaToggleOn /> : <FaToggleOff />}
                                    <div>Change Status</div>
                                </>
                                {/* <Trash className="w-5 h-5 text-gray-600" /> */}
                                {/* className="text-green-500" */}
                                {/* className="text-gray-500" */}
                            </button>
                        </div>
                    </div>
                    //             <div key={index}>

                    //                 <div>
                    //                     {/* image */}
                    //                 </div>
                    //                 <div>{item.Name} <div style={{ backgroundColor: item.Color, display: 'inline-block', width: '30px', height: '10px' }}></div> </div>
                    //                 <div> {item.Size} </div>
                    //                 <div> {item.Price}, {item.Quantity}, {item.BrandName} </div>

                    //                 <Statuss status={status} />

                    //                 {/* Soft Delete Button */}
                    //                 <button
                    //                     onClick={() => handleSoftDelete(item._id, item.Status === true ? false : true)}
                    //                     className="absolute top-4 right-12 p-2 bg-gray-200 hover:bg-gray-300 rounded-full transition"
                    //                 >
                    //                     {item.Status === "true" ? <FaToggleOn className="text-green-500" /> : <FaToggleOff className="text-gray-500" />}
                    //                     {/* <Trash className="w-5 h-5 text-gray-600" /> */}
                    //                 </button>
                    //             </div>
                ))}
            </div>
        </div>
    )
}

export default SupplierView

{/* Add Button */ }
{/* <button
className="absolute top-4 right-28 p-2 bg-gray-200 hover:bg-gray-300 rounded-full transition"
>
<Plus className="w-5 h-5 text-gray-600" />
</button> */}
