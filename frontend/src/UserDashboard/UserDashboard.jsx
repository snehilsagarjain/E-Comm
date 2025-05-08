// import axios from 'axios';
// import React, { useEffect, useState } from 'react'
// import { Link, Navigate, Outlet, useNavigate } from 'react-router-dom'
// import "./UserDashboard.css";
// const UserDashboard = () => {
//     const [isCollapsed, setIsCollapsed] = useState(false);
//     const toggleSidebar = () => { setIsCollapsed(!isCollapsed); };
//     const user = JSON.parse(localStorage.getItem("user"));
//     const navigate = useNavigate();
//     // Sidebar width logic
//     const shouldExpand = !isCollapsed || isHovered;
//     return (
//         <>
//             {/* <div style={{ flex: 1, background: 'lightgray', border: '1px solid black' }}> */}
//             {/* <div style={{ display: 'flex', width: '100vw', height: '87vh' }}> */}
//             {/* flex: 1, */}
//             {/* , overflow: 'hidden', */}
//             {/* height: '100vh',  */}
//             {/* Sidebar */}
//             <div
//                 // onMouseEnter={() => setIsCollapsed(!isCollapsed)}
//                 // onMouseLeave={() => setIsCollapsed(!isCollapsed)}
//                 // style={{
//                 //     width: isCollapsed ? '60px' : '250px',

//                 //     backgroundColor: '#1D2125',
//                 //     color: 'white',

//                 //     height: '100%',

//                 //     display: 'flex',
//                 //     flexDirection: 'column',
//                 //     transition: 'width 0.3s ease',
//                 //     flexShrink: 0,

//                 //     border: 'red solid 2px'
//                 // }}
//                 onMouseEnter={() => isCollapsed && setIsHovered(true)}
//                 onMouseLeave={() => isCollapsed && setIsHovered(false)}
//                 style={{
//                     width: shouldExpand ? '250px' : '80px',
//                     // width: isCollapsed ? '60px' : '250px',
//                     backgroundColor: '#1D2125',
//                     color: 'white',
//                     // height: '100vh',
//                     height: '100%',
//                     display: 'flex',
//                     flexDirection: 'column',
//                     transition: 'width 0.3s ease',
//                     flexShrink: 0,
//                     // position: 'sticky',
//                     // top: 0,
//                     borderRight: '2px solid red',
//                 }}
//             >
//                 {/* , border: 'blue solid 2px' */}
//                 {/* Sidebar Header */}
//                 <div style={{ padding: isCollapsed ? '22px' : '10px', backgroundColor: '#111', position: 'relative' }}>
//                     <div> {isCollapsed ? "" : user?.token && user.userEmail.role} </div>
//                     {/* <div
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
//                     </div> */}
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
//                     {
//                         isCollapsed ?
//                             <button style={{ ...avatarStyle }}> P </button> :
//                             <button style={{ width: '100%', backgroundColor: 'rgba(255,255,255,0.1)' }} onClick={() => { navigate("/userDashboard") }}> All Products </button>
//                         // <button style={{ width: '100%' }} onClick={() => { navigate("/user/userDashboard") }}> All Products </button>
//                     }
//                     {
//                         isCollapsed ?
//                             <button style={{ ...avatarStyle }}> W </button> :
//                             <button style={{ width: '100%', backgroundColor: 'rgba(255,255,255,0.1)' }} onClick={() => { navigate("/userDashboard/wishList") }}> My Wishlist </button>
//                         // <button style={{ width: '100%' }} onClick={() => { navigate("/user/userDashboard/wishList") }}> My Wishlist </button>
//                     }
//                     {
//                         isCollapsed ?
//                             <button style={{ ...avatarStyle }}> C </button> :
//                             <button style={{ width: '100%', backgroundColor: 'rgba(255,255,255,0.1)' }} onClick={() => { navigate("/userDashboard/cart") }}> My Cart </button>
//                         // <button style={{ width: '100%' }} onClick={() => { navigate("/user/userDashboard/cart") }}> My Cart </button>
//                     }
//                     {
//                         isCollapsed ?
//                             <button style={{ ...avatarStyle }}> A </button> :
//                             <button style={{ width: '100%', backgroundColor: 'rgba(255,255,255,0.1)' }} onClick={() => { navigate("/userDashboard/address") }}> My Address </button>
//                         // <button style={{ width: '100%' }} onClick={() => { navigate("/user/userDashboard/address") }}> My Address </button>
//                     }
//                     {
//                         isCollapsed ?
//                             <button style={{ ...avatarStyle }}> O </button> :
//                             <button style={{ width: '100%', backgroundColor: 'rgba(255,255,255,0.1)' }} onClick={() => { navigate("/userDashboard/order") }}> My Orders </button>
//                         // <button style={{ width: '100%' }} onClick={() => { navigate("/user/userDashboard/order") }}> My Orders </button>
//                     }
//                 </div>
//             </div>

//             {/* Main Content */}
//             <div
//                 // style={{
//                 //     flex: 1,
//                 //     // height: '100%',
//                 //     overflowY: 'auto',
//                 //     padding: '1rem',
//                 //     background: '#f9f9f9',
//                 //     border: 'orange solid 2px',

//                 //     // flex: 1,
//                 //     // height: '100%',
//                 //     overflow: 'auto', // this is the key
//                 //     // padding: '1rem',
//                 //     // background: '#f9f9f9',
//                 //     // border: 'orange solid 2px',
//                 //     boxSizing: 'border-box',
//                 // }}
//                 style={{
//                     flex: 1,
//                     overflowY: 'auto',
//                     padding: '1rem',
//                     background: '#f9f9f9',

//                     // minHeight: '100vh',

//                     border: '2px solid orange',
//                     boxSizing: 'border-box',


//                     // flex: 1,
//                     // height: '100%',
//                     // overflowY: 'auto',
//                     // padding: '1rem',
//                     // background: '#f9f9f9',
//                     // border: 'orange solid 2px',

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
// export default UserDashboard
// {
//     // // // // {/* <div style={{ display: 'flex', width: '100vw', height: '100vh', overflow: 'hidden' }}>
//     // // // //   {/* Sidebar */}
//     // // // // //   <div style={{ width: '250px', backgroundColor: '#111', color: 'white', overflowY: 'auto' }}>
//     // // // // //     <UserSidebar />
//     // // // // //   </div>

//     // // // // {/* Main Content */ }
//     // // // // //   <div id="main" style={{ flexGrow: 1, overflowY: 'auto' }}>
//     // // // // //     <div
//     // // // // //       style={{
//     // // // // //         width: '100%',
//     // // // // //         maxWidth: '100%',
//     // // // // //         overflowX: 'hidden',
//     // // // // //         padding: '1rem',
//     // // // // //         boxSizing: 'border-box',
//     // // // // //         border: '2px solid orange'
//     // // // // //       }}
//     // // // // //     >
//     // // // // //       <Outlet />
//     // // // // //     </div>
//     // // // // //   </div>
//     // // // // //</div> */}


//     // // // // // <div style={{ display: 'flex', height: '100vh', overflow: 'hidden', width: '100%', border: 'green solid 2px', position: 'fixed', overflow: 'auto' }}>
//     // // // // //     <div
//     // // // // //         className="w3-sidebar w3-bar-block w3-card w3-animate-left"
//     // // // // //         style={{
//     // // // // //             width: isCollapsed ? '10px' : '250px',
//     // // // // //             transition: 'width 0.3s',
//     // // // // //             height: '100vh',
//     // // // // //             backgroundColor: '#1D2125',
//     // // // // //             color: 'white'
//     // // // // //         }}
//     // // // // //         id="mySidebar"
//     // // // // //     >
//     // // // // //         {/*
//     // // // // //                 <button
//     // // // // //                     className="w3-bar-item w3-button w3-large"
//     // // // // //                     onClick={toggleSidebar}
//     // // // // //                     style={{ backgroundColor: 'transparent', color: 'white', textAlign: 'center' }}
//     // // // // //                 >
//     // // // // //                     {isCollapsed ? '☰' : 'Collapse'}
//     // // // // //                 </button>
//     // // // // //             */}

//     // // // // // <div className="left-body-header">
//     // // // // //     <div className="left-inner-header">
//     // // // // //         {/* <div className="workspace-logo"> <SquareLetterLogo /> </div> */}
//     // // // // //         <div>
//     // // // // //             {/* <div>Trello Workspace</div>
//     // // // // //                 <div>Premium</div> */}
//     // // // // //             <div>User</div>
//     // // // // //         </div>
//     // // // // //     </div>
//     // // // // //     <div onClick={toggleSidebar} style={isCollapsed ? { position: 'absolute', left: '5px', zIndex: 999, borderRadius: '50%', backgroundColor: 'black' } : {}}>{isCollapsed ? '>' : '<'}</div>
//     // // // // // </div>

//     // // // // // <Link to={"/userDashboard/wishList"}><button>My Wishlist</button></Link>
//     // // // // // <Link to={"/userDashboard/cart"}><button>My Cart</button></Link>
//     // // // // // <Link to={"/userDashboard/address"}><button>My Address</button></Link>
//     // // // // // <Link to={"/userDashboard/order"}><button>My Orders</button></Link>
//     // // // // //     </div>

//     // // // // //     <div
//     // // // // //         id="main"
//     // // // // //         style={{
//     // // // // //             marginLeft: isCollapsed ? '60px' : '250px',
//     // // // // //             flex: 1,
//     // // // // //             height: '100vh',
//     // // // // //             overflowY: 'auto',
//     // // // // //             transition: 'margin-left 0.3s'
//     // // // // //         }}
//     // // // // //     >
//     // // // // //         <Outlet />
//     // // // // //     </div>

//     // // // // //     {/* <div id="main" style={{ marginLeft: isCollapsed ? '60px' : '250px', width: '100%', transition: 'margin-left 0.3s' }}> */}
//     // // // // //     {/* <div className="w3-container">
//     // // // // //                 <h1>My Trello-like Page</h1>
//     // // // // //                 <div style={{ display: 'flex', gap: '10px' }}>
//     // // // // //                     <div style={{ border: '1px solid black', width: '30%', height: '300px', overflowY: 'auto' }}>
//     // // // // //                         <p>Task 1</p>
//     // // // // //                         <p>Task 2</p>
//     // // // // //                         <p>Task 3</p>
//     // // // // //                         <p>Task 4</p>
//     // // // // //                         <p>Task 5</p>
//     // // // // //                         <p>Task 6</p>
//     // // // // //                     </div>
//     // // // // //                     <div style={{ border: '1px solid black', width: '30%', height: '300px', overflowY: 'auto' }}>
//     // // // // //                         <p>Task A</p>
//     // // // // //                         <p>Task B</p>
//     // // // // //                         <p>Task C</p>
//     // // // // //                         <p>Task D</p>
//     // // // // //                         <p>Task E</p>
//     // // // // //                     </div>
//     // // // // //                     <div style={{ border: '1px solid black', width: '30%', height: '300px', overflowY: 'auto' }}>
//     // // // // //                         <p>Task X</p>
//     // // // // //                         <p>Task Y</p>
//     // // // // //                         <p>Task Z</p>
//     // // // // //                         <p>Task W</p>
//     // // // // //                     </div>
//     // // // // //                 </div>
//     // // // // //             </div> */}
//     // // // // //     {/* <Outlet />
//     // // // // //         </div> */}

//     // // // // // </div>
//     // // // // // <div>
//     // // // // {/* <div>User</div> */ }
//     // // // // {/* <div> */ }
//     // // // // {/* <div style={{ display: 'flex' }}> */ }
//     // // // // {/*
//     // // // //                         <div className="w3-bar-item w3-button w3-large">
//     // // // //                             <div className="workspace-logo"> <SquareLetterLogo /> </div>
//     // // // //                             <span>Trello Workspace</span>
//     // // // //                             <span onClick={toggleSidebar} style={isCollapsed ? { borderRadius: '50%', backgroundColor: 'black' } : {}}> {isCollapsed ? '>' : '<'} </span>
//     // // // //                         </div>
//     // // // //                     */}
//     // // // // {/*
//     // // // //                         <a href="#" className="w3-bar-item w3-button" style={{ color: 'white', display: 'flex', alignItems: 'center' }}>
//     // // // //                             <FaTrello size={20} /> {!isCollapsed && <span style={{ marginLeft: '10px' }}>Boards</span>}
//     // // // //                         </a>
//     // // // //                         <a href="#" className="w3-bar-item w3-button" style={{ color: 'white', display: 'flex', alignItems: 'center' }}>
//     // // // //                             <FaCalendarAlt size={20} /> {!isCollapsed && <span style={{ marginLeft: '10px' }}>Calendar</span>}
//     // // // //                         </a>
//     // // // //                         <div style={{ position: 'absolute', bottom: '20px', width: '100%' }}>
//     // // // //                             <a href="#" className="w3-bar-item w3-button" style={{ color: 'white', display: 'flex', alignItems: 'center' }}>
//     // // // //                                 <FaUserCircle size={20} /> {!isCollapsed && <span style={{ marginLeft: '10px' }}>Profile</span>}
//     // // // //                             </a>
//     // // // //                             <a href="#" className="w3-bar-item w3-button" style={{ color: 'white', display: 'flex', alignItems: 'center' }}>
//     // // // //                                 <FaCog size={20} /> {!isCollapsed && <span style={{ marginLeft: '10px' }}>Settings</span>}
//     // // // //                             </a>
//     // // // //                         </div>
//     // // // //                     */}

//     // // // // {/* <div>
//     // // // //                     <Link to={"/userDashboard/wishList"}><button>My Wishlist</button></Link>
//     // // // //                     <Link to={"/userDashboard/cart"}><button>My Cart</button></Link>
//     // // // //                     <Link to={"/userDashboard/address"}><button>My Address</button></Link>
//     // // // //                     <Link to={"/userDashboard/order"}><button>My Orders</button></Link>
//     // // // //                 </div> */}
//     // // // // {/* <div>
//     // // // //                     <Outlet />
//     // // // //                 </div> */}

//     // // // import React, { useState } from 'react';
//     // // // import { Link, Outlet } from 'react-router-dom';
//     // // // import './UserDashboard.css';

//     // // // const UserDashboard = () => {
//     // // //     const [isCollapsed, setIsCollapsed] = useState(false);
//     // // //     const toggleSidebar = () => setIsCollapsed(!isCollapsed);
//     // // //     const user = JSON.parse(localStorage.getItem('user'));

//     // // //     return (
//     // // //         <div style={{ display: 'flex', width: '100vw', height: '100vh', overflow: 'hidden' }}>
//     // // //             {/* Sidebar */}
//     // // //             <div
//     // // //                 style={{
//     // // //                     width: isCollapsed ? '10px' : '250px',
//     // // //                     transition: 'width 0.3s',
//     // // //                     backgroundColor: '#1D2125',
//     // // //                     color: 'white',
//     // // //                     height: '100vh',
//     // // //                     overflowY: 'auto', // Scroll only if content exceeds height
//     // // //                     position: 'relative',
//     // // //                     flexShrink: 0,
//     // // //                 }}
//     // // //             >
//     // // //                 <div className="left-body-header">
//     // // //                     <div className="left-inner-header">
//     // // //                         <div>{user?.token && user.userEmail.role}</div>
//     // // //                     </div>
//     // // //                     <div
//     // // //                         onClick={toggleSidebar}
//     // // //                         style={{
//     // // //                             cursor: 'pointer',
//     // // //                             position: 'absolute',
//     // // //                             top: '10px',
//     // // //                             left: isCollapsed ? '5px' : '230px',
//     // // //                             zIndex: 999,
//     // // //                             borderRadius: '50%',
//     // // //                             backgroundColor: 'black',
//     // // //                             color: 'white',
//     // // //                             width: '20px',
//     // // //                             height: '20px',
//     // // //                             textAlign: 'center',
//     // // //                         }}
//     // // //                     >
//     // // //                         {isCollapsed ? '>' : '<'}
//     // // //                     </div>
//     // // //                 </div>

//     // // //                 <div style={{ padding: '10px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
//     // // //                     <Link to="/userDashboard/wishList"><button style={{ width: '100%' }}>My Wishlist</button></Link>
//     // // //                     <Link to="/userDashboard/cart"><button style={{ width: '100%' }}>My Cart</button></Link>
//     // // //                     <Link to="/userDashboard/address"><button style={{ width: '100%' }}>My Address</button></Link>
//     // // //                     <Link to="/userDashboard/order"><button style={{ width: '100%' }}>My Orders</button></Link>
//     // // //                 </div>
//     // // //             </div>

//     // // //             {/* Main Content */}
//     // // //             <div
//     // // //                 style={{
//     // // //                     flex: 1,
//     // // //                     height: '100vh',
//     // // //                     overflowY: 'auto',
//     // // //                     padding: '1rem',
//     // // //                     backgroundColor: '#f9f9f9',
//     // // //                 }}
//     // // //             >
//     // // //                 <Outlet />
//     // // //             </div>
//     // // //         </div>
//     // // //     );
//     // // // };

//     // // // export default UserDashboard;

//     // // import React, { useState } from 'react';
//     // // import { Link, Outlet } from 'react-router-dom';
//     // // import './UserDashboard.css';

//     // // const UserDashboard = () => {
//     // //     const [isCollapsed, setIsCollapsed] = useState(false);
//     // //     const toggleSidebar = () => setIsCollapsed(!isCollapsed);
//     // //     const user = JSON.parse(localStorage.getItem('user'));

//     // //     return (
//     // //         <div
//     // //             style={{
//     // //                 display: 'flex',
//     // //                 width: '100vw',
//     // //                 height: '100vh',
//     // //                 overflow: 'hidden',
//     // //             }}
//     // //         >
//     // //             {/* Sidebar */}
//     // //             <div
//     // //                 style={{
//     // //                     width: isCollapsed ? '10px' : '250px',
//     // //                     transition: 'width 0.3s',
//     // //                     backgroundColor: '#1D2125',
//     // //                     color: 'white',
//     // //                     flexShrink: 0,
//     // //                     display: 'flex',
//     // //                     flexDirection: 'column',
//     // //                     height: '100vh',
//     // //                     overflowY: 'auto', // enables scrolling when content is tall
//     // //                 }}
//     // //             >
//     // //                 {/* Header with toggle */}
//     // //                 <div
//     // //                     style={{
//     // //                         padding: '10px',
//     // //                         display: 'flex',
//     // //                         justifyContent: 'space-between',
//     // //                         alignItems: 'center',
//     // //                         backgroundColor: '#111',
//     // //                     }}
//     // //                 >
//     // //                     <span>{user?.token && user.userEmail.role}</span>
//     // //                     <span
//     // //                         onClick={toggleSidebar}
//     // //                         style={{
//     // //                             cursor: 'pointer',
//     // //                             backgroundColor: 'black',
//     // //                             borderRadius: '50%',
//     // //                             width: '20px',
//     // //                             height: '20px',
//     // //                             textAlign: 'center',
//     // //                             lineHeight: '20px',
//     // //                             fontSize: '14px',
//     // //                             marginLeft: '5px',
//     // //                         }}
//     // //                     >
//     // //                         {isCollapsed ? '>' : '<'}
//     // //                     </span>
//     // //                 </div>

//     // //                 {/* Sidebar Links */}
//     // //                 <div style={{ padding: '10px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
//     // //                     <Link to="/userDashboard/wishList">
//     // //                         <button style={{ width: '100%' }}>My Wishlist</button>
//     // //                     </Link>
//     // //                     <Link to="/userDashboard/cart">
//     // //                         <button style={{ width: '100%' }}>My Cart</button>
//     // //                     </Link>
//     // //                     <Link to="/userDashboard/address">
//     // //                         <button style={{ width: '100%' }}>My Address</button>
//     // //                     </Link>
//     // //                     <Link to="/userDashboard/order">
//     // //                         <button style={{ width: '100%' }}>My Orders</button>
//     // //                     </Link>
//     // //                 </div>
//     // //             </div>

//     // //             {/* Main Content */}
//     // //             <div
//     // //                 style={{
//     // //                     flex: 1,
//     // //                     overflowY: 'auto',
//     // //                     height: '100vh',
//     // //                     padding: '1rem',
//     // //                     backgroundColor: '#f9f9f9',
//     // //                 }}
//     // //             >
//     // //                 <Outlet />
//     // //             </div>
//     // //         </div>
//     // //     );
//     // // };

//     // // export default UserDashboard;

//     // import React, { useState } from 'react';
//     // import { Link, Outlet } from 'react-router-dom';
//     // import './UserDashboard.css';

//     // const UserDashboard = () => {
//     //     const [isCollapsed, setIsCollapsed] = useState(false);
//     //     const toggleSidebar = () => setIsCollapsed(!isCollapsed);
//     //     const user = JSON.parse(localStorage.getItem('user'));

//     //     return (
//     //         <div
//     //             style={{
//     //                 display: 'grid',
//     //                 gridTemplateColumns: isCollapsed ? '10px 1fr' : '250px 1fr',
//     //                 height: '100vh',
//     //                 overflow: 'hidden',
//     //             }}
//     //         >
//     //             {/* Sidebar */}
//     //             <div
//     //                 style={{
//     //                     backgroundColor: '#1D2125',
//     //                     color: 'white',
//     //                     overflowY: 'auto',
//     //                     display: 'flex',
//     //                     flexDirection: 'column',
//     //                 }}
//     //             >
//     //                 <div
//     //                     style={{
//     //                         padding: '10px',
//     //                         display: 'flex',
//     //                         justifyContent: 'space-between',
//     //                         alignItems: 'center',
//     //                         backgroundColor: '#111',
//     //                         position: 'relative',
//     //                     }}
//     //                 >
//     //                     <span>{user?.token && user.userEmail.role}</span>
//     //                     <span
//     //                         onClick={toggleSidebar}
//     //                         style={{
//     //                             cursor: 'pointer',
//     //                             backgroundColor: 'black',
//     //                             borderRadius: '50%',
//     //                             width: '20px',
//     //                             height: '20px',
//     //                             textAlign: 'center',
//     //                             lineHeight: '20px',
//     //                             fontSize: '14px',
//     //                             position: 'absolute',
//     //                             right: isCollapsed ? '-10px' : '-15px',
//     //                             top: '10px',
//     //                             zIndex: 999,
//     //                         }}
//     //                     >
//     //                         {isCollapsed ? '>' : '<'}
//     //                     </span>
//     //                 </div>

//     //                 <div style={{ padding: '10px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
//     //                     <Link to="/userDashboard/wishList"><button style={{ width: '100%' }}>My Wishlist</button></Link>
//     //                     <Link to="/userDashboard/cart"><button style={{ width: '100%' }}>My Cart</button></Link>
//     //                     <Link to="/userDashboard/address"><button style={{ width: '100%' }}>My Address</button></Link>
//     //                     <Link to="/userDashboard/order"><button style={{ width: '100%' }}>My Orders</button></Link>
//     //                 </div>
//     //             </div>

//     //             {/* Main Content */}
//     //             <div
//     //                 style={{
//     //                     overflowY: 'auto',
//     //                     height: '100%',
//     //                     padding: '1rem',
//     //                     backgroundColor: '#f9f9f9',
//     //                 }}
//     //             >
//     //                 <Outlet />
//     //             </div>
//     //         </div>
//     //     );
//     // };

//     // export default UserDashboard;
// }
//============================================================================
// import React, { useState } from 'react';
// import { Outlet, useNavigate } from 'react-router-dom';
// import './UserDashboard.css';

// const UserDashboard = () => {
//     const [isCollapsed, setIsCollapsed] = useState(false);
//     const navigate = useNavigate();
//     const user = JSON.parse(localStorage.getItem('user'));

//     return (
//         <>
//             {/* Sidebar */}
//             <div
//                 onMouseEnter={() => setIsCollapsed(true)}
//                 onMouseLeave={() => setIsCollapsed(false)}
//                 style={{
//                     width: isCollapsed ? '60px' : '250px',
//                     backgroundColor: '#1D2125',
//                     color: 'white',
//                     height: '100vh',
//                     display: 'flex',
//                     flexDirection: 'column',
//                     transition: 'width 0.3s ease',
//                     flexShrink: 0,
//                     borderRight: '2px solid red',
//                     position: 'sticky',
//                     top: 0,
//                 }}
//             >
//                 {/* Sidebar Header */}
//                 <div
//                     style={{
//                         padding: '10px',
//                         backgroundColor: '#111',
//                         display: 'flex',
//                         justifyContent: isCollapsed ? 'center' : 'flex-start',
//                         alignItems: 'center',
//                     }}
//                 >
//                     {!isCollapsed && <div>{user?.token && user.userEmail.role}</div>}
//                 </div>

//                 {/* Sidebar Scrollable Content */}
//                 <div
//                     style={{
//                         flex: 1,
//                         overflowY: 'auto',
//                         padding: '10px',
//                         display: 'flex',
//                         flexDirection: 'column',
//                         gap: '10px',
//                     }}
//                     className="scroll-container"
//                 >
//                     {menuItems.map(({ label, route, shortLabel }) => (
//                         <button
//                             key={label}
//                             onClick={() => navigate(route)}
//                             style={{
//                                 width: '100%',
//                                 backgroundColor: 'rgba(255,255,255,0.1)',
//                                 display: 'flex',
//                                 alignItems: 'center',
//                                 justifyContent: isCollapsed ? 'center' : 'flex-start',
//                                 padding: '10px',
//                                 border: 'none',
//                                 color: 'white',
//                                 cursor: 'pointer',
//                                 borderRadius: '5px',
//                                 transition: 'background 0.3s',
//                             }}
//                         >
//                             {isCollapsed ? (
//                                 <div style={avatarStyle}>{shortLabel}</div>
//                             ) : (
//                                 label
//                             )}
//                         </button>
//                     ))}
//                 </div>
//             </div>

//             {/* Main Content */}
//             <div
//                 style={{
//                     flex: 1,
//                     overflowY: 'auto',
//                     padding: '1rem',
//                     background: '#f9f9f9',
//                     border: '2px solid orange',
//                     boxSizing: 'border-box',
//                     minHeight: '100vh',
//                 }}
//             >
//                 <Outlet />
//             </div>
//         </>
//     );
// };

// // Sidebar Buttons
// const menuItems = [
//     { label: 'All Products', route: '/userDashboard', shortLabel: 'P' },
//     { label: 'My Wishlist', route: '/userDashboard/wishList', shortLabel: 'W' },
//     { label: 'My Cart', route: '/userDashboard/cart', shortLabel: 'C' },
//     { label: 'My Address', route: '/userDashboard/address', shortLabel: 'A' },
//     { label: 'My Orders', route: '/userDashboard/order', shortLabel: 'O' },
// ];

// // Avatar Style for collapsed view
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

// export default UserDashboard;
//===========================================================================

import React, { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import './UserDashboard.css';

const UserDashboard = () => {
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
                    // borderRight: '5px solid red',
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

                    border: '5px solid orange',
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
    { label: 'All Products', route: '/userDashboard', shortLabel: 'P' },
    { label: 'My Wishlist', route: '/userDashboard/wishList', shortLabel: 'W' },
    { label: 'My Cart', route: '/userDashboard/cart', shortLabel: 'C' },
    { label: 'My Address', route: '/userDashboard/address', shortLabel: 'A' },
    { label: 'My Orders', route: '/userDashboard/order', shortLabel: 'O' },
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

export default UserDashboard;
