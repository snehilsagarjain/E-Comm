// import axios from "axios";
import AddressForm from "../AddressForm";
import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import api from "../api";
import moment from 'moment';
import './AddressList.css';
const AddressList = () => { //({ addresses })
    const [selectedAddress, setSelectedAddress] = useState(null);
    const [addresses, setAddresses] = useState([]);
    // if (loading) return <p>Loading addresses...</p>;
    // if (error) return <p>{error}</p>;
    const [selectedValue, setSelectedValue] = useState("");
    const handleRadioChange = (value) => { setSelectedValue(value); }

    const [selectedOption, setSelectedOption] = useState('');
    const handleChange = (value) => { setSelectedOption(value); }

    const navigate = useNavigate();

    useEffect(() => {
        const fetchAddresses = async () => {
            try {
                const user = JSON.parse(localStorage.getItem("user")); console.log(`>>>>>>>user>>`, user); console.log(`>>>>>>>usertoken>>`, user.token);
                // const path = (status == "true") ? 'getActiveProductBySupplierId' : 'getInActiveProductBySupplierId';
                // 
                const response = await api.get(`http://localhost:6080/address/getAddressesByUserId`);
                console.log(`response>>>>>>>>`, response.data);
                if (response.data) {
                    setAddresses([]);
                    setAddresses(response.data);
                }
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchAddresses();
    }, []);

    const randomDays = Math.floor(Math.random() * 10); // Generates a random number between 0-9
    let futureDate = moment().add(randomDays, 'days').format("D/M/YY");
    console.log(`futureDate:`, futureDate);

    const location = useLocation();
    const cartId = location.state?.cartId; // Get cartId only if passed
    console.log(`cartId>>>>>`, cartId);

    const save = async (e) => {
        e.preventDefault();
        const user = JSON.parse(localStorage.getItem("user"));
        const userId = user.userEmail._id;
        const addressId = selectedValue;
        const paymentMode = selectedOption;
        console.log(`>>>>>>>>paymentMode>>>>>`, paymentMode);
        futureDate = moment().add(randomDays, 'days').toDate(); // ✅ Date object
        console.log(`>>>>>>>furtureDate>>>>>>`, futureDate);

        const deliveryDate = futureDate;
        console.log(`>>>cartId>>>>>`, cartId);
        // const response = await api.put(`/cart/editCartStatus/${cartId}`, { status: 'complete' }); //update cart status
        const response = await api.put(`/cart/editCart/${cartId}`, { status: 'complete' }); //update cart status
        const products = await api.post("http://localhost:6080/order/createOrder", { cartId: cartId, addressId, userId, paymentMode, deliveryDate });
        console.log(products);
        const orderId = products.data.Order._id;

        const cartResponse = await api.get(`/cart/getCartProduct/${cartId}`);
        console.log(cartResponse);

        // cartResponse.data.map((item) => {
        //     const productId = item.productId._id;
        //     const supplierId = item.productId.supplierId;
        // })
        const productId = cartResponse.data.productId._id;
        const supplierId = cartResponse.data.productId.supplierId;
        const quantity = cartResponse.data.quantity;
        const supplierOrderproducts = await api.post("http://localhost:6080/supplierOrder/createorder", { productId, userId, orderId, addressId, supplierId, paymentMode, quantity });
        const inventory = await api.patch(`http://localhost:6080/inventory/editInventory/${productId}`, { quantity: quantity });
        setSelectedOption('');
        setSelectedValue('');
        navigate('/userDashboard')
    }

    //'/getAddressesByUserId' ---> addresscontroller.getAddressesByUserId :: addresses
    // loading ? (<p>Loading...</p>) : error ? (<p>{error}</p>) : 
    return (
        // <div>
        <div className="max-w-4xl mx-auto px-4 py-8">
            <h3 className="text-2xl font-bold mb-6">Saved Addresses</h3>
            {/* <h3>Saved Addresses</h3> */}
            {addresses && addresses.length > 0 ? (
                <ul className="space-y-6">
                    {/* <ul> */}
                    {addresses.map((address) => (
                        <li key={address._id} style={{ listStyle: 'none', display: 'flex' }}>
                            {/* className="border rounded-lg p-4 shadow-sm bg-white" */}
                            {/* <input type="radio" id={`${address._id}`} value={`${address._id}`} checked={selectedValue === `${address._id}`} onChange={() => handleRadioChange(`${address._id}`)} /> */}
                            <div className="mt-3 flex items-center gap-2" style={{ alignContent: "center" }}>
                                <input
                                    type="radio"
                                    // id={address._id}
                                    id={`${address._id}`}
                                    value={address._id}
                                    checked={selectedValue === address._id}
                                    onChange={() => handleRadioChange(address._id)}
                                />
                                {/* <label htmlFor={address._id} className="text-sm text-gray-700">Select this address</label> */}
                            </div>
                            {/* className="flex items-start justify-between" */}
                            <div style={{ display: 'flex', width: '100%' }}>
                                <label style={{ width: '50%', paddingLeft: '20px' }} htmlFor={`${address._id}`} >
                                    {/* <h4 className="text-lg font-semibold">{address.name}</h4> */}
                                    {/* <label> */}
                                    {address.apartment}, {address.landmark} <br /> {address.city}, {address.state}, {address.country} - {address.postalCode} <br /> 📞 {address.phone}
                                    {/* </label> */}
                                    {/* <label className="text-sm text-gray-600">{address.apartment}, {address.landmark}</label>
                                    <label className="text-sm text-gray-600">{address.city}, {address.state}, {address.country} - {address.postalCode}</label> */}
                                    {/* <p className="text-sm text-gray-600">Phone: {address.phone}</p> */}
                                    {/* <label className="text-gray-700">📞 {address.phone}</label> */}
                                </label>
                                {/* <div>{address.name}</div> */}
                                {/* <div>{address.apartment}</div>  <div>{address.landmark}</div>
                                <div>{address.city}, {address.state}, {address.country}</div>
                                <div>{address.postalCode}</div> */}
                                {/* <button onClick={() => setSelectedAddress(address)}>Edit</button> <button>Delete</button> */}
                                <div
                                    style={{ width: '50%' }}>
                                    <button
                                        onClick={() => setSelectedAddress(address)}
                                        className="text-blue-600 hover:underline"
                                    >
                                        Edit
                                    </button>
                                    <button className="text-red-500 hover:underline">Delete</button>
                                </div>
                                {/* <p> {address.name}, {address.address}, {address.apartment}, {address.city}, {address.state},{' '} {address.country} - {address.postalCode} </p>
                                <p> {address.apartment}, {address.city}, {address.state}, {address.country} -{' '} </p>
                                <p>{address.phone}</p> */}
                            </div>
                        </li>
                    ))}
                    {/* address={selectedAddress} */}
                </ul>
            ) : (
                // <p>No saved addresses</p>
                <p className="text-gray-600 mb-4">No saved addresses</p>
            )}


            {/* <Link to={}> */}
            {/* <button onClick={() => { navigate("/userDashboard/newAddress") }}>Add New Address</button> */}
            <div className="mt-6">
                <button
                    onClick={() =>
                        cartId ? navigate("/userDashboard/newAddress", { state: { cartId: cartId }, }) :
                            navigate("/userDashboard/newAddress")
                        // cartId ? navigate("/user/userDashboard/newAddress", { state: { cartId: cartId }, }) :
                        //     navigate("/userDashboard/newAddress")
                    }
                // className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                >
                    Add New Address
                </button>
            </div>
            {/* </Link> */}


            {
                cartId ?
                    (selectedValue && (
                        <>

                            {/* <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginTop: '10px' }}>
                                <strong>Select Payment Mode:</strong>

                                <div style={{ display: 'flex', alignItems: 'center', whiteSpace: 'nowrap' }}>
                                    <input
                                        type="radio"
                                        id="Online"
                                        name="payment"
                                        value="Online"
                                        style={{ marginRight: '4px' }}
                                        checked={selectedOption === "Online"} onChange={() => handleChange("Online")}
                                    />
                                    <label htmlFor="Online" style={{ margin: 0, padding: 0 }}>Online</label>
                                </div>

                                <div style={{ display: 'flex', alignItems: 'center', whiteSpace: 'nowrap' }}>
                                    <input
                                        type="radio"
                                        id="Cash"
                                        name="payment"
                                        value="Cash"
                                        style={{ marginRight: '4px' }}
                                        checked={selectedOption === "Cash"} onChange={() => handleChange("Cash")}
                                    />
                                    <label htmlFor="Cash" style={{ margin: 0, padding: 0 }}>Cash</label>
                                </div>

                                <div style={{ display: 'flex', alignItems: 'center', whiteSpace: 'nowrap' }}>
                                    <input
                                        type="radio"
                                        id="Both"
                                        name="payment"
                                        value="Both Online and Cash"
                                        style={{ marginRight: '4px' }}
                                        checked={selectedOption === "Both Online and Cash"} onChange={() => handleChange("Both Online and Cash")}
                                    />
                                    <label htmlFor="Both" style={{ margin: 0, padding: 0 }}>Both Online and Cash</label>
                                </div>
                            </div> */}
                            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginTop: '10px' }}>
                                <span style={{ fontWeight: 'bold' }}>Select Payment Mode:</span>

                                {["Online", "Cash", "Both Online and Cash"].map((option) => (
                                    // <label key={option} style={{ display: 'flex', alignItems: 'center', gap: '0px', margin: 0, padding: 0, border: '1px solid black' }}>
                                    //     <input
                                    //         type="radio"
                                    //         name="paymentMode"
                                    //         value={option}
                                    //         checked={selectedOption === option}
                                    //         onChange={() => handleChange(option)}
                                    //         style={{ margin: 0, padding: 0 }}
                                    //     />
                                    //     <span>{option}</span>
                                    // </label>

                                    // , gap: '1px', border: '1px solid red', justifyContent: 'center',
                                    <div style={{ display: 'flex', alignItems: 'center', whiteSpace: 'nowrap' }} key={option}>
                                        <input type="radio" name="payment" value={option} id={option} style={{ marginRight: '4px' }} checked={selectedOption === option} onChange={() => handleChange(option)} />
                                        <label htmlFor={option} style={{ margin: 0, padding: 0 }} > {option} </label>
                                    </div>

                                ))}
                            </div>

                            <div> <input type="text" placeholder="Delivery Date" value={futureDate} disabled={true} /> </div>
                            <div>
                                {/* <Link to={""}><button onClick={() => { Save() }}>Submit</button></Link>  */}
                                <button onClick={(e) => { save(e) }}>Submit Order</button>
                            </div>
                            {/* /userDashboard/address */}
                        </>
                    )
                    ) : (
                        // <p>No Cart ID (Opened from Dashboard)</p>
                        <p className="mt-6 text-red-500 font-medium">No Cart ID (Opened from Dashboard)</p>
                    )
            }
        </div>


        // <div className="max-w-4xl mx-auto px-4 py-8">
        //     <h3 className="text-2xl font-bold mb-6">Saved Addresses</h3>

        //     {addresses.length > 0 ? (
        //         <ul className="space-y-6">
        //             {addresses.map((address) => (
        //                 <li key={address._id} className="border rounded-lg p-4 shadow-sm bg-white">
        //                     <div className="flex items-start justify-between">
        //                         <div>
        //                             <h4 className="text-lg font-semibold">{address.name}</h4>
        //                             <p className="text-sm text-gray-600">{address.apartment}, {address.landmark}</p>
        //                             <p className="text-sm text-gray-600">{address.city}, {address.state}, {address.country} - {address.postalCode}</p>
        //                             <p className="text-sm text-gray-600">Phone: {address.phone}</p>
        //                         </div>
        //                         <div className="flex flex-col gap-2">
        //                             <button
        //                                 onClick={() => setSelectedAddress(address)}
        //                                 className="text-blue-600 hover:underline"
        //                             >
        //                                 Edit
        //                             </button>
        //                             <button className="text-red-500 hover:underline">Delete</button>
        //                         </div>
        //                     </div>
        //                     <div className="mt-3 flex items-center gap-2">
        //                         <input
        //                             type="radio"
        //                             id={address._id}
        //                             value={address._id}
        //                             checked={selectedValue === address._id}
        //                             onChange={() => handleRadioChange(address._id)}
        //                         />
        //                         <label htmlFor={address._id} className="text-sm text-gray-700">Select this address</label>
        //                     </div>
        //                 </li>
        //             ))}
        //         </ul>
        //     ) : (
        //         <p className="text-gray-600 mb-4">No saved addresses</p>
        //     )}

        //     <div className="mt-6">
        //         <button
        //             onClick={() => navigate("/userDashboard/newAddress")}
        //             className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        //         >
        //             Add New Address
        //         </button>
        //     </div>

        //     {cartId ? (
        //         selectedValue && (
        //             <>
        //                 <div className="mt-8 space-y-4">
        //                     <label className="block text-lg font-semibold">Select Payment Mode:</label>
        //                     <div className="flex flex-col md:flex-row md:items-center gap-4">
        //                         {["Online", "Cash", "Both Online and Cash"].map((option) => (
        //                             <div key={option} className="flex items-center gap-2">
        //                                 <input
        //                                     type="radio"
        //                                     id={option}
        //                                     value={option}
        //                                     checked={selectedOption === option}
        //                                     onChange={() => handleChange(option)}
        //                                 />
        //                                 <label htmlFor={option}>{option}</label>
        //                             </div>
        //                         ))}
        //                     </div>

        //                     <div>
        //                         <label className="block text-sm text-gray-700 mb-1">Delivery Date</label>
        //                         <input
        //                             type="text"
        //                             value={futureDate}
        //                             disabled
        //                             className="w-full md:w-1/2 border rounded p-2 bg-gray-100"
        //                         />
        //                     </div>

        //                     <div>
        //                         <button
        //                             onClick={save}
        //                             className="mt-4 bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition"
        //                         >
        //                             Submit Order
        //                         </button>
        //                     </div>
        //                 </div>
        //             </>
        //         )
        //     ) : (
        //         <p className="mt-6 text-red-500 font-medium">No Cart ID (Opened from Dashboard)</p>
        //     )}
        // </div>
        // <div className="min-h-screen bg-gray-100 p-6">
        //     <div className="max-w-5xl mx-auto">
        //         <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Your Saved Addresses</h2>
        //         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        //             {addresses.map((address) => (
        //                 <div
        //                     key={address.id}
        //                     className="bg-white shadow-md rounded-2xl p-6 transition-transform transform hover:scale-105 hover:shadow-xl"
        //                 >
        //                     <h3 className="text-xl font-semibold text-blue-600 mb-2">{address.name}</h3>
        //                     <p className="text-gray-700">{address.street}</p>
        //                     <p className="text-gray-700">{address.city}, {address.state} {address.zip}</p>
        //                     <p className="text-gray-700">📞 {address.phone}</p>
        //                     <div className="mt-4 flex gap-2">
        //                         <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 rounded-lg text-sm">
        //                             Edit
        //                         </button>
        //                         <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded-lg text-sm">
        //                             Delete
        //                         </button>
        //                     </div>
        //                 </div>
        //             ))}
        //         </div>
        //     </div>
        // </div>
    );
};

export default AddressList;

// import React from 'react';
// import { useNavigate } from 'react-router-dom';

// const AddressList = ({
//     addresses = [],
//     selectedValue,
//     selectedOption,
//     handleRadioChange,
//     handleChange,
//     futureDate,
//     save,
//     cartId,
//     setSelectedAddress
// }) => {
//     const navigate = useNavigate();

//     return (
//         <div className="max-w-4xl mx-auto px-4 py-8">
//             <h3 className="text-2xl font-bold mb-6">Saved Addresses</h3>

//             {addresses.length > 0 ? (
//                 <ul className="space-y-6">
//                     {addresses.map((address) => (
//                         <li key={address._id} className="border rounded-lg p-4 shadow-sm bg-white">
//                             <div className="flex items-start justify-between">
//                                 <div>
//                                     <h4 className="text-lg font-semibold">{address.name}</h4>
//                                     <p className="text-sm text-gray-600">{address.apartment}, {address.landmark}</p>
//                                     <p className="text-sm text-gray-600">{address.city}, {address.state}, {address.country} - {address.postalCode}</p>
//                                     <p className="text-sm text-gray-600">Phone: {address.phone}</p>
//                                 </div>
//                                 <div className="flex flex-col gap-2">
//                                     <button
//                                         onClick={() => setSelectedAddress(address)}
//                                         className="text-blue-600 hover:underline"
//                                     >
//                                         Edit
//                                     </button>
//                                     <button className="text-red-500 hover:underline">Delete</button>
//                                 </div>
//                             </div>
//                             <div className="mt-3 flex items-center gap-2">
//                                 <input
//                                     type="radio"
//                                     id={address._id}
//                                     value={address._id}
//                                     checked={selectedValue === address._id}
//                                     onChange={() => handleRadioChange(address._id)}
//                                 />
//                                 <label htmlFor={address._id} className="text-sm text-gray-700">Select this address</label>
//                             </div>
//                         </li>
//                     ))}
//                 </ul>
//             ) : (
//                 <p className="text-gray-600 mb-4">No saved addresses</p>
//             )}

//             <div className="mt-6">
//                 <button
//                     onClick={() => navigate("/userDashboard/newAddress")}
//                     className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
//                 >
//                     Add New Address
//                 </button>
//             </div>

//             {cartId ? (
//                 selectedValue && (
//                     <>
//                         <div className="mt-8 space-y-4">
//                             <label className="block text-lg font-semibold">Select Payment Mode:</label>
//                             <div className="flex flex-col md:flex-row md:items-center gap-4">
//                                 {["Online", "Cash", "Both Online and Cash"].map((option) => (
//                                     <div key={option} className="flex items-center gap-2">
//                                         <input
//                                             type="radio"
//                                             id={option}
//                                             value={option}
//                                             checked={selectedOption === option}
//                                             onChange={() => handleChange(option)}
//                                         />
//                                         <label htmlFor={option}>{option}</label>
//                                     </div>
//                                 ))}
//                             </div>

//                             <div>
//                                 <label className="block text-sm text-gray-700 mb-1">Delivery Date</label>
//                                 <input
//                                     type="text"
//                                     value={futureDate}
//                                     disabled
//                                     className="w-full md:w-1/2 border rounded p-2 bg-gray-100"
//                                 />
//                             </div>

//                             <div>
//                                 <button
//                                     onClick={save}
//                                     className="mt-4 bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition"
//                                 >
//                                     Submit Order
//                                 </button>
//                             </div>
//                         </div>
//                     </>
//                 )
//             ) : (
//                 <p className="mt-6 text-red-500 font-medium">No Cart ID (Opened from Dashboard)</p>
//             )}
//         </div>
//     );
// };

// export default AddressList;

// import React from "react";

// const addresses = [
//   {
//     id: 1,
//     name: "John Doe",
//     street: "123 Main St",
//     city: "New York",
//     state: "NY",
//     zip: "10001",
//     phone: "555-123-4567",
//   },
//   {
//     id: 2,
//     name: "Jane Smith",
//     street: "456 Park Ave",
//     city: "Los Angeles",
//     state: "CA",
//     zip: "90001",
//     phone: "555-987-6543",
//   },
//   // Add more address objects if needed
// ];

// const ShowAddresses = () => {
//   return (

//   );
// };

// export default ShowAddresses;
