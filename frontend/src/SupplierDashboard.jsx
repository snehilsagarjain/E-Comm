// import React from 'react'
// import { href, Link, Outlet, useNavigate } from 'react-router-dom'

// const SupplierDashboard = () => {
//     const navigate = useNavigate();
//     return (
//         <div>
//             <div>Supplier</div>
//             <div>
//                 <div>
//                     <Link to="/supplierDashboard"><button>Active Products</button></Link>
//                     {/* onClick={() => navigate('/supplierDashboard')} */}
//                     {/* <a href="/supplierDashboard/inactiveProducts">
//                         <button onClick={() => { href = ('/supplierDashboard/inactiveProducts') }}>InActive Products</button>
//                     </a> */}
//                     <Link to="/supplierDashboard/inactiveProducts"><button>InActive Products</button></Link>
//                     {/* onClick={() => navigate('/supplierDashboard/inactiveProducts')} */}
//                     <Link to="/supplierDashboard/addProduct"><button >Add Product</button></Link>
//                     {/* onClick={() => { navigate('/supplierDashboard/addProduct') }} */}

//                     <Link to="/supplierDashboard/order"><button >My Orders</button></Link>
//                 </div>
//                 <div>
//                     <Outlet />
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default SupplierDashboard


// // import axios from 'axios';
// import React, { useEffect, useState } from 'react'
// import { href, Link, Navigate, Outlet, useNavigate } from 'react-router-dom'
// import "./UserDashboard/UserDashboard.css";
// // import "./UserDashboard.css";
// const SupplierDashboard = () => {

//     const [isCollapsed, setIsCollapsed] = useState(false);
//     const toggleSidebar = () => { setIsCollapsed(!isCollapsed); };
//     const user = JSON.parse(localStorage.getItem("user"));
//     const navigate = useNavigate();
//     return (

//         <>
//             {/* <div style={{ flex: 1, background: 'lightgray', border: '1px solid black' }}> */}
//             {/* <div style={{ display: 'flex', width: '100vw', height: '87vh' }}> */}
//             {/* flex: 1, */}
//             {/* , overflow: 'hidden', */}
//             {/* height: '100vh',  */}
//             {/* Sidebar */}
//             <div
//                 style={{
//                     width: isCollapsed ? '60px' : '250px',
//                     backgroundColor: '#1D2125',
//                     color: 'white',
//                     height: '100%',
//                     display: 'flex',
//                     flexDirection: 'column',
//                     transition: 'width 0.3s ease',
//                     flexShrink: 0,
//                     border: 'red solid 2px'
//                 }}
//             >
//                 {/* , border: 'blue solid 2px' */}
//                 {/* Sidebar Header */}
//                 <div style={{ padding: isCollapsed ? '22px' : '10px', backgroundColor: '#111', position: 'relative' }}>
//                     <div> {isCollapsed ? "" : user?.token && user.userEmail.role} </div>
//                     <div
//                         onClick={toggleSidebar}
//                         style={{
//                             cursor: 'pointer',
//                             position: 'absolute',
//                             top: '10px',
//                             right: '-10px',
//                             background: 'black',
//                             borderRadius: '50%',
//                             padding: '2px 6px',
//                             zIndex: 999,
//                         }}
//                     >
//                         <b> {isCollapsed ? '>' : '<'} </b>
//                     </div>
//                 </div>

//                 {/* Sidebar Scrollable Content */}
//                 <div
//                     style={{
//                         flex: 1,
//                         overflowY: 'auto',
//                         scrollbarWidth: 'none',         // Firefox
//                         msOverflowStyle: 'none',        // IE/Edge

//                         padding: '10px',
//                         display: 'flex',
//                         flexDirection: 'column',
//                         gap: '10px',
//                     }} className="scroll-container"      // For webkit-based hiding via CSS
//                 >

//                     {/* {
//                         isCollapsed ?
//                             <button style={{ ...avatarStyle }}> P </button> :
//                             <button style={{ width: '100%' }} onClick={() => { navigate("/user/supplierDashboard") }}> All Products </button>
//                     } */}
//                     {
//                         isCollapsed ?
//                             <button style={{ ...avatarStyle }}> A </button> :
//                             <button style={{ width: '100%', backgroundColor: 'rgba(255,255,255,0.1)' }} onClick={() => { navigate("/supplierDashboard/") }}> Active Products </button>
//                         // <button style={{ width: '100%' }} onClick={() => { navigate("/user/supplierDashboard/") }}> Active Products </button>
//                     }
//                     {
//                         isCollapsed ?
//                             <button style={{ ...avatarStyle }}> I </button> :
//                             <button style={{ width: '100%', backgroundColor: 'rgba(255,255,255,0.1)' }} onClick={() => { navigate("/supplierDashboard/inactiveProducts") }}> InActive Products </button>
//                         // <button style={{ width: '100%' }} onClick={() => { navigate("/user/supplierDashboard/inactiveProducts") }}> InActive Products </button>
//                     }
//                     {
//                         isCollapsed ?
//                             <button style={{ ...avatarStyle }}> N </button> :
//                             <button style={{ width: '100%', backgroundColor: 'rgba(255,255,255,0.1)' }} onClick={() => { navigate("/supplierDashboard/addProduct") }}> Add Product </button>
//                         // <button style={{ width: '100%' }} onClick={() => { navigate("/user/supplierDashboard/addProduct") }}> Add Product </button>
//                     }
//                     {
//                         isCollapsed ?
//                             <button style={{ ...avatarStyle }}> O </button> :
//                             <button style={{ width: '100%', backgroundColor: 'rgba(255,255,255,0.1)' }} onClick={() => { navigate("/supplierDashboard/order") }}> My Orders </button>
//                         // <button style={{ width: '100%' }} onClick={() => { navigate("/user/supplierDashboard/order") }}> My Orders </button>
//                     }
//                 </div>
//             </div>

//             {/* Main Content */}
//             <div
//                 style={{
//                     flex: 1,
//                     // height: '100%',
//                     overflowY: 'auto',
//                     padding: '1rem',
//                     background: '#f9f9f9',
//                     border: 'orange solid 2px',

//                     // flex: 1,
//                     // height: '100%',
//                     overflow: 'auto', // this is the key
//                     // padding: '1rem',
//                     // background: '#f9f9f9',
//                     // border: 'orange solid 2px',
//                     boxSizing: 'border-box',
//                 }}
//             >
//                 <div style={{ minHeight: '100%', height: 'fit-content' }}> <Outlet /> </div>
//                 {/* <Outlet /> */}
//                 {/* </div> */}
//             </div>
//         </>

//     )
// }
// const avatarStyle = {
//     width: '36px',
//     height: '36px',
//     borderRadius: '50%',
//     backgroundColor: '#fff',
//     color: '#2a5298',
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center',
//     fontWeight: 'bold',
// };
// export default SupplierDashboard

// import React, { useState } from 'react';
// import { Outlet, useNavigate } from 'react-router-dom';
// import './UserDashboard.css';
import React, { useEffect, useState } from 'react'
import { href, Link, Navigate, Outlet, useNavigate } from 'react-router-dom'
import "./UserDashboard/UserDashboard.css";

const SupplierDashboard = () => {
    const [isCollapsed, setIsCollapsed] = useState(false);       // controlled via toggle
    const [isHovered, setIsHovered] = useState(false);           // hovered temp open

    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user'));

    // Sidebar width logic
    const shouldExpand = !isCollapsed || isHovered;

    return (
        <>
            {/* <div> */}
            {/* style={{ display: 'flex' }} */}
            {/* Sidebar */}
            <div
                onMouseEnter={() => isCollapsed && setIsHovered(true)}
                onMouseLeave={() => isCollapsed && setIsHovered(false)}
                style={{
                    width: shouldExpand ? '250px' : '80px',
                    // width: isCollapsed ? '60px' : '250px',
                    backgroundColor: '#1D2125',
                    color: 'white',
                    // height: '100vh',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'width 0.3s ease',
                    flexShrink: 0,
                    // position: 'sticky',
                    // top: 0,
                    borderRight: '2px solid red',
                }}
            >
                {/* Header with toggle */}
                <div
                    style={{
                        // padding: '10px',
                        backgroundColor: '#111',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        // padding: isCollapsed ? '22px' : '10px',
                        padding: !shouldExpand ? '22px' : '10px',
                        // backgroundColor: '#111',
                        position: 'relative'
                    }}
                >
                    {/* <div> {isCollapsed ? "" : user?.token && user.userEmail.role} </div> */}
                    {!shouldExpand ? null :
                        <>
                            <div>{user?.token && user.userEmail.role}</div>
                            {/* Toggle Button */}
                            <button
                                onClick={() => {
                                    setIsCollapsed(!isCollapsed);
                                    setIsHovered(false); // reset hover state
                                }}
                                style={{
                                    background: 'transparent',
                                    border: 'none',
                                    color: '#fff',
                                    cursor: 'pointer',
                                    fontSize: '1.2rem',
                                    marginLeft: 'auto',

                                    // // cursor: 'pointer',
                                    // position: 'absolute',
                                    // top: '10px',
                                    // right: '-10px',
                                    // // background: 'black',
                                    // borderRadius: '50%',
                                    // padding: '2px 6px',
                                    // zIndex: 999,
                                }}
                            >
                                <b> {isCollapsed ? '>' : '<'} </b>
                                {/* {isCollapsed ? '›' : '‹'} */}
                            </button>
                        </>
                    }
                </div>

                {/* Sidebar Links */}
                <div
                    style={{
                        flex: 1,
                        overflowY: 'auto',
                        scrollbarWidth: 'none',         // Firefox
                        msOverflowStyle: 'none',        // IE/Edge
                        padding: '10px',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '10px',
                    }} className="scroll-container"      // For webkit-based hiding via CSS
                >
                    {menuItems.map(({ label, route, shortLabel }) => (
                        <button
                            key={label}
                            onClick={() => navigate(route)}
                            style={{
                                width: '100%',
                                backgroundColor: 'rgba(255,255,255,0.1)',
                                // backgroundColor: '#fff',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: shouldExpand ? 'flex-start' : 'center',
                                padding: '10px',
                                border: 'none',
                                color: 'white',
                                // color: '#2a5298',
                                cursor: 'pointer',
                                borderRadius: '5px',

                                // height: '36px',
                                fontWeight: 'bold',
                            }}
                        >
                            {shouldExpand ? label : <div style={avatarStyle}>{shortLabel}</div>}
                        </button>
                    ))}
                </div>
            </div>

            {/* Main Content */}
            <div
                style={{
                    flex: 1,
                    overflowY: 'auto',
                    padding: '1rem',
                    background: '#f9f9f9',
                    // minHeight: '100vh',
                    border: '2px solid orange',
                    boxSizing: 'border-box',


                    // flex: 1,
                    // height: '100%',
                    // overflowY: 'auto',
                    // padding: '1rem',
                    // background: '#f9f9f9',
                    // border: 'orange solid 2px',

                    // flex: 1,
                    // height: '100%',
                    overflow: 'auto', // this is the key
                    // padding: '1rem',
                    // background: '#f9f9f9',
                    // border: 'orange solid 2px',
                    // boxSizing: 'border-box',
                }}
            >
                {/* <Outlet /> */}
                <div style={{ minHeight: '100%', height: 'fit-content' }}> <Outlet /> </div>
            </div>
            {/* </div> */}
        </>
    );
};

// Sidebar Buttons
const menuItems = [
    { label: 'All Active Products', route: '/supplierDashboard', shortLabel: 'A' },
    { label: 'All InActive Products', route: '/supplierDashboard/inactiveProducts', shortLabel: 'I' },
    { label: 'Add Product', route: '/supplierDashboard/addProduct', shortLabel: 'N' },
    { label: 'My Orders', route: '/supplierDashboard/order', shortLabel: 'O' },
];

const avatarStyle = {
    width: '36px',
    height: '36px',
    borderRadius: '50%',
    backgroundColor: '#fff',
    color: '#2a5298',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 'bold',
};

export default SupplierDashboard;