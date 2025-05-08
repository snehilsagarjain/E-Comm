import React, { useState, useEffect, useRef } from "react";
import api from "./api";
import { useLocation, useNavigate } from "react-router-dom";

const AddressForm = () => {

    const location = useLocation();
    const cartId = location.state?.cartId; // Get cartId only if passed
    console.log(`cartId>>>>>`, cartId);

    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [phone, setPhone] = useState("");
    const [apartment, setApartment] = useState('');
    const [landmark, setLandmark] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [country, setCountry] = useState('');
    const [alternatePhone, setAlternatePhone] = useState('');

    // Refs for detecting autofill
    const nameRef = useRef(null);
    const addressRef = useRef(null);
    const phoneRef = useRef(null);
    const apartmentRef = useRef(null);
    const landmarkRef = useRef(null);
    const cityRef = useRef(null);
    const stateRef = useRef(null);
    const postalCodeRef = useRef(null);
    const countryRef = useRef(null);
    const alternatePhoneRef = useRef(null);

    // Function to sync autofilled values
    const syncAutofill = () => {
        if (nameRef.current && nameRef.current.value !== name) setName(nameRef.current.value);
        if (addressRef.current && addressRef.current.value !== address) setAddress(addressRef.current.value);
        if (phoneRef.current && phoneRef.current.value !== phone) setPhone(phoneRef.current.value);
        if (apartmentRef.current && apartmentRef.current.value !== apartment) setApartment(apartmentRef.current.value);
        if (landmarkRef.current && landmarkRef.current.value !== landmark) setLandmark(landmarkRef.current.value);
        if (cityRef.current && cityRef.current.value !== city) setCity(cityRef.current.value);
        if (stateRef.current && stateRef.current.value !== state) setState(stateRef.current.value);
        if (postalCodeRef.current && postalCodeRef.current.value !== postalCode) setPostalCode(postalCodeRef.current.value);
        if (countryRef.current && countryRef.current.value !== country) setCountry(countryRef.current.value);
        if (alternatePhoneRef.current && alternatePhoneRef.current.value !== alternatePhone) setAlternatePhone(alternatePhoneRef.current.value);
    };

    useEffect(() => {
        const interval = setInterval(syncAutofill, 500); // Check every 500ms
        return () => clearInterval(interval); // Cleanup interval on unmount
    }, [name, address, phone, apartment, landmark, city, state, country, postalCode, alternatePhone]); // Runs whenever values change

    const submitHandler = (e) => {
        e.preventDefault();

        // // if (address._id) {  } 
        // if (addressId) {  }
        // else {  }
    };

    const submitForm = async (e) => {
        e.preventDefault();
        const user = JSON.parse(localStorage.getItem('user')); console.log(`>>>>>>>>>user55:>>>>>>`, user);

        const { _id } = user.userEmail; console.log(`>>>>>>>>userId57:>>>>>>>`, _id);

        if (!_id) { /* Not having supplierId. Only supplier can create product. */ }
        // if (supplierId),, status, 
        const response = await api.post('http://localhost:6080/address/createAddress', { userId: _id, name, phone, alternatePhone, postalCode, address, apartment, landmark, city, state, country });
        if (response.data)
            // cartId ? navigate("/user/userDashboard/address", { state: { cartId: cartId }, }) :
            //     navigate("/userDashboard/address");
            cartId ? navigate("/userDashboard/address", { state: { cartId: cartId }, }) :
                navigate("/userDashboard/address");
        // navigate('/userDashboard/address');
        // <button onClick={() => { 
        // navigate("/user/userDashboard/address", { state: { cartId: item._id }, });
        // }}> Place Order </button>
    }
    return (
        <form onSubmit={submitForm}>
            {/* submitHandler */}
            {/* <h2>{address._id ? "Update Address" : "Add New Address"}</h2> */}
            {/* <h3>{addressId ? "Edit Address" : "Add Address"}</h3> */}
            <div>
                <label>Name</label>
                <input ref={nameRef} type="text" value={name} onInput={(e) => setName(e.target.value)} placeholder="Full Name" required />
            </div>
            <div>
                <label>Phone</label>
                <input ref={phoneRef} type="text" value={phone} onInput={(e) => setPhone(e.target.value)} placeholder="Phone" required />
            </div>
            <div>
                <label>Alternate Phone:</label>
                <input ref={alternatePhoneRef} type="text" value={alternatePhone} onInput={(e) => setAlternatePhone(e.target.value)} placeholder="Alternate Phone" required />
            </div>
            <div>
                <label>Postal Code</label>
                <input ref={postalCodeRef} type="text" value={postalCode} onInput={(e) => setPostalCode(e.target.value)} placeholder="Postal Code" required />
            </div>
            <div>
                <label>Address</label>
                <input ref={addressRef} type="text" value={address} onInput={(e) => setAddress(e.target.value)} placeholder="Address" required />
            </div>
            <div>
                <label>Appartment</label>
                <input ref={apartmentRef} type="text" value={apartment} onInput={(e) => setApartment(e.target.value)} placeholder="Appartment" required />
            </div>
            <div>
                <label>Landmark</label>
                <input ref={landmarkRef} type="text" value={landmark} onInput={(e) => setLandmark(e.target.value)} placeholder="Landmark" required />
            </div>
            <div>
                <label>City</label>
                <input ref={cityRef} type="text" value={city} onInput={(e) => setCity(e.target.value)} placeholder="City" required />
            </div>
            <div>
                <label>State:</label>
                <input ref={stateRef} type="text" value={state} onInput={(e) => setState(e.target.value)} placeholder="State" required />
            </div>
            <div>
                <label>Country</label>
                <input ref={countryRef} type="text" value={country} onInput={(e) => setCountry(e.target.value)} placeholder="Country" required />
            </div>
            {/* <button type="submit">{addressId ? "Update Address" : "Add Address"}</button> */}
            <button type="submit">Save Address</button>
        </form>
    );
};

export default AddressForm;
