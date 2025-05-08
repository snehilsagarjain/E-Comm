// // // // // import axios from 'axios';
// // // // import React, { useEffect, useState } from 'react'
// // // // import api from './api';
// // // // import { Edit3, Trash, Trash2 } from 'lucide-react';

// // // // const AdminView = () => {
// // // //     const [products, setProducts] = useState([]);
// // // //     useEffect(() => {
// // // //         const fetchProducts = async () => {
// // // //             try {
// // // //                 const response = await api.get('http://localhost:6080/product/getAllProducts');
// // // //                 if (Array.isArray(response.data)) {
// // // //                     setProducts(response.data);
// // // //                 } else {
// // // //                     console.error('Data is not an array:', response.data);
// // // //                     setProducts([]);
// // // //                 }
// // // //             } catch (error) {
// // // //                 console.error('Error fetching products:', error);
// // // //             }
// // // //         };
// // // //         fetchProducts();
// // // //     }, []);
// // // //     console.log(`products:`, products);

// // // //     return (
// // // //         <>
// // // //             <div>adminView</div>
// // // //             <div>
// // // //                 {
// // // //                     products.map((item, index) => (
// // // //                         console.log(item),
// // // //                         console.log(item.Name),

// // // //                         <div>
// // // //                             <div style={{ border: '1px solid red' }}> {item.Name}, {item.Color}, {item.Size} </div>
// // // //                             <div> {item.Price}, {item.Quantity}, {item.BrandName} </div>
// // // //                             {/* <div> {item.Status} </div> */}
// // // //                             {/* <button> Add To Cart </button> */}
// // // //                             <button
// // // //                             // className="absolute top-4 right-4 p-2 bg-gray-200 hover:bg-gray-300 rounded-full transition"
// // // //                             >
// // // //                                 <Edit3 />
// // // //                             </button>
// // // //                             {/* className="w-5 h-5 text-gray-600" */}

// // // //                             {/* Soft Delete Button */}
// // // //                             <button
// // // //                             // onClick={handleSoftDelete}
// // // //                             // className="absolute top-4 right-12 p-2 bg-gray-200 hover:bg-gray-300 rounded-full transition"
// // // //                             >
// // // //                                 <Trash />
// // // //                             </button>
// // // //                             {/* className="w-5 h-5 text-gray-600" */}

// // // //                             {/* Hard Delete Button */}
// // // //                             <button
// // // //                             // onClick={handleHardDelete}
// // // //                             // className="absolute top-4 right-4 p-2 bg-gray-200 hover:bg-gray-300 rounded-full transition"
// // // //                             >
// // // //                                 <Trash2 />
// // // //                             </button>
// // // //                             {/* className="w-5 h-5 text-gray-600" */}

// // // //                         </div>
// // // //                     ))
// // // //                 }
// // // //             </div>
// // // //         </>
// // // //     )
// // // // }

// // // // export default AdminView
//==========================================================================================
// import React, { useEffect, useRef, useState } from 'react'

// const adminView = () => {
//     const dropdownOptions = {
//         //[ // {
//         dashboard: ['CRM', 'Analytics', 'Ecommerce', 'Team', 'Vendor', 'AI Chatbot'] // }
//         , // {
//         apps: [ // 'Chatapp', // 'Todo',
//             { staff: ['Team Profile', 'Team Add', 'Team Update', 'Team List'] },
//             { eCommerce: ['Product List', 'Add Product', 'Add Category', 'Add Sub Category', 'Order List'] },
//             { Project: ['Project List', 'Overview', 'Create Project'] }
//         ]
//         // }
//         ,
//     };
//     // ];

//     const [openDropdown, setOpenDropdown] = useState(null); // 'country', 'language', or 'theme'
//     const [selectedValues, setSelectedValues] = useState({ country: '', language: '', theme: '' });
//     const dropdownRefs = { country: useRef(null), language: useRef(null), theme: useRef(null) };

//     // Close dropdown on outside click
//     useEffect(() => {
//         const handleClickOutside = (e) => {
//             if (openDropdown && dropdownRefs[openDropdown] && !dropdownRefs[openDropdown].current.contains(e.target)) {
//                 setOpenDropdown(null);
//             }
//         };
//         document.addEventListener('mousedown', handleClickOutside);
//         return () => document.removeEventListener('mousedown', handleClickOutside);
//     }, [openDropdown]);

//     const toggleDropdown = (type) => { setOpenDropdown(prev => (prev === type ? null : type)); };

//     const handleSelect = (type, value) => {
//         setSelectedValues(prev => ({ ...prev, [type]: value }));
//         setOpenDropdown(null);
//     };

//     // function func(x) {
//     //     return (
//     //         x.map((option, idx) => {            // 'apps', 'Chatapp', 'Todo', {dashboard: []}, {apps: [{ },{ },{ },...]}, ...

//     //             if (typeof option === 'string') {    // 'apps', 'Chatapp', 'Todo',
//     //                 { /* lower-left[dashboard]-top */ }
//     //                 return (
//     //                     <div key={idx} onClick={() => handleSelect(type, option)}
//     //                         style={
//     //                             {
//     //                                 padding: '0.5rem 1rem',
//     //                                 cursor: 'pointer',
//     //                                 borderBottom: idx !== value.length - 1 ? '1px solid #eee' : 'none',
//     //                                 backgroundColor: selectedValues[key] === option ? '#e6f7ff' : '#fff'
//     //                             }
//     //                         }
//     //                         onMouseEnter={(e) => (e.target.style.background = '#f0f0f0')}
//     //                         onMouseLeave={
//     //                             (e) => (e.target.style.background = selectedValues[key] === option ? '#e6f7ff' : '#fff')
//     //                         }
//     //                     >
//     //                         {option}
//     //                     </div>
//     //                 );
//     //             }
//     //             else if (typeof option === 'object') {    //  {dashboard: []}, {apps: [{ },{ },{ },...]}, ...
//     //                 const [key, value] = Object.enteries(option)[0];
//     //                 // [ [dashboard,[]] ], [ [apps,[{staff: []},{eCommerce: []},{Project: []},...]] ], ...    -> array of key-value pairs

//     //                 func(value);
//     //                 // // v = object.values(option);
//     //                 // value.map((option, idx) => {   // ['','', ...], [{staff: [...]},{eCommerce: [...]},{Project: [...]},...], ...
//     //                 //     if (typeof option === 'string') {    // '', '', '',
//     //                 //         return (
//     //                 //             <div key={idx} onClick={() => handleSelect(type, option)}
//     //                 //                 style={
//     //                 //                     {
//     //                 //                         padding: '0.5rem 1rem',
//     //                 //                         cursor: 'pointer',
//     //                 //                         borderBottom: idx !== value.length - 1 ? '1px solid #eee' : 'none',
//     //                 //                         backgroundColor: selectedValues[key] === option ? '#e6f7ff' : '#fff'
//     //                 //                     }
//     //                 //                 }
//     //                 //                 onMouseEnter={(e) => (e.target.style.background = '#f0f0f0')}
//     //                 //                 onMouseLeave={
//     //                 //                     (e) => (e.target.style.background = selectedValues[key] === option ? '#e6f7ff' : '#fff')
//     //                 //                 }
//     //                 //             >
//     //                 //                 {option}
//     //                 //             </div>
//     //                 //         );
//     //                 //     }
//     //                 //     else if (typeof option === 'object') {    // {staff: []},{eCommerce: []},{Project: []},...
//     //                 //     }
//     //                 // })
//     //             }
//     //         })
//     //     );
//     // }



// return (
//     <div style={{ display: 'flex', flexDirection: 'column', width: '100vw', height: '100vh', border: '1px solid black', }}>
//         <div style={{ display: 'flex', alignItems: 'center', position: 'sticky', top: '0px', border: '1px solid green', padding: '10px 20px' }}>
//             <div style={{ width: '200px' }}><img src={'/full-logo.png'} /> </div>
//             <div> <input type='text' placeholder='Search...' /> </div>
//             <div></div>
//         </div>
//         <div style={{ display: 'flex', flex: '1', border: '1px solid blue' }}>
//             <div style={{ border: '5px solid orange', width: '200px' }}>                             {/* lower-left */}


//                 <div style={
//                     {
//                         // height: isCollapsed ? '0px' : '250px',
//                         display: 'flex',
//                         flexDirection: 'column',
//                         transition: 'height 0.3s ease',
//                         flexShrink: 0,
//                         padding: '10px'
//                     }
//                 }

//                     ref={
//                         dropdownRefs["dashboard"]
//                     }

//                 > {
//                         /* onClick={() => { setToggle(!toggle) }} */
//                     }

//                     {
//                         /* lower-left[dashboard]-top */
//                     }

//                     <div style={
//                         {
//                             // padding: isCollapsed ? '22px' : '10px',
//                             // backgroundColor: '#111',
//                             position: 'relative',
//                             display: 'flex',
//                             justifyContent: 'space-between'
//                         }
//                     }

//                         onClick={
//                             () => toggleDropdown("dashboard")
//                         }

//                     ><span>Dashboard</span><span> {
//                         ">"
//                     }

//                         </span></div> {
//                         /* lower-left[dashboard]-bottom */
//                     }

//                     {
//                         (<div style={
//                             {
//                                 maxHeight: openDropdown === "dashboard" ? '500px' : '0px',
//                                 overflow: 'hidden',
//                                 transition: 'max-height 0.3s ease',
//                             }
//                         }

//                         > {
//                                 dropdownOptions["dashboard"].map((option, idx) => (<div key={
//                                     idx
//                                 }

//                                     onClick={
//                                         () => handleSelect("dashboard", option)
//                                     }

//                                     style={
//                                         {
//                                             padding: '0.5rem 1rem',
//                                             cursor: 'pointer',
//                                             borderBottom: idx !== dropdownOptions["dashboard"].length - 1 ? '1px solid #eee' : 'none',
//                                             backgroundColor: selectedValues["dashboard"] === option ? '#e6f7ff' : '#fff'
//                                         }
//                                     }

//                                     onMouseEnter={
//                                         (e) => (e.target.style.background = '#f0f0f0')
//                                     }

//                                     onMouseLeave={
//                                         (e) => (e.target.style.background = selectedValues["dashboard"] === option ? '#e6f7ff' : '#fff')
//                                     }

//                                 > {
//                                         option
//                                     }

//                                 </div>))
//                             }

//                         </div>)
//                     }

//                 </div><div><div>Apps</div><div>Chatapp</div><div>Todo</div> {
//                     /* lower-left[apps] */
//                 }

//                     {
//                         dropdownOptions["apps"].map((option, idx) => {
//                             const [key, value] = Object.entries(option)[0]; // 👈 grab first and only entry
//                             console.log(key);

//                             console.log(value);
//                             return (<div style={
//                                 {
//                                     // height: isCollapsed ? '0px' : '250px',
//                                     display: 'flex',
//                                     flexDirection: 'column',
//                                     transition: 'height 0.3s ease',
//                                     flexShrink: 0,
//                                     padding: '10px'
//                                 }
//                             }

//                                 ref={
//                                     dropdownRefs[key]
//                                 }

//                             // style={{ marginBottom: '1.5rem', position: 'relative', width: '200px' }}
//                             > {
//                                     /* lower-left[dashboard]-top */
//                                 }

//                                 <div style={
//                                     {
//                                         // padding: isCollapsed ? '22px' : '10px',
//                                         // backgroundColor: '#111',
//                                         position: 'relative',
//                                         display: 'flex',
//                                         justifyContent: 'space-between'
//                                     }
//                                 }

//                                     // onClick={() => { setToggle(!toggle) }}
//                                     onClick={
//                                         () => toggleDropdown(key)
//                                     }

//                                 > <span> {
//                                     key
//                                 }

//                                     </span><span> {
//                                         ">"
//                                     }

//                                     </span> </div> {
//                                     /* lower-left[dashboard]-bottom */
//                                 }

//                                 {
//                                     // openDropdown === key &&
//                                     (console.log(`403key:`, key),

//                                         <div style={
//                                             {
//                                                 // flex: 1,
//                                                 // overflowY: 'auto'

//                                                 maxHeight: openDropdown === key ? '500px' : '0px',
//                                                 overflow: 'hidden',
//                                                 transition: 'max-height 0.3s ease',

//                                                 // position: 'absolute',
//                                                 // top: '105%',
//                                                 // left: 0,
//                                                 // right: 0,
//                                                 // backgroundColor: '#fff',
//                                                 // border: '1px solid #ccc',
//                                                 // borderRadius: '6px',
//                                                 // boxShadow: '0px 4px 8px rgba(0,0,0,0.1)',
//                                                 // zIndex: 10
//                                             }
//                                         }

//                                         >
//                                             {console.log(`406key:`, key)},
//                                             {

//                                                 //dropdownOptions["apps"][key] or value
//                                                 value.map((option, idx) => (<div key={
//                                                     idx
//                                                 }

//                                                     onClick={
//                                                         () => handleSelect(type, option)
//                                                     }

//                                                     style={
//                                                         {
//                                                             padding: '0.5rem 1rem',
//                                                             cursor: 'pointer',
//                                                             borderBottom: idx !== value.length - 1 ? '1px solid #eee' : 'none',
//                                                             backgroundColor: selectedValues[key] === option ? '#e6f7ff' : '#fff'
//                                                         }
//                                                     }

//                                                     onMouseEnter={
//                                                         (e) => (e.target.style.background = '#f0f0f0')
//                                                     }

//                                                     onMouseLeave={
//                                                         (e) => (e.target.style.background = selectedValues[key] === option ? '#e6f7ff' : '#fff')
//                                                     }

//                                                 > {
//                                                         option
//                                                     }

//                                                 </div>))
//                                             },
//                                             {console.log(`403key:`, key)}
//                                         </div>)
//                                 }

//                             </div>);
//                         })
//                     }

//                     {
//                         /* <renderDropdown /> */
//                     }

//                 </div>

//             </div>
//             <div style={{ border: '5px solid pink', display: 'flex', flexDirection: 'column', flex: '1' }}>
//                 <div style={{ border: '1px solid red', display: 'flex', justifyContent: 'space-between' }}>
//                     <div style={{ border: '1px solid brown', display: 'flex', flexDirection: 'column' }}>
//                         <div>
//                             eCommerce
//                         </div>
//                         <div>
//                             {"Finx > eCommerce"}
//                         </div>
//                     </div>
//                     <div style={{ border: '1px solid brown' }}>
//                         <div></div>
//                         <div></div>
//                         <div></div>
//                     </div>
//                 </div>
//                 <div style={{ border: '1px solid purple', display: 'flex', flex: '1' }}>
//                     <div style={{ width: '50%', display: 'flex', flexDirection: 'column' }}>
//                         <div>
//                             {/* marquee */}
//                         </div>
//                         <div style={{ display: 'flex', flexWrap: 'wrap' }}>
//                             <div style={{ display: 'flex', flexDirection: 'column', width: '50%' }}>
//                                 <div>
//                                     <div>Customers</div>
//                                     <div></div>
//                                     <div></div>
//                                 </div>
//                                 <div>
//                                     {/* icon */}
//                                 </div>
//                             </div>
//                             <div style={{ display: 'flex', flexDirection: 'column', width: '50%' }}>
//                                 <div>
//                                     <div> Order </div>
//                                     <div></div>
//                                     <div></div>
//                                 </div>
//                                 <div>
//                                     {/* icon */}
//                                 </div>
//                             </div>
//                             <div style={{ display: 'flex', flexDirection: 'column', width: '50%' }}>
//                                 <div>
//                                     <div> Revenue </div>
//                                     <div></div>
//                                     <div></div>
//                                 </div>
//                                 <div>
//                                     {/* icon */}
//                                 </div>
//                             </div>
//                             <div style={{ display: 'flex', flexDirection: 'column', width: '50%' }}>
//                                 <div>
//                                     <div> Expenses </div>
//                                     <div></div>
//                                     <div></div>
//                                 </div>
//                                 <div>
//                                     {/* icon */}
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                     <div style={{ width: '50%' }}>
//                         {/* chart */}
//                     </div>
//                 </div>
//                 <div style={{ border: '1px solid purple', display: 'flex', flex: '1' }}>
//                     <div style={{ width: '50%' }}>
//                         {/* chart */}
//                     </div>
//                     <div style={{ width: '50%' }}>
//                         {/* chart */}
//                     </div>
//                 </div>
//                 <div style={{ border: '1px solid purple', display: 'flex', flex: '1' }}>
//                     <div style={{ width: '50%' }}>
//                         {/* chart */}
//                     </div>
//                     <div></div>
//                 </div>
//                 <div style={{ border: '1px solid purple', display: 'flex', flex: '1' }}>
//                     <div style={{ width: '50%' }}>
//                         {/* chart */}
//                     </div>
//                     <div> style={{ width: '50%' }}
//                         {/* chart */}
//                     </div>
//                 </div>
//             </div>        {/* lower-right */}
//             {console.log(`403key:`,)}
//         </div>
//     </div>
//     // </div >
// )
// }

// export default adminView
//===============================================


// // src/App.jsx
// import React from "react";
// import Sidebar from "./components/Sidebar";
// import Topbar from "./components/Topbar";
// import DashboardCards from "./components/DashboardCards";
// import SalesChart from "./components/SalesChart";
// import OrdersTable from "./components/OrdersTable";

// const adminView = () => {
//     return (
//         // <div className="flex bg-gray-100">
//         <div style={{ display: 'flex', flexDirection: 'column', width: '100vw', height: '99vh', border: '1px solid black', }}>
//             <div style={{ display: 'flex', alignItems: 'center', position: 'sticky', top: '0px', border: '1px solid green', padding: '10px 20px' }}>
//                 <div style={{ width: '200px' }}><img src={'/full-logo.png'} /> </div>
//                 <div> <input type='text' placeholder='Search...' /> </div>
//                 <div></div>
//             </div>
//             <div style={{ display: 'flex', flex: '1', border: '1px solid blue' }}>
//                 <div style={{ border: '5px solid orange' }}>
//                     {/* , width: '200px' */}
//                     <Sidebar />
//                 </div>
//                 <div style={{ border: '5px solid pink', }} className="flex-1 p-6">
//                     {/* display: 'flex', flexDirection: 'column', flex: '1' */}
//                     <div style={{ border: '1px solid red', display: 'flex', justifyContent: 'space-between' }}>
//                         <div style={{ border: '1px solid brown', display: 'flex', flexDirection: 'column' }}>
//                             <div>
//                                 eCommerce
//                             </div>
//                             <div>
//                                 {"Finx > eCommerce"}
//                             </div>
//                         </div>
//                         <div style={{ border: '1px solid brown' }}>
//                             <div></div>
//                             <div></div>
//                             <div></div>
//                         </div>
//                     </div>
//                     <div style={{ border: '6px solid purple', display: 'flex', flex: '1' }}>
//                         <div style={{ width: '50%', display: 'flex', flexDirection: 'column' }}>
//                             <div style={{ width: '100%', height: '100%', border: '1px solid black' }}>
//                                 <></>
//                                 {/* marquee */}
//                             </div>
//                             <DashboardCards />
//                             {/* <div style={{ display: 'flex', flexWrap: 'wrap' }}>
//                                 <div style={{ display: 'flex', flexDirection: 'column', width: '50%' }}>
//                                     <div>
//                                         <div>Customers</div>
//                                         <div></div>
//                                         <div></div>
//                                     </div>
//                                     <div>
//                                         <></>
//                                         {/* icon */}{/*
//                                     </div>
//                                 </div>
//                                 <div style={{ display: 'flex', flexDirection: 'column', width: '50%' }}>
//                                     <div>
//                                         <div> Order </div>
//                                         <div></div>
//                                         <div></div>
//                                     </div>
//                                     <div>
//                                         <></>
//                                         {/* icon */}{/*
//                                     </div>
//                                 </div>
//                                 <div style={{ display: 'flex', flexDirection: 'column', width: '50%' }}>
//                                     <div>
//                                         <div> Revenue </div>
//                                         <div></div>
//                                         <div></div>
//                                     </div>
//                                     <div>
//                                         <></>
//                                         {/* icon */}{/*
//                                     </div>
//                                 </div>
//                                 <div style={{ display: 'flex', flexDirection: 'column', width: '50%' }}>
//                                     <div>
//                                         <div> Expenses </div>
//                                         <div></div>
//                                         <div></div>
//                                     </div>
//                                     <div>
//                                         <></>
//                                         {/* icon */}{/*
//                                     </div>
//                                 </div>
//                             </div> */}
//                         </div>
//                         <div style={{ width: '50%' }}>
//                             <SalesChart />
//                             {/* chart */}
//                         </div>
//                     </div>
//                     <div style={{ border: '1px solid purple', display: 'flex', flex: '1' }}>
//                         <div style={{ width: '50%' }}>
//                             <></>
//                             {/* chart */}
//                         </div>
//                         <div style={{ width: '50%' }}>
//                             <></>
//                             {/* chart */}
//                         </div>
//                     </div>
//                     <div style={{ border: '1px solid purple', display: 'flex', flex: '1' }}>
//                         <div style={{ width: '50%' }}>
//                             <></>
//                             {/* chart */}
//                         </div>
//                         <div></div>
//                     </div>
//                     <div style={{ border: '1px solid purple', display: 'flex', flex: '1' }}>
//                         <div style={{ width: '50%' }}>
//                             <></>
//                             {/* chart */}
//                         </div>
//                         <div style={{ width: '50%' }}>
//                             <></>
//                             {/* chart */}
//                         </div>
//                     </div>


//                     <main className="flex-1 p-6 overflow-y-auto">
//                         {/* <Topbar />
//                         <DashboardCards /> */}
//                         <SalesChart />
//                         <OrdersTable />
//                     </main>
//                 </div>        {/* lower-right */}
//             </div>
//         </div>
//         // </div >
//     );
// };

// export default adminView;
// /* {func(dropdownOptions)} */

// src/App.jsx
import React from "react";
import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";
import DashboardCards from "./components/DashboardCards";
import SalesChart from "./components/SalesChart";
import OrdersTable from "./components/OrdersTable";
import { motion } from "framer-motion";
import CostingProfitChart from "./components/CostingProfitChart";

const App = () => {
    return (
        <div className="flex bg-gray-100 h-screen overflow-hidden" style={{ width: '100vw' }}>
            <Sidebar />
            <motion.main
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="flex-1 p-6 overflow-y-auto min-h-screen bg-gray-100"
            >
                <Topbar />
                <div style={{ border: '2px solid yellow' }}>
                    <div style={{ display: 'flex' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', width: '50%', margin: '10px' }}>
                            <div style={{ height: '50%', margin: '10px', }}>
                                <DashboardCards />
                            </div>
                            <div style={{ height: '50%', margin: '10px', }}>
                                <DashboardCards />
                            </div>
                        </div>
                        <div style={{ margin: '10px', width: '50%', }}>
                            {/* <SalesChart /> */}
                            <CostingProfitChart />
                        </div>
                    </div>
                    <div style={{ margin: '10px', }}>
                        <SalesChart />
                    </div>
                    <div style={{ margin: '10px' }}>
                        <OrdersTable />
                    </div>
                </div>
            </motion.main >
        </div >
    );
};

export default App;
