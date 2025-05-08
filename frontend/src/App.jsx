import { useEffect, useState } from 'react'
import './App.css'
import UserSignUp from './UserSignUp'
import { BrowserRouter, Navigate, Route, Routes, useNavigate, useLocation } from 'react-router-dom';
import SupplierSignUp from './SupplierSignUp'
import UltimateAnimatedForm from './SupplierSignUp'
import Create_product from './createproduct/Create_product'
import LogIn from './LogIn'

import AnimatedReactForm from './SupplierSignUp'
import FormValidationAndErrorHandling from './SupplierSignUp'
import AdvancedInputAnimations from './SupplierSignUp'
import StylishButtonEffects from './SupplierSignUp'
import DarkModeSupport from './SupplierSignUp'
import CodeSplittingAndOptimization from './SupplierSignUp'
import EnhancedFormLayouts from './SupplierSignUp'
import CustomFormValidations from './SupplierSignUp'
import AccessibilityEnhancements from './SupplierSignUp'
import EnhancedStylingForm from './SupplierSignUp'
import AnimatedLabelsForm from './SupplierSignUp'
import TooltipsForm from './SupplierSignUp'
import FloatingLabelsForm from './SupplierSignUp'
import ProgressIndicatorForm from './SupplierSignUp'
import EnhancedForm from './SupplierSignUp'

import UserView from './UserView/userView'
import SupplierView from './supplierView'
import AdminView from './adminView'
import axios from 'axios'
import NewPassword from './NewPassword'
import ForgotPassword from './ForgotPassword'
import UserDashboard from './UserDashboard/UserDashboard'
// import GetAllProducts from './GetAllProducts'
import MyWishList from './MyWishList'
import MyCart from './MyCart'
import MyAddress from './MyAddress'
import SupplierDashboard from './SupplierDashboard'
import AddressList from './AddressList/AddressList'
import AddressForm from './AddressForm'
import api from './api'
import OrderList from './OrderList';
import SupllierOrderList from './SupllierOrderList';
// import useAxiosInterceptor from './axiosSetup'
// import { Navigate } from "react-router-dom";
// import jwtDecode from "jwt-decode";
// import { useEffect, useState } from "react";
// import { Navigate } from "react-router-dom";
// import axios from "axios";
// import {  } from "react-router-dom";

import Custom_hook from "./Custom_hook";
import Layout from './Layout';
import LogoutPage from './LogoutPage';
import Demo from './createproduct/demo'
import RedirectPage from './RedirectPage';
import useInactivityTimer from './hooks/useInactivityTimer';
import InactivityTimer from './InActivityTimer';
import ProductDetails from './ProductDetails';
// import { useLocation } from 'react-router-dom';
function App() {
  const [message, setMessage] = useState('');
  // const location = useLocation();
  // const [count, setCount] = useState(0);

  // const abc = () => {
  //     const user = JSON.parse(localStorage.getItem("user"));
  //     if (!user || !user.token) return false;

  //     const decodedToken = jwtDecode(user.token);
  //     const currentTime = Date.now() / 1000; // Convert to seconds

  //     if (decodedToken.exp < currentTime) {
  //         localStorage.removeItem("user"); // Token expired, remove user
  //         return false;
  //     }

  //     return true;
  // };
  // const abc = () => {
  //   console.log("Checking authentication...");
  //   console.log(`>>>>>>localStorage.getItem("user") === "true">>>>>>>`, localStorage.getItem("user") === "true");
  //   return localStorage.getItem("user") === "true";
  // };
  // const abc = () => {
  //   console.log("8");
  //   const user = JSON.parse(localStorage.getItem("user")); // Parse the stored JSON
  //   return user && user.token ? true : false; // Check if token exists
  // };
  // const abc = () => {
  //   const user = JSON.parse(localStorage.getItem("user"));
  //   if (!user || !user.token) return false;

  //   const decodedToken = jwtDecode(user.token);
  //   const currentTime = Date.now() / 1000; // Convert to seconds

  //   if (decodedToken.exp < currentTime) {
  //       localStorage.removeItem("user"); // Token expired, remove user
  //       return false;
  //   }

  //   return true;
  // };
  //====================================================
  // const abc = async () => {
  //   try {
  //     const user = JSON.parse(localStorage.getItem("user"));
  //     if (!user || !user.token) { console.log("No token found"); return false; }
  //     console.log(`>>>>>>94>>>>>`);

  //     const response = await api.get("http://localhost:6080/auth/verifyToken");

  //     return response.status === 200; // Token is valid
  //   } catch (error) {
  //     console.error("Token expired or invalid", error);
  //     localStorage.removeItem("user"); // Clear invalid token
  //     return false;
  //   }
  // };
  // // const ProtectedRoute = ({ element }) => {
  // //   console.log(abc());
  // //   return abc() ? element : <Navigate to="/login" />;
  // // };
  // const ProtectedRoute = ({ element }) => {
  //   const [isAuthenticated, setIsAuthenticated] = useState(null);

  //   useEffect(() => {
  //     const checkAuth = async () => {
  //       const valid = await abc();
  //       setIsAuthenticated(valid);
  //     };
  //     checkAuth();
  //   }, []);

  //   if (isAuthenticated === null) return <div>Loading...</div>; // Prevents flickering
  //   return isAuthenticated ? element : <Navigate to="/login" />;
  // };
  //===================================================
  const ProtectedRoute = ({ element, allowedRoles }) => {
    console.log(`allowedRoles:`, allowedRoles);

    // console.log(`element:`, element);
    // const [isAuthenticated, setIsAuthenticated] = useState(null);
    const location = useLocation();
    const [isAuthenticated, setIsAuthenticated] = useState(null);
    const [userRole, setUserRole] = useState(null);
    const user = JSON.parse(localStorage.getItem("user"));
    useEffect(() => {
      const checkAuth = async () => {
        const valid = await abc(user); //console.log(`valid:`, valid === 'false');  //console.log(`valid:`, valid === "false");  //console.log(`valid:`, valid === false);
        if (user && valid === false) { localStorage.removeItem("user"); /* Clear invalid token */ console.log('137'); }
        setIsAuthenticated(valid);
      };
      checkAuth();
    }, []);

    if (isAuthenticated === null) return <div>Loading...</div>; // Prevents flickering

    console.log(`isAuthenticated=`, isAuthenticated);
    console.log(`user?.userEmail?.role:`, user?.userEmail?.role);
    console.log(`allowedRoles.includes(user?.userEmail?.role):`, allowedRoles.includes(user?.userEmail?.role));
    console.log(`allowedRoles:`, allowedRoles);


    // 🚀 If authenticated but role mismatch, redirect to role-based dashboard
    if (isAuthenticated && !allowedRoles.includes(user?.userEmail?.role)) {
      const roleRoutes = { supplier: "/supplierDashboard", admin: "/adminView", user: "/userDashboard" };
      // const roleRoutes = { supplier: "/user/supplierDashboard", admin: "/user/adminView", user: "/user/userDashboard" };
      // const roleRoutes = { supplier: "/supplierDashboard", admin: "/adminView", user: "/userDashboard" };

      const defaultRedirect = roleRoutes[user?.userEmail?.role] || "/"; console.log(`defaultRedirect`, defaultRedirect);
      localStorage.setItem("redirectAfterLogin", defaultRedirect); return <Navigate to={defaultRedirect} />;
    }

    console.log(`element:`, element);


    return isAuthenticated
      ? (
        console.log(`>>>>>>174element:`,),
        element
      )
      : (
        console.log(`>>>175>>>`, location.pathname),
        localStorage.setItem("redirectAfterLogin", location.pathname),
        // <Navigate to="/logout" />
        <Navigate to="/login" />
      );
  };
  const abc = async (user) => {
    try {
      // const location = useLocation();
      // const user = JSON.parse(localStorage.getItem("user"));
      if (!user || !user.token) { console.log("No token found"); return false; }
      console.log(`>>>>>>94>>>>>`);

      const response = await api.get("http://localhost:6080/auth/verifyToken");
      console.log(`response:`, response);
      console.log(`response.data.message:`, response.data.message);
      setMessage(response.data.message);

      return response.status === 200; // Token is valid
    } catch (error) {
      console.error("Token expired or invalid", error);
      localStorage.removeItem("user"); // Clear invalid token
      return false;
    }
  };

  console.log(`message:`, message);

  const PublicRoute = ({ element }) => {
    console.log(`>>>>>>198>>>>>>>`);

    const user = JSON.parse(localStorage.getItem("user"));
    return user
      ? (console.log(`>>>>>>>201>>>>>`), <Navigate to="/userDashboard" />)
      : (console.log(`>>>>>>>>>202>>>>>>>`), element);
    // return user
    //   ? (console.log(`>>>>>>>201>>>>>`), <Navigate to="/user/userDashboard" />)
    //   : (console.log(`>>>>>>>>>202>>>>>>>`), element);
  };

  // // useAxiosInterceptor();
  // useEffect(() => {
  //   const useAxiosInterceptor = () => {
  //     axios.interceptors.response.use(
  //       response => response,
  //       error => {
  //         if (error.response && error.response.status === 401) {
  //           localStorage.removeItem('token');
  //           localStorage.removeItem('tokenExpiry');
  //           window.location.href = '/login'; // Fallback if navigate is unavailable
  //         }
  //         return Promise.reject(error);
  //       }
  //     );
  //   };

  //   useAxiosInterceptor();
  // }, []);

  // useInactivityTimer({
  //   timeout: 5 * 60 * 1000,
  //   onTimeout: () => {
  //     localStorage.clear();
  //     window.location.href = '/login';
  //   },
  // });

  return (

    <BrowserRouter>

      {/* {location.pathname !== '/login' && */}
      {/* <InactivityTimer
      /> */}
      {/* // timeout={10000}
      //5 * 60 * 1000
      // logout={() => {
      //   localStorage.clear();
      //   window.location.href = '/login';
      // }} */}
      {/* } */}

      <Routes>
        {/* <Route path="mode" element={< Custom_hook />} />
        <Route path="demo" element={< Demo />} /> */}

        {/* <Route path="/" element={<PublicRoute element={<UserView />} />} /> */}
        {/* <Route path="/" element={<UserView />} /> */}
        <Route path="/usersignup" element={<UserSignUp />} />
        <Route path="/sellersignup" element={<SupplierSignUp />} />


        {/* <Route path="/seller" element={<AnimatedReactForm />} /> */}
        {/* <Route path="/seller" element={<FormValidationAndErrorHandling /> --//-- } /> */}
        {/* <Route path="/seller" element={<AdvancedInputAnimations />        --//-- } /> */}
        {/* <Route path="/seller" element={<StylishButtonEffects />           --//-- } /> */}
        {/* <Route path="/seller" element={<DarkModeSupport />                --//-- } /> */}
        {/* <Route path="/seller" element={<CodeSplittingAndOptimization />   --//-- } /> */}

        {/* <Route path="/seller" element={<EnhancedFormLayouts />} /> */}
        {/* <Route path="/seller" element={<CustomFormValidations />} /> */}
        {/* <Route path="/seller" element={<ImprovedFormAnimations />} /> */}
        {/* <Route path="/seller" element={<EnhancedStylingForm />} /> */}
        {/* <Route path="/seller" element={<AnimatedLabelsForm />} /> */}
        {/* <Route path="/seller" element={<TooltipsForm />} /> */}
        {/* <Route path="/seller" element={<FloatingLabelsForm />} /> */}
        {/* <Route path="/seller" element={<ProgressIndicatorForm />} /> */}
        {/* <Route path="/seller" element={<EnhancedForm />} /> */}
        {/* <Route path="/seller" element={<UltimateAnimatedForm />} /> */}

        <Route path="/login" element={<LogIn />} />
        <Route path="/logout" element={<LogoutPage />} />
        <Route path="/redirect" element={<RedirectPage message={message} />} />
        {/* <Route path="/userView" element={ProtectedRoute(<UserView />)} />
        <Route path="/supplierView" element={ProtectedRoute(<SupplierView />)} />
        <Route path="/adminView" element={ProtectedRoute(<AdminView />)} />

        <Route path='/newpassword' element={ProtectedRoute(<NewPassword />)} /> */}

        {/* <ProtectedRoute element={<Layout />} allowedRoles={[]} /> */}
        {/* <Layout /> */}
        {/* <Route path="/user" element={<Layout />} > */}
        <Route path="/" element={<Layout />} >
          {/* Redirect /user to /user/userDashboard 
              -->> replace: ensures the current history entry is replaced, not pushed. 
                    So pressing the browser "Back" button won’t go back to /user — instead, it skips to whatever was before that in history.*/}
          <Route index element={<Navigate to="userDashboard" replace />} />

          {/* Protected routes */}
          {/* <Route path="userDashboard" element={<ProtectedRoute element={<UserDashboard />} allowedRoles={["user", "supplier", "admin"]} />} > */}
          <Route path="userDashboard" element={<UserDashboard />} >
            {/* <Route index element={<ProtectedRoute element={<UserView />} allowedRoles={["user", "supplier", "admin"]} />} /> */}
            <Route index element={<UserView />} />
            <Route path="product/:id" element={<ProductDetails />} />

            <Route path='wishlist' element={<ProtectedRoute element={<MyWishList />} allowedRoles={["user", "supplier", "admin"]} />} />
            <Route path='cart' element={<ProtectedRoute element={< MyCart />} allowedRoles={["user", "supplier", "admin"]} />} />
            <Route path='address' element={<ProtectedRoute element={< AddressList />} allowedRoles={["user", "supplier", "admin"]} />} />
            <Route path='newAddress' element={<ProtectedRoute element={< AddressForm />} allowedRoles={["user", "supplier", "admin"]} />} />
            <Route path='order' element={<ProtectedRoute element={< OrderList />} allowedRoles={["user", "supplier", "admin"]} />} />
          </Route>
          {/* <Route path="/userView" element={<UserView />} /> */}

          {/* ...other nested routes */}
          <Route path="supplierDashboard" element={<ProtectedRoute element={<SupplierDashboard />} allowedRoles={["supplier"]} />} >
            <Route index element={<ProtectedRoute element={<SupplierView status={true} />} allowedRoles={["supplier"]} />} />
            <Route path='inactiveProducts' element={<ProtectedRoute element={<SupplierView status={false} />} allowedRoles={["supplier"]} />} />
            <Route path='addProduct' element={<ProtectedRoute element={<Create_product />} allowedRoles={["supplier"]} />} />
            <Route path='order' element={<ProtectedRoute element={< SupllierOrderList />} allowedRoles={["supplier"]} />} />
          </Route>
          {/* <Route path="/supplierView" element={<SupplierView />} /> */}
          {/* <Route path="/product" element={<Create_product />} /> */}

          {/* <Route path="adminView" element={<ProtectedRoute element={<AdminView />} allowedRoles={["admin"]} />} /> */}

          <Route path='ForgotPassword' element={<ForgotPassword />} />
          <Route path='newpassword' element={<NewPassword />} />
        </Route>
        <Route path="adminView" element={<ProtectedRoute element={<AdminView />} allowedRoles={["admin"]} />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
