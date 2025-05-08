// import axios from 'axios';
import React, { useState } from 'react'
import api from './api';

const Edit_product = () => {
    const [name, setName] = useState('');
    const [size, setSize] = useState('');
    const [color, setColor] = useState('');
    // const [status, setStatus] = useState()
    const [price, setPrice] = useState()
    const [quantity, setQuantity] = useState()
    const [brandname, setBrandName] = useState('')
    const [remarks, setRemarks] = useState('')

    const [selectedValue, setSelectedValue,] = useState("");
    const handleRadioChange = (value) => { setSelectedValue(value); }

    const submitForm = async (e) => {
        const user = JSON.parse(localStorage.getItem('user'));
        const { supplierId } = user.userEmail;
        if (!supplierId) { /* Not having supplierId. Only supplier can create product. */ }
        // if (supplierId),, status, 
        await api.put('http://localhost:6080/product/editproduct', { supplierId, Name: name, Size: size, Color: color, Status: status, Price: price, Quantity: quantity, BrandName: brandname, Remarks: remarks });
    }
    return (
        <div>
            <label>Create_product</label>
            <div>
                <label htmlFor="name">Name: </label>
                <input type='text' id='name' value={name} onChange={(e) => { setName(e.target.value) }} />
            </div>
            <div>
                <label htmlFor="size">Size: </label>
                <input type='text' id='size' value={size} onChange={(e) => { setSize(e.target.value) }} />
            </div>
            <div>
                <label htmlFor="color">Color: </label>
                <input type='color' id='color' value={color} onChange={(e) => { setColor(e.target.value) }} />
            </div>

            <div>
                <label>Status: </label>
                {/* htmlFor="status" */}
                <div>
                    <input type="radio" id="Active" value="Active" checked={selectedValue === "Active"} onChange={() => handleRadioChange("Active")} />
                    <label htmlFor="Active"> Active </label>
                    {/* <input type='checkbox' /> */}
                </div>
                <div>
                    <input type="radio" id="InActive" value="InActive" checked={selectedValue === "InActive"} onChange={() => handleRadioChange("InActive")} />
                    <label htmlFor="InActive"> InActive </label>
                    {/* <input type='checkbox' /> */}
                </div>
                {/* <input type='text' id='status' value={status} onChange={(e) => { setStatus(e.target.value) }} /> */}
            </div>
            <div>
                <label htmlFor="price">Price: </label>
                <input type='number' to="price" value={price} onChange={(e) => { setPrice(e.target.value) }} />
            </div>
            <div>
                <label htmlFor="quantity" >Quantity: </label>
                <input type='number' id="quantity" value={quantity} onChange={(e) => { setQuantity(e.target.value) }} />
            </div>
            <div>
                <label htmlFor="brandname">Brand Name: </label>
                <input type='text' id="brandname" value={brandname} onChange={(e) => { setBrandName(e.target.value) }} />
            </div>
            <div>
                <label htmlFor="remarks">Remarks</label>
                <input type='text' to="remarks" value={remarks} onChange={(e) => { setRemarks(e.target.value) }} />
            </div>
            <button onClick={submitForm}> Submit Product Details </button>
        </div>

    )
}

export default Edit_product