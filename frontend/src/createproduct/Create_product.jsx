// // import axios from 'axios';
// import React, { useState } from 'react'
// import api from './api';

// const Create_product = () => {
//     const [name, setName] = useState('');
//     const [size, setSize] = useState('');
//     const [color, setColor] = useState('#000');
//     // const [status, setStatus] = useState()
//     const [price, setPrice] = useState(0)
//     const [quantity, setQuantity] = useState(0)
//     const [brandname, setBrandName] = useState('')
//     const [remarks, setRemarks] = useState('')

//     const [selectedValue, setSelectedValue,] = useState("");
//     const handleRadioChange = (value) => { setSelectedValue(value); }

//     const submitForm = async (e) => {

//         const user = JSON.parse(localStorage.getItem('user'));
//         const { supplierId } = user.userEmail;

//         // user.token;
//         // const { supplierId } = req.drdr;
//         // const supplierId = localStorage.getItem('user')["userEmail"]._id;

//         // console.log(localStorage.getItem('user'));
//         // console.log(localStorage.getItem('user')["userEmail"]);
//         // console.log(localStorage.getItem('user')["userEmail"]._id);

//         // console.log(req.drdr._id);
//         if (!supplierId) { /* Not having supplierId. Only supplier can create product. */ }
//         // if (supplierId),, status, 

//         const product = await api.post('http://localhost:6080/product/createproduct', { supplierId, Name: name, Size: size, Color: color, Price: price, Quantity: quantity, BrandName: brandname, Remarks: remarks });
//         if (product) {
//             setName(''); setSize(''); setColor('#000'); setBrandName(''); setPrice(0); setQuantity(0); setRemarks('');
//         }
//     }
//     return (
//         <div>
//             <label>Create product</label>
//             <div>
//                 <label htmlFor="name">Name: </label>
//                 <input type='text' id='name' value={name} onChange={(e) => { setName(e.target.value) }} />
//             </div>
//             <div>
//                 <label htmlFor="size">Size: </label>
//                 <input type='text' id='size' value={size} onChange={(e) => { setSize(e.target.value) }} />
//             </div>
//             <div>
//                 <label htmlFor="color">Color: </label>
//                 <input type='color' id='color' value={color} onChange={(e) => { setColor(e.target.value) }} />
//             </div>

//             {/* <div>
//                 <label>Status: </label>
//                 {/* htmlFor="status" */}
//             {/* <div>
//                     <input type="radio" id="Active" value="Active" checked={selectedValue === "Active"} onChange={() => handleRadioChange("Active")} />
//                     <label htmlFor="Active"> Active </label> */}
//             {/* <input type='checkbox' /> */}
//             {/* </div>
//                 <div>
//                     <input type="radio" id="InActive" value="InActive" checked={selectedValue === "InActive"} onChange={() => handleRadioChange("InActive")} />
//                     <label htmlFor="InActive"> InActive </label> */}
//             {/* <input type='checkbox' /> */}
//             {/* </div> */}
//             {/* <input type='text' id='status' value={status} onChange={(e) => { setStatus(e.target.value) }} /> */}
//             {/* </div> */}

//             <div>
//                 <label htmlFor="price">Price: </label>
//                 <input type='number' to="price" value={price} onChange={(e) => { setPrice(e.target.value) }} />
//             </div>
//             <div>
//                 <label htmlFor="quantity" >Quantity: </label>
//                 <input type='number' id="quantity" value={quantity} onChange={(e) => { setQuantity(e.target.value) }} />
//             </div>
//             <div>
//                 <label htmlFor="brandname">Brand Name: </label>
//                 <input type='text' id="brandname" value={brandname} onChange={(e) => { setBrandName(e.target.value) }} />
//             </div>
//             <div>
//                 <label htmlFor="remarks">Remarks</label>
//                 <input type='text' to="remarks" value={remarks} onChange={(e) => { setRemarks(e.target.value) }} />
//             </div>
//             <button onClick={submitForm}> Submit Product Details </button>
//         </div>

//     )
// }
//==========================================================================
// export default Create_product

// src/pages/seller/CreateProduct.js
import React, { useState } from 'react';
import axios from 'axios';
import "./create_product.css";
import api from '../api';
// import { createProduct } from '../../api'; // seller api.js

const CreateProduct = () => {
    // const [about, setAbout] = useState("");
    // const [name, setName] = useState('');
    // const [size, setSize] = useState('');
    // const [color, setColor] = useState('#000000');
    // // const [status, setStatus] = useState()
    // const [price, setPrice] = useState(0)
    // const [quantity, setQuantity] = useState(0)
    // const [brandname, setBrandName] = useState('')
    // const [remarks, setRemarks] = useState('')
    // const [image, setImage] = useState('')

    const [productData, setProductData] = useState({ name: '', size: '', color: '#000000', price: 0, quantity: 0, brandname: '', remarks: '', description: '', image: '', });
    const [file, setFile] = useState(null);
    const [uploading, setUploading] = useState(false);

    const handleInputChange = (e) => { setProductData({ ...productData, [e.target.name]: e.target.value }); };
    const handleFileChange = (e) => { setFile(e.target.files[0]); };

    const uploadImageToCloudinary = async (file) => {
        setUploading(true);
        const cloudName = 'drp6kaniy';
        const unsignedUploadPreset = 'ecommerce_unsigned';
        //     const CLOUD_NAME = 'drp6kaniy';
        //     const API_KEY = '125725464918743';
        //     const API_secret_key = '8iFI2vy8nGWJXZmuhIIpPw8aRgo';
        //     const API_ENV_VAR = 'CLOUDINARY_URL = cloudinary://125725464918743:8iFI2vy8nGWJXZmuhIIpPw8aRgo@drp6kaniy';
        //     const UNSIGNED_PRESET_NAME = 'ecommerce_unsigned';

        const url = `https://api.cloudinary.com/v1_1/${cloudName}/upload`;

        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', unsignedUploadPreset);

        const res = await axios.post(url, formData);
        setUploading(false);
        return res.data.secure_url; // this is the URL of uploaded image
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        let imageUrl = productData.image;
        if (file) { /* Upload file to Cloudinary first */ imageUrl = await uploadImageToCloudinary(file); }

        console.log('112image:', imageUrl);
        const user = JSON.parse(localStorage.getItem('user'));
        const { supplierId } = user.userEmail;
        console.log('115image:', imageUrl);

        if (!supplierId) { /* Not having supplierId. Only supplier can create product. */ }
        console.log('image:', imageUrl);
        // const newProduct = { name: productData.name, price: productData.price, description: productData.description, image: imageUrl, };
        const newProduct = {
            supplierId, Name: productData.name, Size: productData.size, Color: productData.color, Price: productData.price,
            Quantity: productData.quantity, BrandName: productData.brandname, Remarks: productData.remarks, Image: imageUrl
        }

        try {

            const product = await api.post('http://localhost:6080/product/createproduct', newProduct);
            if (product) {
                // setName(''); setSize(''); setColor('#000000'); setBrandName(''); setPrice(0); setQuantity(0); setRemarks(''); 
                setProductData({ name: '', size: '', color: '#000000', price: 0, brandname: '', quantity: 0, remarks: '', image: '' });
                setFile(null);
            }
            // await createProduct(newProduct);
            alert('Product Created Successfully!');

        } catch (error) { console.error('Error creating product', error); }
    };

    // const submitForm = async (e) => {
    //     e.preventDefault();

    //     try {
    //         await uploadImageToCloudinary(file, (imageUrl) => {
    //             const newProduct = {
    //                 name: productData.name,
    //                 price: productData.price,
    //                 description: productData.description,
    //                 image: imageUrl,
    //             };
    //             createProduct(newProduct);
    //         });
    //         alert('Product Created Successfully!');

    //     } catch (error) { console.error('Error', error); }

    // }
    return (
        <div className="pro">
            <h1>CREATE PRODUCT</h1>
            <fieldset>
                <form onSubmit={handleSubmit}>
                    {/* action="#" method="get" */}
                    <label htmlFor="name"> Name*:</label>
                    <input type="text" name="name" id="name"
                        // value={name} onChange={(e) => setName(e.target.value) }
                        value={productData.name} onChange={handleInputChange}
                        placeholder="Enter Name" required
                    />

                    <div>
                        <label htmlFor="size">Size: </label>
                        <input type='text' id='size' name='size'
                            // value={size} onChange={(e) => { setSize(e.target.value) }} 
                            value={productData.size} onChange={handleInputChange}
                            placeholder="Enter Size"
                        />
                    </div>
                    <div>
                        <label htmlFor="color">Color: </label>
                        <input type='color' id='color' name='color'
                            // value={color} onChange={(e) => { setColor(e.target.value) }}
                            value={productData.color} onChange={handleInputChange}
                            style={{ height: '50px' }}
                        />
                    </div>

                    <div>
                        <label htmlFor="price">Price: </label>
                        <input type='number' id="price" name='price'
                            // value={price} onChange={(e) => { setPrice(e.target.value) }} 
                            value={productData.price} onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="quantity" >Quantity: </label>
                        <input type='number' id="quantity" name='quantity'
                            // value={quantity} onChange={(e) => { setQuantity(e.target.value) }} 
                            value={productData.quantity} onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="brandname">Brand Name: </label>
                        <input type='text' id="brandname" name='brandname'
                            // value={brandname} onChange={(e) => { setBrandName(e.target.value) }} 
                            value={productData.brandname} onChange={handleInputChange}
                            placeholder="Enter Brand Name"
                        />
                    </div>
                    <div>
                        <label htmlFor="remarks">Remarks:</label>
                        <input type='text' id="remarks" name="remarks"
                            // value={remarks} onChange={(e) => { setRemarks(e.target.value) }} 
                            value={productData.remarks} onChange={handleInputChange}
                            placeholder="Enter Remarks"
                        />
                    </div>

                    {/* <br /> */}
                    <div>
                        <label htmlFor="image">Product Image:</label>
                        <input type="file" id="image" name="image" onChange={handleFileChange} placeholder="Select Product Image" accept="image/*" />
                    </div>
                    {/* value={file} */}
                    {/* <br /> */}
                    {uploading && <p>Uploading Image...</p>}
                    {/* <button type="submit">Create Product</button> */}

                    {/* <input type="file" name="image" onChange={(e) => setImage(e.target.files[0])} /> */}
                    {/* <button onClick={submitForm} style={{ display: 'block', width: '100%', marginTop: '8px' }}> Submit Product Details </button> */}
                    <button type="submit" style={{ display: 'block', width: '100%', marginTop: '8px' }}> Submit Product Details </button>

                </form>
            </fieldset>
        </div>
    );
    // return (
    //     <div style={{ maxWidth: 500, margin: 'auto' }}>
    //         <h2>Create Product</h2>
    //         <form onSubmit={handleSubmit}>
    //             <input
    //                 type="text"
    //                 name="name"
    //                 placeholder="Product Name"
    //                 value={productData.name}
    //                 onChange={handleInputChange}
    //                 required
    //             />
    //             <br />
    //             <input
    //                 type="number"
    //                 name="price"
    //                 placeholder="Price"
    //                 value={productData.price}
    //                 onChange={handleInputChange}
    //                 required
    //             />
    //             <br />
    //             <textarea
    //                 name="description"
    //                 placeholder="Description"
    //                 value={productData.description}
    //                 onChange={handleInputChange}
    //                 required
    //             ></textarea>
    //             <br />
    //             <input type="file" onChange={handleFileChange} accept="image/*" />
    //             <br />
    //             {uploading && <p>Uploading Image...</p>}
    //             <button type="submit">Create Product</button>
    //         </form>
    //     </div>
    // );
};

export default CreateProduct;


//     const uploadImageToCloudinary = async (file, onImagesUploaded) => {
//         try {
//             setUploading(true);
//             const cloudName = 'your_cloud_name';
//             const unsignedUploadPreset = 'your_unsigned_preset';

//             const url = `https://api.cloudinary.com/v1_1/${cloudName}/upload`;
//             const formData = new FormData();
//             formData.append('file', file);
//             formData.append('upload_preset', unsignedUploadPreset);

//             const response = await axios.post(url, formData);
//             setUploading(false);
//             const imageUrl = response.data.secure_url;

//             if (onImagesUploaded) {
//                 onImagesUploaded(imageUrl); // call the callback function
//             }

//             return imageUrl;
//         } catch (error) {
//             console.error('Error uploading image', error);
//             setUploading(false);
//             throw error;
//         }
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         try {
//             await uploadImageToCloudinary(file, (imageUrl) => {
//                 const newProduct = {
//                     name: productData.name,
//                     price: productData.price,
//                     description: productData.description,
//                     image: imageUrl,
//                 };
//                 createProduct(newProduct);
//             });
//             alert('Product Created Successfully!');
//         } catch (error) {
//             console.error('Error', error);
//         }
//     };

//     return (
//         <div className="pro">
//             <h1>CREATE PRODUCT</h1>
//             <fieldset>
//                 <form action="#" method="get">

//                     <label htmlFor="name">
//                         Name*
//                     </label>
//                     <input
//                         type="text"
//                         name="name"
//                         id="name"
//                         value={name}
//                         onChange={(e) =>
//                             setName(e.target.value)
//                         }
//                         placeholder="Enter Name"
//                         required
//                     />

//                     <div>
//                         <label htmlFor="size">Size: </label>
//                         <input type='text' id='size' value={size} onChange={(e) => { setSize(e.target.value) }} placeholder="Enter Size" />
//                     </div>
//                     <div>
//                         <label htmlFor="color">Color: </label>
//                         <input type='color' id='color' value={color} onChange={(e) => { setColor(e.target.value) }}
//                             style={{ height: '50px' }} />
//                     </div>

//                     <div>
//                         <label htmlFor="price">Price: </label>
//                         <input type='number' id="price" value={price} onChange={(e) => { setPrice(e.target.value) }} />
//                     </div>
//                     <div>
//                         <label htmlFor="quantity" >Quantity: </label>
//                         <input type='number' id="quantity" value={quantity} onChange={(e) => { setQuantity(e.target.value) }} />
//                     </div>
//                     <div>
//                         <label htmlFor="brandname">Brand Name: </label>
//                         <input type='text' id="brandname" value={brandname} onChange={(e) => { setBrandName(e.target.value) }} placeholder="Enter Brand Name" />
//                     </div>
//                     <div>
//                         <label htmlFor="remarks">Remarks</label>
//                         <input type='text' id="remarks" value={remarks} onChange={(e) => { setRemarks(e.target.value) }} placeholder="Enter Remarks" />
//                     </div>
//                     <input type="file" name="image" onChange={(e) => setImage(e.target.files[0])} />
//                     <button onClick={submitForm} style={{ display: 'block', width: '100%', marginTop: '8px' }}> Submit Product Details </button>

//                 </form>
//             </fieldset>
//         </div>
//     );
// }

// export default Create_product;



// import React, { useState } from 'react';
// import api from './api';

// const Create_product = () => {
//     const [name, setName] = useState('');
//     const [size, setSize] = useState('');
//     const [color, setColor] = useState('#000');
//     const [price, setPrice] = useState(0);
//     const [quantity, setQuantity] = useState(0);
//     const [brandname, setBrandName] = useState('');
//     const [remarks, setRemarks] = useState('');
//     const [selectedValue, setSelectedValue] = useState("");

//     const handleRadioChange = (value) => {
//         setSelectedValue(value);
//     };

//     const submitForm = async (e) => {
//         e.preventDefault();
//         const user = JSON.parse(localStorage.getItem('user'));
//         const { supplierId } = user.userEmail;

//         if (!supplierId) {
//             alert("Only suppliers can create products!");
//             return;
//         }

//         try {
//             const product = await api.post('http://localhost:6080/product/createproduct', {
//                 supplierId,
//                 Name: name,
//                 Size: size,
//                 Color: color,
//                 Price: price,
//                 Quantity: quantity,
//                 BrandName: brandname,
//                 Remarks: remarks,
//                 Status: selectedValue
//             });

//             if (product) {
//                 setName('');
//                 setSize('');
//                 setColor('#000');
//                 setBrandName('');
//                 setPrice(0);
//                 setQuantity(0);
//                 setRemarks('');
//                 setSelectedValue('');
//                 alert("Product created successfully!");
//             }
//         } catch (error) {
//             console.error("Product creation failed:", error);
//             alert("Failed to create product.");
//         }
//     };

//     return (
//         <div className="max-w-xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-2xl">
//             <h2 className="text-2xl font-semibold mb-6 text-center">Create Product</h2>
//             <form onSubmit={submitForm} className="space-y-5">
//                 <div className="flex flex-col">
//                     <label htmlFor="name" className="mb-1 font-medium">Name</label>
//                     <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} className="p-2 border rounded-md" required />
//                 </div>

//                 <div className="flex flex-col">
//                     <label htmlFor="size" className="mb-1 font-medium">Size</label>
//                     <input type="text" id="size" value={size} onChange={(e) => setSize(e.target.value)} className="p-2 border rounded-md" />
//                 </div>

//                 <div className="flex flex-col">
//                     <label htmlFor="color" className="mb-1 font-medium">Color</label>
//                     <input type="color" id="color" value={color} onChange={(e) => setColor(e.target.value)} className="w-16 h-10 p-1 border rounded" />
//                 </div>

//                 <div className="flex flex-col">
//                     <label className="mb-1 font-medium">Status</label>
//                     <div className="flex gap-4">
//                         <label className="flex items-center">
//                             <input type="radio" value="Active" checked={selectedValue === "Active"} onChange={() => handleRadioChange("Active")} className="mr-2" />
//                             Active
//                         </label>
//                         <label className="flex items-center">
//                             <input type="radio" value="InActive" checked={selectedValue === "InActive"} onChange={() => handleRadioChange("InActive")} className="mr-2" />
//                             InActive
//                         </label>
//                     </div>
//                 </div>

//                 <div className="flex flex-col">
//                     <label htmlFor="price" className="mb-1 font-medium">Price</label>
//                     <input type="number" id="price" value={price} onChange={(e) => setPrice(e.target.value)} className="p-2 border rounded-md" />
//                 </div>

//                 <div className="flex flex-col">
//                     <label htmlFor="quantity" className="mb-1 font-medium">Quantity</label>
//                     <input type="number" id="quantity" value={quantity} onChange={(e) => setQuantity(e.target.value)} className="p-2 border rounded-md" />
//                 </div>

//                 <div className="flex flex-col">
//                     <label htmlFor="brandname" className="mb-1 font-medium">Brand Name</label>
//                     <input type="text" id="brandname" value={brandname} onChange={(e) => setBrandName(e.target.value)} className="p-2 border rounded-md" />
//                 </div>

//                 <div className="flex flex-col">
//                     <label htmlFor="remarks" className="mb-1 font-medium">Remarks</label>
//                     <input type="text" id="remarks" value={remarks} onChange={(e) => setRemarks(e.target.value)} className="p-2 border rounded-md" />
//                 </div>

//                 <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-200">
//                     Submit Product Details
//                 </button>
//             </form>
//         </div>
//     );
// };

// export default Create_product;


// import React, { useState } from 'react';
// import api from './api';

// const Create_product = () => {
//     const [name, setName] = useState('');
//     const [size, setSize] = useState('');
//     const [color, setColor] = useState('#000');
//     const [price, setPrice] = useState(0);
//     const [quantity, setQuantity] = useState(0);
//     const [brandname, setBrandName] = useState('');
//     const [remarks, setRemarks] = useState('');
//     const [selectedValue, setSelectedValue] = useState('');

//     const handleRadioChange = (value) => {
//         setSelectedValue(value);
//     };

//     const submitForm = async () => {
//         const user = JSON.parse(localStorage.getItem('user'));
//         const { supplierId } = user.userEmail;

//         if (!supplierId) return alert("Only suppliers can create products");

//         const product = await api.post('http://localhost:6080/product/createproduct', {
//             supplierId,
//             Name: name,
//             Size: size,
//             Color: color,
//             Price: price,
//             Quantity: quantity,
//             BrandName: brandname,
//             Remarks: remarks
//         });

//         if (product) {
//             setName('');
//             setSize('');
//             setColor('#000');
//             setBrandName('');
//             setPrice(0);
//             setQuantity(0);
//             setRemarks('');
//         }
//     };

//     return (
//         <div className="min-h-screen flex items-center justify-center bg-gray-100">
//             <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-2xl">
//                 <h2 className="text-2xl font-semibold mb-6 text-center">Create Product</h2>

//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                     <div>
//                         <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
//                         <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)}
//                             className="mt-1 w-full p-2 border rounded-md shadow-sm" />
//                     </div>
//                     <div>
//                         <label htmlFor="size" className="block text-sm font-medium text-gray-700">Size</label>
//                         <input type="text" id="size" value={size} onChange={(e) => setSize(e.target.value)}
//                             className="mt-1 w-full p-2 border rounded-md shadow-sm" />
//                     </div>
//                     <div>
//                         <label htmlFor="color" className="block text-sm font-medium text-gray-700">Color</label>
//                         <input type="color" id="color" value={color} onChange={(e) => setColor(e.target.value)}
//                             className="mt-1 w-full h-10 p-1 border rounded-md" />
//                     </div>
//                     <div>
//                         <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price</label>
//                         <input type="number" id="price" value={price} onChange={(e) => setPrice(e.target.value)}
//                             className="mt-1 w-full p-2 border rounded-md shadow-sm" />
//                     </div>
//                     <div>
//                         <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">Quantity</label>
//                         <input type="number" id="quantity" value={quantity} onChange={(e) => setQuantity(e.target.value)}
//                             className="mt-1 w-full p-2 border rounded-md shadow-sm" />
//                     </div>
//                     <div>
//                         <label htmlFor="brandname" className="block text-sm font-medium text-gray-700">Brand Name</label>
//                         <input type="text" id="brandname" value={brandname} onChange={(e) => setBrandName(e.target.value)}
//                             className="mt-1 w-full p-2 border rounded-md shadow-sm" />
//                     </div>
//                     <div className="md:col-span-2">
//                         <label htmlFor="remarks" className="block text-sm font-medium text-gray-700">Remarks</label>
//                         <input type="text" id="remarks" value={remarks} onChange={(e) => setRemarks(e.target.value)}
//                             className="mt-1 w-full p-2 border rounded-md shadow-sm" />
//                     </div>
//                 </div>

//                 {/* Uncomment and Use If Status Field is Needed */}
//                 {/* <div className="flex items-center gap-4 mt-4">
//                     <div>
//                         <input type="radio" id="Active" value="Active" checked={selectedValue === "Active"} onChange={() => handleRadioChange("Active")} />
//                         <label htmlFor="Active" className="ml-1">Active</label>
//                     </div>
//                     <div>
//                         <input type="radio" id="InActive" value="InActive" checked={selectedValue === "InActive"} onChange={() => handleRadioChange("InActive")} />
//                         <label htmlFor="InActive" className="ml-1">Inactive</label>
//                     </div>
//                 </div> */}

//                 <div className="mt-6 text-center">
//                     <button
//                         onClick={submitForm}
//                         className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition"
//                     >
//                         Submit Product
//                     </button>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Create_product;
