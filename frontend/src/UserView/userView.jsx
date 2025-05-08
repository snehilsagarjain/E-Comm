// import React, { useState, useEffect } from 'react';
// import axios from 'axios'
// import api from './api';
// import { Navigate, useNavigate } from 'react-router-dom';
// const UserView = () => {
//     const [products, setProducts] = useState([]);
//     const [cart, setCart] = useState([]); //new Set()
//     const [wishList, setWishList] = useState([]); //new Set()

//     const navigate = useNavigate();
//     useEffect(() => {
//         const fetchProducts = async () => {
//             try {
//                 const response = await api.get("/product/getAllProducts");
//                 setProducts(response.data);

//                 const user = JSON.parse(localStorage.getItem("user"));
//                 if (!user) return;
//                 // if(user)

//                 cartRefresh();
//                 wishlistRefresh();

//                 //
//             } catch (error) {
//                 console.error("Error fetching products or cart or wishlist:", error);
//             }
//         };
//         fetchProducts();
//     }, []);

//     const cartRefresh = async () => {
//         const cartResponse = await api.get(`/cart/getProductIdsFromPendingCartsByUserId`);
//         console.log(`userview - cartResponse: `, cartResponse);
//         // const cartProductIds = new Set(cartResponse.data.map(item => item.productId._id));
//         // setCart(cartProductIds);
//         setCart(cartResponse.data);
//     }
//     const wishlistRefresh = async () => {
//         const wishlistResponse = await api.get(`/wishlist/getProductsFromWishListsByUserId`);
//         console.log(`userview - wishlistResponse: `, wishlistResponse);
//         // const wishlistProductIds = new Set(wishlistResponse.data.map(item => item.productId._id));
//         // setWishList(wishlistProductIds);
//         setWishList(wishlistResponse.data);
//     }

//     console.log(`products>>>>>>`, products);
//     console.log(`carts:`, cart);

//     const handleCart = async (productId) => {
//         try {
//             const user = JSON.parse(localStorage.getItem("user"));
//             if (!user) {
//                 alert("Please log in to add items to the cart.");
//                 navigate("/login");
//                 return;
//             }
//             // if (cart.has(productId)) {
//             if (cart.some(cartItem => cartItem.toString() === productId.toString())) {
//                 console.log(`>>>>>60>>>>>>`, cart);
//                 console.log(`>>>>>>>>61>>>>>productId>>>`, productId);
//                 // console.log(`>>>>>>>>62>>>>>cartItem>>>`, cartItem);

//                 const response = await api.delete(`/cart/deleteCart/${productId}`);
//                 if (response) {
//                     /*remove that particular wishlist from set */
//                     console.log(`>>>>67>>>>>`, response);

//                     cartRefresh();
//                 }
//                 else console.log(`Product deletion from cart failed!!!`);
//             }
//             else {
//                 console.log(`>>>>>>>productId>>>>>>`, productId);
//                 console.log(`>>>>>>user.userEmail._id>>>>>`, user.userEmail._id);

//                 const response = await api.post("/cart/createCart", { userId: user.userEmail._id, productId, quantity: 1 });
//                 if (response) {
//                     // setCart((prevCart) => new Set([...prevCart, productId])); 
//                     cartRefresh();
//                 }
//                 else console.log(`Product addition into cart failed!!!`);
//             }
//         } catch (error) {
//             console.error("Error adding/removing product to cart:", error);
//         }
//     };

//     const handleWishlist = async (productId) => {
//         try {
//             const user = JSON.parse(localStorage.getItem("user"));
//             if (!user) {
//                 alert("Please log in to add items to the wishlist.");
//                 navigate("/login");
//                 return;
//             }

//             // if (wishList.has(productId)) {
//             if (wishList.some(wishListItem => wishListItem.toString() === productId.toString())) {
//                 const response = await api.delete(`/wishlist/deleteWishList/${productId}`);
//                 if (response) {
//                     /*remove that particular wishlist from set */
//                     wishlistRefresh();
//                 }
//                 else console.log(`Product deletion from wishlist failed!!!`);
//             }
//             else {
//                 const response = await api.post("/wishlist/createWishList", { userId: user.userEmail._id, productId });
//                 if (response) {
//                     // setWishList((prevWishList) => new Set([...prevWishList, productId])); 
//                     wishlistRefresh();
//                 }
//                 else console.log(`Product addition into wishlist failed!!!`);
//             }

//         } catch (error) {
//             console.error("Error adding product to wishlist:", error);
//         }
//     };
//     // console.log(`>>>>>>cart>>>>>>`, cart);
//     // console.log(`>>>>>>cart.productId>>>>>>`, cart.productId);
//     // console.log(`>>>>>>cart._id>>>>>>`, cart._id);
//     // console.log(`>>>>>>cart.productId._id>>>>>>`, cart.productId._id);
//     return (
//         <>
//             <div>User View</div>
//             {/* {products.map((item)=><div>{item}</div>)} */}
//             {
//                 products.map((item, index) => (
//                     <div key={index}>
//                         <div>
//                             {/* image */}
//                         </div>
//                         <div>{item.Name} <div style={{ backgroundColor: item.Color, display: 'inline-block', width: '30px', height: '10px' }}></div> </div>
//                         <div> {item.Size} </div>
//                         <div> {item.Price}, {item.Quantity}, {item.BrandName} </div>
//                         {/* <Link to="/userDashboard/cart">  */}
//                         <button onClick={() => handleCart(item._id)}>
//                             {/* {cart.has(item.id) ? "Added to Cart" : "Add to Cart"} */}
//                             {/* {cart.has(item._id) ? "Remove from Cart" : "Add to Cart"} */}
//                             {cart.some(cartItem => cartItem.toString() === item._id.toString()) ? "Remove from Cart" : "Add to Cart"}
//                         </button>
//                         {/* disabled={cart.has(item._id)} */}
//                         {/* <button onClick={() => setCart('')}> Add To Cart </button> */}
//                         {/* </Link> */}
//                         {/* <Link to="/userDashboard/wishlist">  */}

//                         <button onClick={() => handleWishlist(item._id)}>
//                             {/* {cart.has(item.id) ? "Added to WishList" : "Add to WishList"} */}
//                             {/* {wishList.has(item._id) ? "Remove from WishList" : "Add to WishList"} */}
//                             {wishList.some(wishlistItem => wishlistItem.toString() === item._id.toString()) ? "Remove from Wishlist" : "Add to Wishlist"}
//                         </button>
//                         {/* disabled={cart.has(item.id)} */}
//                         {/* <button> Add To WishList</button> */}
//                         {/* </Link> */}
//                     </div>
//                 ))
//             }
//             {/* products.map((item, index) => (
//                     <div key={index}>
//                         <div> {item.Name}, {item.Color}, {item.Size} </div>
//                         <div> {item.Price}, {item.Quantity}, {item.BrandName} </div>
//                         {/* <div> {item.Status} </div> */}
//             {/* <button > Add To Cart </button> */}
//             {/* Quantity:  */}
//             {/* <h1 className="text-2xl font-bold" style={{ display: 'inline-block' }}>{count}</h1> */}
//             {/* <div style={{ display: 'inline-block' }}>
//                             <div className="text-2xl font-bold" style={{ display: 'inline-block', border: '1px solid black', padding: '5px 10px' }}>{count}</div>
//                             <div className="flex space-x-3" style={{ display: 'inline-block', marginLeft: '5px' }}>
//                                 <button
//                                     onClick={() => setCount(count + 1)}
//                                     className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
//                                     style={{ fontSize: '22px', padding: '5px', paddingTop: '0px', margin: '5px' }}
//                                 >
//                                     +
//                                 </button>
//                                 <button
//                                     onClick={() => setCount(count - 1)}
//                                     className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
//                                     style={{ fontSize: '22px', padding: '5px', paddingLeft: '9px', paddingRight: '9px', paddingTop: '0px', margin: '5px' }}
//                                 >
//                                     -
//                                 </button>
//                             </div>
//                         </div> */}
//             {/* <button> Add To WishList</button>
//                     </div>
//                 )) */}
//         </>
//     )
// }

// export default UserView

// {/* Add Button */ }
// {/* <button
// className="absolute top-4 right-28 p-2 bg-gray-200 hover:bg-gray-300 rounded-full transition"
// >
// <Plus className="w-5 h-5 text-gray-600" />
// </button> */}


// import React, { useState, useEffect } from 'react';
// import api from './api';
// import { useNavigate } from 'react-router-dom';
// import './UserView.css'; // Add this import

// const UserView = () => {
//     const [products, setProducts] = useState([]);
//     const [cart, setCart] = useState([]);
//     const [wishList, setWishList] = useState([]);
//     const navigate = useNavigate();

//     useEffect(() => {
//         const fetchProducts = async () => {
//             try {
//                 const response = await api.get("/product/getAllProducts");
//                 setProducts(response.data);
//                 const user = JSON.parse(localStorage.getItem("user"));
//                 if (!user) return;
//                 cartRefresh();
//                 wishlistRefresh();
//             } catch (error) {
//                 console.error("Error fetching products:", error);
//             }
//         };
//         fetchProducts();
//     }, []);

//     const cartRefresh = async () => {
//         const cartResponse = await api.get(`/cart/getProductIdsFromPendingCartsByUserId`);
//         setCart(cartResponse.data);
//     };

//     const wishlistRefresh = async () => {
//         const wishlistResponse = await api.get(`/wishlist/getProductsFromWishListsByUserId`);
//         setWishList(wishlistResponse.data);
//     };

//     const handleCart = async (productId) => {
//         const user = JSON.parse(localStorage.getItem("user"));
//         if (!user) {
//             alert("Please log in to add items to the cart.");
//             navigate("/login");
//             return;
//         }

//         if (cart.some(item => item.toString() === productId.toString())) {
//             await api.delete(`/cart/deleteCart/${productId}`);
//         } else {
//             await api.post("/cart/createCart", { userId: user.userEmail._id, productId, quantity: 1 });
//         }
//         cartRefresh();
//     };

//     const handleWishlist = async (productId) => {
//         const user = JSON.parse(localStorage.getItem("user"));
//         if (!user) {
//             alert("Please log in to add items to the wishlist.");
//             navigate("/login");
//             return;
//         }

//         if (wishList.some(item => item.toString() === productId.toString())) {
//             await api.delete(`/wishlist/deleteWishList/${productId}`);
//         } else {
//             await api.post("/wishlist/createWishList", { userId: user.userEmail._id, productId });
//         }
//         wishlistRefresh();
//     };

//     return (
//         // <div className="user-view-container">
//         //     <h2 className="user-view-title">Explore Products</h2>
//         //     <div className="card-grid">
//         //         {products.map((item, index) => (
//         //             <div className="product-card" key={index}>
//         //                 <div className="product-image">
//         //                     {/* Optional image placeholder */}
//         //                 </div>
//         //                 <div className="product-info">
//         //                     <h3>{item.Name}</h3>
//         //                     <div className="product-color" style={{ backgroundColor: item.Color }}></div>
//         //                     <p><strong>Size:</strong> {item.Size}</p>
//         //                     <p><strong>Price:</strong> ₹{item.Price}</p>
//         //                     <p><strong>Qty:</strong> {item.Quantity}</p>
//         //                     <p><strong>Brand:</strong> {item.BrandName}</p>
//         //                 </div>
//         //                 <div className="product-actions">
//         //                     <button onClick={() => handleCart(item._id)}>
//         //                         {cart.some(c => c.toString() === item._id.toString()) ? "Remove from Cart" : "Add to Cart"}
//         //                     </button>
//         //                     <button onClick={() => handleWishlist(item._id)}>
//         //                         {wishList.some(w => w.toString() === item._id.toString()) ? "Remove from Wishlist" : "Add to Wishlist"}
//         //                     </button>
//         //                 </div>
//         //             </div>
//         //         ))}
//         //     </div>
//         // </div>
//         <div className="user-view-container">
//     <div className="user-view-title">User View</div>
//     <div className="card-grid">
//       {products.map((item, index) => (
//         <div key={index} className="product-card">
//           <div className="product-image">
//             {/* Replace with actual image if available */}
//           </div>
//           <div className="product-info">
//             <h3>{item.Name}</h3>
//             <div className="product-color" style={{ backgroundColor: item.Color }}></div>
//             <p>Size: {item.Size}</p>
//             <p>Price: ₹{item.Price}</p>
//             <p>Qty: {item.Quantity}</p>
//             <p>Brand: {item.BrandName}</p>
//           </div>
//           <div className="product-actions">
//             <button onClick={() => handleCart(item._id)}>
//               {cart.some(cartItem => cartItem.toString() === item._id.toString())
//                 ? "Remove from Cart"
//                 : "Add to Cart"}
//             </button>
//             <button onClick={() => handleWishlist(item._id)}>
//               {wishList.some(wishItem => wishItem.toString() === item._id.toString())
//                 ? "Remove from Wishlist"
//                 : "Add to Wishlist"}
//             </button>
//           </div>
//         </div>
//       ))}
//     </div>
//   </div>
//  <div className="user-view-container">
//   <h2 className="user-view-title">User View</h2>

//   <div className="card-grid">
//     {products.map((item, index) => (
//       <div className="product-card" key={index}>
//         <div className="product-image">
//           {/* Placeholder or actual image */}
//         </div>

//         <div className="product-info">
//           <h3>{item.Name}</h3>
//           <p>Size: {item.Size}</p>
//           <p>Price: ₹{item.Price}</p>
//           <p>Quantity: {item.Quantity}</p>
//           <p>Brand: {item.BrandName}</p>
//           <div
//             className="product-color"
//             style={{ backgroundColor: item.Color }}
//           ></div>
//         </div>

//         <div className="product-actions">
//           <button onClick={() => handleCart(item._id)}>
//             {cart.some(cartItem => cartItem.toString() === item._id.toString())
//               ? "Remove from Cart"
//               : "Add to Cart"}
//           </button>

//           <button onClick={() => handleWishlist(item._id)}>
//             {wishList.some(wishListItem => wishListItem.toString() === item._id.toString())
//               ? "Remove from Wishlist"
//               : "Add to Wishlist"}
//           </button>
//         </div>
//       </div>
//     ))}
//   </div>
// </div> 

//     );
// };

// export default UserView;

// import React, { useState, useEffect } from 'react';
// import api from './api';
// import { useNavigate } from 'react-router-dom';
// import './UserView.css';

// const UserView = () => {
//   const [products, setProducts] = useState([]);
//   const [cart, setCart] = useState([]);
//   const [wishList, setWishList] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const response = await api.get("/product/getAllProducts");
//         setProducts(response.data);

//         const user = JSON.parse(localStorage.getItem("user"));
//         if (!user) return;

//         await cartRefresh();
//         await wishlistRefresh();
//       } catch (error) {
//         console.error("Error fetching products:", error);
//       }
//     };

//     fetchProducts();
//   }, []);

//   const cartRefresh = async () => {
//     const response = await api.get("/cart/getProductIdsFromPendingCartsByUserId");
//     setCart(response.data);
//   };

//   const wishlistRefresh = async () => {
//     const response = await api.get("/wishlist/getProductsFromWishListsByUserId");
//     setWishList(response.data);
//   };

//   const handleCart = async (productId) => {
//     const user = JSON.parse(localStorage.getItem("user"));
//     if (!user) {
//       alert("Please log in to manage your cart.");
//       return navigate("/login");
//     }

//     const alreadyInCart = cart.some(item => item.toString() === productId.toString());

//     if (alreadyInCart) {
//       await api.delete(`/cart/deleteCart/${productId}`);
//     } else {
//       await api.post("/cart/createCart", {
//         userId: user.userEmail._id,
//         productId,
//         quantity: 1
//       });
//     }

//     await cartRefresh();
//   };

//   const handleWishlist = async (productId) => {
//     const user = JSON.parse(localStorage.getItem("user"));
//     if (!user) {
//       alert("Please log in to manage your wishlist.");
//       return navigate("/login");
//     }

//     const alreadyInWishlist = wishList.some(item => item.toString() === productId.toString());

//     if (alreadyInWishlist) {
//       await api.delete(`/wishlist/deleteWishList/${productId}`);
//     } else {
//       await api.post("/wishlist/createWishList", {
//         userId: user.userEmail._id,
//         productId
//       });
//     }

//     await wishlistRefresh();
//   };

//   return (
//     <div className="user-view-container">
//       <h2 className="user-view-title">Explore Products</h2>
//       <div className="card-grid">
//         {products.map((item, index) => (
//           <div className="product-card" key={index}>
//             <div className="product-image">
//               {/* Placeholder or actual image */}
//             </div>

//             <div className="product-info">
//               <h3>{item.Name}</h3>
//               <p>Size: {item.Size}</p>
//               <p>Price: ₹{item.Price}</p>
//               <p>Quantity: {item.Quantity}</p>
//               <p>Brand: {item.BrandName}</p>
//               <div
//                 className="product-color"
//                 style={{ backgroundColor: item.Color }}
//               ></div>
//             </div>

//             <div className="product-actions">
//               <button onClick={() => handleCart(item._id)}>
//                 {cart.some(c => c.toString() === item._id.toString())
//                   ? "Remove from Cart"
//                   : "Add to Cart"}
//               </button>
//               <button onClick={() => handleWishlist(item._id)}>
//                 {wishList.some(w => w.toString() === item._id.toString())
//                   ? "Remove from Wishlist"
//                   : "Add to Wishlist"}
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default UserView;


import React, { useState, useEffect } from 'react';
import api from '../api';
import { useNavigate } from 'react-router-dom';
import './UserView.css';

const UserView = () => {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);
    const [wishList, setWishList] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                // const response = await api.get("/product/getAllProducts");
                const response = await api.get("/inventory/getAllProducts");
                setProducts(response.data);
                const user = JSON.parse(localStorage.getItem("user"));
                if (!user) return;
                cartRefresh();
                wishlistRefresh();
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };
        fetchProducts();
    }, []);
    // console.log('products:', products);

    const cartRefresh = async () => {
        const cartResponse = await api.get(`/cart/getProductIdsFromPendingCartsByUserId`);
        setCart(cartResponse.data);
    };

    const wishlistRefresh = async () => {
        const wishlistResponse = await api.get(`/wishlist/getProductIdsFromWishListsByUserId`);
        setWishList(wishlistResponse.data);
    };
    // console.log(`wishlists:`, wishList);

    const handleCart = async (productId) => {
        const user = JSON.parse(localStorage.getItem("user"));
        if (!user) {
            alert("Please log in to add items to the cart.");
            navigate("/login");
            return;
        }

        if (cart.some(item => item.toString() === productId.toString())) { await api.delete(`/cart/deleteCart/${productId}`); }
        else { await api.post("/cart/createCart", { userId: user.userEmail._id, productId, quantity: 1 }); }
        cartRefresh();
    };

    const handleWishlist = async (productId) => {
        const user = JSON.parse(localStorage.getItem("user"));
        if (!user) {
            alert("Please log in to add items to the wishlist.");
            navigate("/login");
            return;
        }

        if (wishList.some(item => item.toString() === productId.toString())) { await api.delete(`/wishlist/deleteWishList/${productId}`); }
        else { await api.post("/wishlist/createWishList", { userId: user.userEmail._id, productId }); }
        wishlistRefresh();
    };

    return (
        <div className="user-view-container">
            <h2 className="user-view-title">Explore Products</h2>
            <div className="card-grid">
                {products.map((item, index) => (
                    <div className="product-card" key={index}
                        onClick={() => navigate(`/userDashboard/product/${item._id}`)}
                        // item.productId._id
                        style={{ cursor: 'pointer' }}
                    >
                        <div className="product-image">
                            {/* Optional image placeholder */}

                            <img src={item.productId.Image} style={{ border: '3px solid red', height: '100%', width: '100%' }} />
                        </div>
                        <div className="product-info">
                            <h3>{item.productId.Name}</h3>
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
                            {/* <p><strong>Size:</strong> {item.Size}</p>
                            <p><strong>Price:</strong> ₹{item.Price}</p>
                            <p><strong>Qty:</strong> {item.Quantity}</p>
                            <p><strong>Brand:</strong> {item.BrandName}</p> */}
                        </div>
                        <div className="product-actions">
                            <button onClick={(e) => { e.stopPropagation(); handleCart(item.productId._id); }}>
                                {cart.some(c => c.toString() === item.productId._id.toString()) ? "Remove from Cart" : "Add to Cart"}
                            </button>
                            <button onClick={(e) => { e.stopPropagation(); handleWishlist(item.productId._id); }}>
                                {wishList.some(w => w.toString() === item.productId._id.toString()) ? "Remove from Wishlist" : "Add to Wishlist"}
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default UserView;
