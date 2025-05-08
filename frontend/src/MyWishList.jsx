import React from 'react'
import { useEffect, useState } from 'react';
import axios from 'axios';
import api from './api';
import { Link } from 'react-router-dom';
import './UserView/UserView.css'; // Add this import
// import './UserView.css'; // Add this import

const MyWishList = () => {
    const [wishlists, setWishlists] = useState([]);
    const [refresh, setRefresh] = useState(true);

    useEffect(() => {
        const fetchWishLists = async () => {
            const wishlistResponse = await api.get(`/wishlist/getProductsFromWishListsByUserId`);
            setWishlists(wishlistResponse.data);
        };
        fetchWishLists();
    }, [refresh]);
    console.log('wishlists>>>>>>>', wishlists);
    const removeFromWishList = async (productId) => {
        console.log(`>>>>>>>removeFromWishList>>>>>>:`, productId);

        const response = await api.delete(`/wishlist/deleteWishlist/${productId}`);
        console.log(`>>>>>>23response>>>>`, response);

        if (response.data) {
            console.log(`28response::>>>>>`);

            /*remove that particular wishlist from set */
            setRefresh(!refresh);
        }
        else console.log(`Product deletion from wishlist failed!!!`);
    }

    return (
        // <div>
        //     <h1>MyWishList</h1>
        //     {wishlists.length === 0 ?
        //         (<p>Your wishlist is empty</p>) : (
        //             wishlists.map((item) => (
        //                 <div key={item._id}>
        //                     <h2>{item.productId.Name}</h2>
        //                     <p>${item.productId.Price}</p>
        //                     <button onClick={() => { removeFromWishList(item._id) }}>Remove</button>
        //                 </div>
        //             ))
        //         )
        //     }
        // </div>
        <div className="user-view-container">
            <h2 className="user-view-title">MyWishList</h2>
            <div className="card-grid">
                {wishlists.length === 0 ?
                    (<p>Your wishlist is empty</p>) : (
                        wishlists.map((item, index) => (
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
                                    {/* <p><strong>Qty:</strong> {item.Quantity}</p> */}
                                    <p><strong>Brand:</strong> {item.productId.BrandName}</p>
                                </div>
                                <div className="product-actions">
                                    <button onClick={() => { removeFromWishList(item.productId._id) }}>Remove</button>
                                </div>
                            </div>
                            // ))}
                        ))
                    )}
            </div>
        </div>
    )
}

export default MyWishList
