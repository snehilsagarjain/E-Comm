import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from './api'; // adjust if path differs
import './ProductDetails.css';

const ProductDetails = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await api.get(`/inventory/getProductById/${id}`);
                setProduct(res.data);
            } catch (err) {
                console.error("Failed to fetch product details:", err);
            }
        };

        fetchProduct();
    }, [id]);

    if (!product) return <div>Loading...</div>;

    return (
        <div className="product-details-container">
            <img src={product.productId.Image} alt={product.productId.Name} className="product-details-image" />
            <div className="product-details-info">
                <h2>{product.productId.Name}</h2>
                <p><strong>Brand:</strong> {product.productId.BrandName}</p>
                <p>
                    <strong>Color:</strong>
                    <span className="product-color-box" style={{ backgroundColor: product.productId.Color }}></span>
                </p>
                <p><strong>Size:</strong> {product.productId.Size}</p>
                <p><strong>Price:</strong> ₹{product.productId.Price}</p>
                <p><strong>Description:</strong> {product.productId.Description || 'No description provided.'}</p>
            </div>
        </div>

        // <div style={{ padding: '20px' }}>
        //     <h2>{product.Name}</h2>
        //     <img src={product.Image} alt={product.Name} style={{ width: '300px', height: 'auto', border: '2px solid black' }} />
        //     <p><strong>Brand:</strong> {product.BrandName}</p>
        //     <p><strong>Color:</strong> <span style={{ background: product.Color, padding: '5px 10px' }}></span></p>
        //     <p><strong>Size:</strong> {product.Size}</p>
        //     <p><strong>Price:</strong> ₹{product.Price}</p>
        //     <p><strong>Description:</strong> {product.Description || 'No description provided.'}</p>
        // </div>
    );
};

export default ProductDetails;
