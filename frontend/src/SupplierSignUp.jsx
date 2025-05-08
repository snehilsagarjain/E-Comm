import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
const SupplierSignUp = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [gst, setGst] = useState('');
    const [firmname, setFirmName] = useState('');
    const [payment, setPayment] = useState('');

    const [selectedOption, setSelectedOption] = useState('');
    const handleChange = (event) => { setSelectedOption(event.target.value); }

    const [selectedValue, setSelectedValue] = useState("");
    const handleRadioChange = (value) => { setSelectedValue(value); }

    const submitForm = async (e) => {
        const id = await axios.post('http://localhost:6080/supplier/createSupplier', { gst, category: selectedOption, firmname, payment: selectedValue });
        const result = id.data;
        await axios.post('http://localhost:6080/user/createUser', { supplierId: result, email, password, name, phone, role: 'supplier' });
    }
    const navigate = useNavigate();

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div style={{ padding: '10px', border: '1px solid black' }}>
                <label style={{ marginBottom: '10px' }}> <b> Supplier Sign Up </b> </label>
                <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start', marginTop: '10px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                        <label htmlFor='firmname' style={{ marginBottom: '8px' }}>FirmName:</label>
                        <label htmlFor='email' style={{ marginTop: '6px', marginBottom: '8px' }}>Email Address:</label>
                        <label htmlFor='password' style={{ marginTop: '6px', marginBottom: '8px' }}>Password:</label>
                        <label htmlFor='name' style={{ marginTop: '6px', marginBottom: '8px' }}>Name:</label>
                        <label htmlFor='phone' style={{ marginTop: '5px', marginBottom: '8px' }}>Phone:</label>
                        <label htmlFor='gst' style={{ marginTop: '5px', marginBottom: '8px' }}>Gst:</label>
                        <label htmlFor='category' style={{ marginTop: '0px', marginBottom: '8px' }}>Category:</label>
                        <label style={{ marginTop: '5px', marginBottom: '8px' }}> Payment </label>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                        <input type="text" id='firmname' value={firmname} onChange={(e) => setFirmName(e.target.value)} style={{ marginBottom: '8px', width: '98%' }} />
                        <input type="email" id='email' value={email} onChange={(e) => setEmail(e.target.value)} style={{ marginTop: '8px', marginBottom: '8px', width: '98%' }} />
                        <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} style={{ marginTop: '8px', marginBottom: '8px', width: '98%' }} />
                        <input type="text" id='name' value={name} onChange={(e) => setName(e.target.value)} style={{ marginTop: '8px', marginBottom: '8px', width: '98%' }} />
                        <input type="text" id='phone' value={phone} onChange={(e) => setPhone(e.target.value)} style={{ marginTop: '8px', marginBottom: '8px', width: '98%' }} />
                        <input type="text" id='gst' value={gst} onChange={(e) => setGst(e.target.value)} style={{ marginTop: '8px', marginBottom: '8px', width: '98%' }} />
                        <select id='category' value={selectedOption} onChange={handleChange} style={{ marginTop: '8px', marginBottom: '8px', width: '100%' }} >
                            <option value="">Select Category</option>
                            <option value="Electronics">Electronics</option>
                            <option value="Furniture">Furniture</option>
                            <option value="Clothing">Clothing</option>
                            <option value="HealthCare">HealthCare</option>
                        </select>
                        <div style={{ display: 'flex', gap: '10px', marginTop: '8px', marginBottom: '8px', width: '100%' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                                <input type="radio" id="Online" value="Online" checked={selectedValue === "Online"} onChange={() => handleRadioChange("Online")} />
                                <label htmlFor="Online">Online</label>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                                <input type="radio" id="Cash" value="Cash" checked={selectedValue === "Cash"} onChange={() => handleRadioChange("Cash")} />
                                <label htmlFor="Cash">Cash</label>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                                <input type="radio" id="Both Online and Cash" value="Both Online and Cash" checked={selectedValue === "Both Online and Cash"} onChange={() => handleRadioChange("Both Online and Cash")} />
                                <label htmlFor="Both Online and Cash">Both Online and Cash</label>
                            </div>
                        </div>
                    </div>
                </div>
                <div style={{ marginTop: '20px' }}>
                    <button style={{ width: '100%', border: '1px solid black', padding: '10px' }} onClick={submitForm}>Submit Supplier Details</button>
                    <div style={{ marginTop: '40px' }}>
                        {/* <Link to="/usersignup">  */}
                        <button style={{ border: '1px solid black' }} onClick={() => { navigate('/usersignup') }}>User Sign Up</button>
                        {/* </Link> */}
                        {/* <Link to="/sellersignup"> */}
                        <button
                            style={{ border: '1px solid black' }}
                            onClick={
                                () => {
                                    // Retrieve the stored route or default to "/"
                                    // let redirectPath = localStorage.getItem("redirectAfterLogin") || "/";
                                    let redirectPath = localStorage.getItem("redirectAfterLogin") || "/userDashboard";
                                    navigate(redirectPath);
                                }
                            }
                        > Back </button>
                        {/* </Link> */}
                        <div>Already signed up? <span onClick={() => { navigate("/login") }} style={{ cursor: "pointer", color: 'black', textDecoration: 'underline', textDecorationThickness: '2px' }}>Log In </span> </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default SupplierSignUp;

//==========================================================================

// import React, { useState } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';

// // import { Progress } from '@/components/ui/progress';
// // import { Progress } from "@shadcn/ui";

// import { Tooltip } from 'react-tooltip';
// import { AiOutlineLoading3Quarters, AiOutlineCheckCircle } from 'react-icons/ai';
// import Particles from 'react-tsparticles';

// // import { loadFull } from 'tsparticles';
// // // import { loadFull } from 'tsparticles-engine';

// import Confetti from 'react-confetti';
// import { useWindowSize } from 'react-use';
// import Lottie from 'lottie-react';

// // import animationData from './success-animation.json';
// import animationData from './animations/success-animation.json';

// const UltimateAnimatedForm = () => {
//     const [formData, setFormData] = useState({ name: '', email: '', password: '' });
//     const [errors, setErrors] = useState({});
//     const [isSubmitting, setIsSubmitting] = useState(false);
//     const [isSubmitted, setIsSubmitted] = useState(false);
//     const { width, height } = useWindowSize();

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData({ ...formData, [name]: value });
//         if (value) setErrors((prev) => ({ ...prev, [name]: false }));
//     };

//     const calculateProgress = () => {
//         const totalFields = 3;
//         const filledFields = Object.values(formData).filter(Boolean).length;
//         return (filledFields / totalFields) * 100;
//     };

//     const getProgressColor = () => {
//         const progress = calculateProgress();
//         if (progress < 33) return 'bg-red-500';
//         if (progress < 66) return 'bg-yellow-500';
//         return 'bg-green-500';
//     };

//     const handleSubmit = (e) => {
//         e.preventDefault();

//         const newErrors = {};
//         Object.keys(formData).forEach((key) => {
//             if (!formData[key]) newErrors[key] = true;
//         });

//         setErrors(newErrors);

//         if (Object.keys(newErrors).length === 0) {
//             setIsSubmitting(true);
//             setTimeout(() => {
//                 setIsSubmitting(false);
//                 setIsSubmitted(true);
//                 setFormData({ name: '', email: '', password: '' });
//                 setTimeout(() => setIsSubmitted(false), 4000);
//             }, 1500);
//         }
//     };

//     const inputField = (id, label, type = 'text', tooltip) => (
//         <motion.div
//             className="relative mb-6"
//             animate={errors[id] ? { x: [0, -10, 10, -10, 0] } : { x: 0, opacity: 1 }}
//             transition={{ duration: 0.5, delay: id === 'name' ? 0 : id === 'email' ? 0.2 : 0.4 }}
//             initial={{ x: -100, opacity: 0 }}
//         >
//             <motion.input
//                 id={id}
//                 name={id}
//                 type={type}
//                 value={formData[id]}
//                 onChange={handleChange}
//                 className={`block w-full px-4 py-3 text-gray-800 bg-transparent border border-gray-300 rounded-lg focus:outline-none focus:ring-2 peer ${errors[id] ? 'border-red-500' : 'focus:ring-blue-500'} focus:scale-105 transition-transform bg-gradient-to-r from-blue-200 to-purple-200 hover:bg-gradient-to-r hover:from-purple-200 hover:to-blue-200 focus:shadow-[0_0_8px_0_rgba(66,153,225,0.6)]`}
//                 placeholder=" "
//                 data-tooltip-id={id + '-tooltip'}
//             />
//             <Tooltip id={id + '-tooltip'}>{tooltip}</Tooltip>
//             <label
//                 htmlFor={id}
//                 className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-90 top-2 left-3 peer-placeholder-shown:top-1/2 peer-placeholder-shown:left-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:left-3 peer-focus:text-sm peer-focus:text-blue-600"
//             >
//                 {label}
//             </label>
//         </motion.div>
//     );
//     //
//     return (
//         <div className="relative flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-400 to-blue-500">
//             {/* <Particles
//                 id="tsparticles"
//                 // init={loadFull}
//                 options={{
//                     particles: {
//                         number: { value: 50 },
//                         size: { value: 3 },
//                         move: { speed: 0.5 },
//                         opacity: { value: 0.5 },
//                         shape: { type: "circle" },
//                         links: { enable: true, distance: 150, color: "#ffffff" }
//                     }
//                 }}
//                 className="absolute inset-0 z-0"
//             /> */}

//             {isSubmitted && <Confetti width={width} height={height} />}
//             {isSubmitted && <Lottie animationData={animationData} loop={false} />}

//             <motion.div
//                 initial={{ opacity: 0, scale: 0.8 }}
//                 animate={{ opacity: 1, scale: 1 }}
//                 transition={{ duration: 0.7 }}
//                 className="relative p-8 bg-white shadow-2xl rounded-2xl w-full max-w-md z-10"
//             >
//                 <h2 className="text-2xl font-bold mb-6 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">Ultimate Animated Form</h2>
//                 <form onSubmit={handleSubmit} className="space-y-6">
//                     {inputField('name', 'Name', 'text', 'Enter your full name')}
//                     {inputField('email', 'Email', 'email', 'Enter a valid email address')}
//                     {inputField('password', 'Password', 'password', 'Password should be at least 6 characters')}

//                     {/* <Progress value={calculateProgress()} className={`my-4 ${getProgressColor()}`} /> */}

//                     <motion.button type="submit" disabled={isSubmitting}
//                         whileHover={{ scale: 1.05, transition: { yoyo: Infinity } }} whileTap={Object.keys(errors).length ? { x: [0, -10, 10, -10, 0] } : { scale: 0.95 }}
//                         className="w-full p-3 mt-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg shadow-lg hover:bg-gradient-to-r hover:from-purple-500 hover:to-blue-500 flex items-center justify-center"
//                     >
//                         {isSubmitting ? <AiOutlineLoading3Quarters className="animate-spin mr-2" /> : 'Submit'}
//                     </motion.button>
//                 </form>
//             </motion.div>
//         </div>
//     );
// };

// export default UltimateAnimatedForm;
//========================================================================================

// import React, { useState } from 'react';
// import { motion } from 'framer-motion';
// import { CheckCircle } from 'lucide-react';

{/*
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
*/}
// import { Sun, Moon } from 'lucide-react';

// const AnimatedReactForm = () => {
//     const [formData, setFormData] = useState({ name: '', email: '', password: '' });
//     const [isSubmitted, setIsSubmitted] = useState(false);

// const [darkMode, setDarkMode] = useState(false);
// const toggleDarkMode = () => setDarkMode(!darkMode);

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData({ ...formData, [name]: value });
//     };

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         setIsSubmitted(true);
//         setTimeout(() => setIsSubmitted(false), 3000);
//     };

{/*
const validationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required')
});

const handleSubmit = (values, { resetForm }) => {
    console.log('Form Data:', values);
    resetForm();
};
*/}
// // const FormComponent = lazy(() => import('./FormComponent'));

//     return (
// <div className={`${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-800'} min-h-screen flex flex-col items-center justify-center transition-colors duration-300`}>
//         <div className="flex items-center justify-center min-h-screen bg-gray-100">
//             <motion.div
//                 initial={{ opacity: 0, y: -50 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 
//                 initial={{ opacity: 0, scale: 0.9 }}
//                 animate={{ opacity: 1, scale: 1 }}
//                 transition={{ duration: 0.5 }}
//                 className="p-8 bg-white shadow-lg rounded-2xl w-full max-w-md"
//             >

{/* <Suspense fallback={<div className="text-center">Loading Form...</div>}>
{/* <FormComponent /> */} {/*
</Suspense> */}

{/* <div className="flex justify-end mb-4">
                    <button onClick={toggleDarkMode} className="p-2 focus:outline-none">
                        {darkMode ? <Sun className="w-6 h-6 text-yellow-400" /> : <Moon className="w-6 h-6 text-blue-500" />}
                    </button>
                </div> */}

//                 <h2 className="text-2xl font-bold mb-6 text-gray-800">Sign Up</h2>

//                 {isSubmitted && (
//                     <motion.div
//                         initial={{ opacity: 0, scale: 0.8 }}
//                         animate={{ opacity: 1, scale: 1 }}
//                         transition={{ duration: 0.4 }}
//                         className="flex items-center gap-2 p-4 mb-6 bg-green-100 text-green-700 rounded-lg"
//                     >
//                         <CheckCircle className="w-6 h-6" />
//                         Form Submitted Successfully!
//                     </motion.div>
//                 )}
{/*
                // <Formik
                //     initialValues={{ name: '', email: '', password: '' }}
                //     validationSchema={validationSchema}
                //     onSubmit={handleSubmit}
                // >
// {({ touched, errors }) => (
//     <Form className="space-y-6">
*/}

{/* <form className="space-y-6"> */ }
//                 <form onSubmit={handleSubmit} className="space-y-6">
//                     {['name', 'email', 'password'].map((field) => (
// <>
//                         <div key={field} className="relative">
//                             <input
//                                 type={field === 'password' ? 'password' : 'text'}
//                                 name={field}
//                                 value={formData[field]}
//                                 onChange={handleChange}
//                                 className="w-full p-3 text-gray-800 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
//                                 placeholder={`Enter your ${field.charAt(0).toUpperCase() + field.slice(1)}`}
// className={`w-full p-3 rounded-lg transition-all ${darkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300 text-gray-800'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
//                             />
{/* <Field
                                        type={field === 'password' ? 'password' : 'text'}
                                        name={field}
                                        className={`w-full p-3 text-gray-800 border ${errors[field] && touched[field] ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all`}
                                        placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                                    />
                                    <ErrorMessage name={field} component="div" className="text-red-500 text-sm mt-1" /> */}
//                         </div>
{/* <div key={field} className="relative mb-4">
                            <input
                                type={field === 'password' ? 'password' : 'text'}
                                name={field}
                                value={formData[field]}
                                onChange={handleChange}
                                className="w-full p-3 text-gray-800 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all peer"
                            />
                            <label
                                htmlFor={field}
                                className={`absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 peer-focus:top-2.5 peer-focus:text-sm transition-all ${formData[field] && 'top-2.5 text-sm'
                                    }`}
                            >
                                {field.charAt(0).toUpperCase() + field.slice(1)}
                            </label>
                        </div> */}
// </>
//                     ))}

//                     <motion.button
//                         whileHover={{ scale: 1.05 }}
//                         whileTap={{ scale: 0.95 }}
//                         type="submit"
//                         className="w-full p-3 mt-4 text-white bg-blue-500 rounded-lg shadow hover:bg-blue-600 transition-all"
// className="relative w-full p-3 mt-4 text-white bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg shadow transition-all overflow-hidden"
//                     >
{/* <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white opacity-30 animate-pulse" />
<span className="relative z-10">Submit</span> */}
//                         Submit
//                     </motion.button>
//                 </form>
{/*
// </Form>
// )}
// </Formik>
*/}


//             </motion.div>
//         </div>
//     );
// };

// export default AnimatedReactForm;
//===========================================================================
// import React, { useState } from 'react';
// import { motion } from 'framer-motion';

// const EnhancedFormLayouts = () => {
//     const [step, setStep] = useState(1);
//     const [formData, setFormData] = useState({ name: '', email: '', password: '', address: '', phone: '' });

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData({ ...formData, [name]: value });
//     };

//     const nextStep = () => setStep(step + 1);
//     const prevStep = () => setStep(step - 1);

//     const renderStep = () => {
//         switch (step) {
//             case 1:
//                 return (
//                     <div>
//                         <input
//                             name="name"
//                             value={formData.name}
//                             onChange={handleChange}
//                             placeholder="Name"
//                             className="w-full p-3 mb-4 border rounded-lg"
//                         />
//                         <input
//                             name="email"
//                             value={formData.email}
//                             onChange={handleChange}
//                             placeholder="Email"
//                             className="w-full p-3 mb-4 border rounded-lg"
//                         />
//                     </div>
//                 );
//             case 2:
//                 return (
//                     <div>
//                         <input
//                             name="password"
//                             value={formData.password}
//                             onChange={handleChange}
//                             placeholder="Password"
//                             type="password"
//                             className="w-full p-3 mb-4 border rounded-lg"
//                         />
//                         <input
//                             name="address"
//                             value={formData.address}
//                             onChange={handleChange}
//                             placeholder="Address"
//                             className="w-full p-3 mb-4 border rounded-lg"
//                         />
//                     </div>
//                 );
//             case 3:
//                 return (
//                     <div>
//                         <input
//                             name="phone"
//                             value={formData.phone}
//                             onChange={handleChange}
//                             placeholder="Phone Number"
//                             className="w-full p-3 mb-4 border rounded-lg"
//                         />
//                         <button
//                             className="w-full p-3 mt-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
//                             type="submit"
//                         >
//                             Submit
//                         </button>
//                     </div>
//                 );
//             default:
//                 return null;
//         }
//     };

//     return (
//         <div className="flex items-center justify-center min-h-screen bg-gray-100">
//             <motion.div
//                 initial={{ opacity: 0, y: -50 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.5 }}
//                 className="p-8 bg-white shadow-lg rounded-2xl w-full max-w-md"
//             >
//                 <form>
//                     {renderStep()}
//                     <div className="flex justify-between mt-6">
//                         {step > 1 && (
//                             <button type="button" onClick={prevStep} className="text-blue-500">Back</button>
//                         )}
//                         {step < 3 && (
//                             <button type="button" onClick={nextStep} className="text-blue-500">Next</button>
//                         )}
//                     </div>
//                 </form>
//             </motion.div>
//         </div>
//     );
// };

// export default EnhancedFormLayouts;
//=============================================

// import React, { useState } from 'react';
// import { motion } from 'framer-motion';

// const CustomFormValidations = () => {
//     const [formData, setFormData] = useState({ name: '', email: '', password: '' });
//     const [errors, setErrors] = useState({});

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData({ ...formData, [name]: value });
//         validateField(name, value);
//     };

//     const validateField = (name, value) => {
//         let errorMsg = '';
//         if (!value) {
//             errorMsg = 'This field is required';
//         } else if (name === 'email' && !/^[\w-\.]+@[\w-]+\.[\w-]{2,4}$/.test(value)) {
//             errorMsg = 'Invalid email address';
//         } else if (name === 'password' && value.length < 6) {
//             errorMsg = 'Password must be at least 6 characters long';
//         }

//         setErrors({ ...errors, [name]: errorMsg });
//     };

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         if (Object.values(errors).every(error => error === '') &&
//             Object.values(formData).every(field => field !== '')) {
//             alert('Form Submitted Successfully!');
//         } else {
//             alert('Please fix the errors before submitting');
//         }
//     };

//     return (
//         <div className="flex items-center justify-center min-h-screen bg-gray-100">
//             <motion.div
//                 initial={{ opacity: 0, y: -50 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.5 }}
//                 className="p-8 bg-white shadow-lg rounded-2xl w-full max-w-md"
//             >
//                 <h2 className="text-2xl font-bold mb-6 text-gray-800">Sign Up</h2>
//                 <form onSubmit={handleSubmit} className="space-y-6">
//                     {['name', 'email', 'password'].map((field) => (
//                         <div key={field} className="relative">
//                             <input
//                                 type={field === 'password' ? 'password' : 'text'}
//                                 name={field}
//                                 value={formData[field]}
//                                 onChange={handleChange}
//                                 className={`w-full p-3 border ${errors[field] ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none`}
//                                 placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
//                             />
//                             {errors[field] && <div className="text-red-500 text-sm mt-1">{errors[field]}</div>}
//                         </div>
//                     ))}

//                     <motion.button
//                         whileHover={{ scale: 1.05 }}
//                         whileTap={{ scale: 0.95 }}
//                         type="submit"
//                         className="w-full p-3 mt-4 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600"
//                     >
//                         Submit
//                     </motion.button>
//                 </form>
//             </motion.div>
//         </div>
//     );
// };

// export default CustomFormValidations;
//==================================================================

// import React, { useState } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';

// const ImprovedFormAnimations = () => {
//   const [formData, setFormData] = useState({ name: '', email: '', password: '' });
//   const [submitted, setSubmitted] = useState(false);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     setSubmitted(true);
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-100">
//       <motion.div
//         initial={{ opacity: 0, y: -50 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5 }}
//         className="p-8 bg-white shadow-lg rounded-2xl w-full max-w-md"
//       >
//         <AnimatePresence mode="wait">
//           {!submitted ? (
//             <motion.form
//               key="form"
//               initial={{ x: 300, opacity: 0 }}
//               animate={{ x: 0, opacity: 1 }}
//               exit={{ x: -300, opacity: 0 }}
//               transition={{ duration: 0.5 }}
//               onSubmit={handleSubmit}
//               className="space-y-6"
//             >
//               {['name', 'email', 'password'].map((field) => (
//                 <div key={field}>
//                   <input
//                     type={field === 'password' ? 'password' : 'text'}
//                     name={field}
//                     value={formData[field]}
//                     onChange={handleChange}
//                     className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none"
//                     placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
//                   />
//                 </div>
//               ))}

//               <motion.button
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//                 type="submit"
//                 className="w-full p-3 mt-4 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600"
//               >
//                 Submit
//               </motion.button>
//             </motion.form>
//           ) : (
//             <motion.div
//               key="successMessage"
//               initial={{ y: -50, opacity: 0 }}
//               animate={{ y: 0, opacity: 1 }}
//               exit={{ y: 50, opacity: 0 }}
//               transition={{ duration: 0.5 }}
//               className="text-center"
//             >
//               <h2 className="text-2xl font-bold text-green-600 mb-4">Form Submitted Successfully!</h2>
//               <button
//                 onClick={() => setSubmitted(false)}
//                 className="p-2 mt-4 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600"
//               >
//                 Submit Another Response
//               </button>
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </motion.div>
//     </div>
//   );
// };

// export default ImprovedFormAnimations;
//==================================================================

// import React, { useState } from 'react';
// import { motion } from 'framer-motion';

// const AccessibilityEnhancements = () => {
//     const [formData, setFormData] = useState({ name: '', email: '', password: '' });
//     const [errors, setErrors] = useState({});

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData({ ...formData, [name]: value });
//     };

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         alert('Form Submitted Successfully!');
//     };

//     const inputField = (id, label, type = 'text', placeholder = '') => (
//         <div className="mb-4">
//             <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
//             <input
//                 id={id}
//                 name={id}
//                 type={type}
//                 value={formData[id]}
//                 onChange={handleChange}
//                 placeholder={placeholder}
//                 aria-required="true"
//                 aria-invalid={errors[id] ? 'true' : 'false'}
//                 className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//             {errors[id] && <div role="alert" className="text-red-500 text-sm mt-1">{errors[id]}</div>}
//         </div>
//     );

//     return (
//         <div className="flex items-center justify-center min-h-screen bg-gray-100">
//             <motion.div
//                 initial={{ opacity: 0, y: -50 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.5 }}
//                 className="p-8 bg-white shadow-lg rounded-2xl w-full max-w-md"
//             >
//                 <h2 className="text-2xl font-bold mb-6 text-gray-800" tabIndex="0">Accessible Form</h2>
//                 <form onSubmit={handleSubmit} className="space-y-6">
//                     {inputField('name', 'Name')}
//                     {inputField('email', 'Email', 'email')}
//                     {inputField('password', 'Password', 'password')}

//                     <motion.button
//                         whileHover={{ scale: 1.05 }}
//                         whileTap={{ scale: 0.95 }}
//                         type="submit"
//                         className="w-full p-3 mt-4 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600"
//                         aria-label="Submit Form"
//                     >
//                         Submit
//                     </motion.button>
//                 </form>
//             </motion.div>
//         </div>
//     );
// };

// export default AccessibilityEnhancements;
//==================================================================
// import React, { useState } from 'react';
// import { motion } from 'framer-motion';

// const EnhancedStylingForm = () => {
//     const [formData, setFormData] = useState({ name: '', email: '', password: '' });
//     const [errors, setErrors] = useState({});

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData({ ...formData, [name]: value });
//     };

//     const validateForm = () => {
//         const newErrors = {};
//         if (!formData.name.trim()) newErrors.name = 'Name is required';
//         if (!formData.email.trim()) newErrors.email = 'Email is required';
//         else if (!/^[\w-.]+@[\w-]+\.[\w-.]+$/.test(formData.email)) newErrors.email = 'Invalid email address';
//         if (!formData.password.trim()) newErrors.password = 'Password is required';
//         else if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters long';

//         setErrors(newErrors);
//         return Object.keys(newErrors).length === 0;
//     };

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         if (validateForm()) {
//             alert('Form Submitted Successfully!');
//             setFormData({ name: '', email: '', password: '' });
//             setErrors({});
//         }
//     };

//     const inputField = (id, label, type = 'text', placeholder = '') => (
//         <div className="mb-4">
//             <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
//             <input
//                 id={id}
//                 name={id}
//                 type={type}
//                 value={formData[id]}
//                 onChange={handleChange}
//                 placeholder={placeholder}
//                 aria-required="true"
//                 aria-invalid={errors[id] ? 'true' : 'false'}
//                 className={`w-full p-3 border ${errors[id] ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 text-gray-800`}
//             />
//             {errors[id] && <div role="alert" className="text-red-500 text-sm mt-1">{errors[id]}</div>}
//         </div>
//     );

//     return (
//         <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-blue-300">
//             <motion.div
//                 initial={{ opacity: 0, y: -50 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.5 }}
//                 className="p-8 bg-white shadow-xl rounded-2xl w-full max-w-lg"
//             >
//                 <h2 className="text-3xl font-bold mb-6 text-blue-700 text-center" tabIndex="0">Enhanced Stylish Form</h2>
//                 <form onSubmit={handleSubmit} className="space-y-6">
//                     {inputField('name', 'Name')}
//                     {inputField('email', 'Email', 'email')}
//                     {inputField('password', 'Password', 'password')}

//                     <motion.button
//                         whileHover={{ scale: 1.05 }}
//                         whileTap={{ scale: 0.95 }}
//                         type="submit"
//                         className="w-full p-3 mt-4 bg-blue-500 text-white rounded-lg shadow-lg hover:bg-blue-600"
//                         aria-label="Submit Form"
//                     >
//                         Submit
//                     </motion.button>
//                 </form>
//             </motion.div>
//         </div>
//     );
// };

// export default EnhancedStylingForm;
//================================================================

// import React, { useState } from 'react';
// import { motion } from 'framer-motion';

// const AnimatedLabelsForm = () => {
//     const [formData, setFormData] = useState({ name: '', email: '', password: '' });
//     const [focusedField, setFocusedField] = useState(null);

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData({ ...formData, [name]: value });
//     };

//     const handleFocus = (field) => {
//         setFocusedField(field);
//     };

//     const handleBlur = () => {
//         setFocusedField(null);
//     };

//     const inputField = (id, label, type = 'text') => (
//         <div className="relative mb-6">
//             <motion.label
//                 htmlFor={id}
//                 className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 transition-all"
//                 animate={{
//                     top: formData[id] || focusedField === id ? '0px' : '50%',
//                     left: formData[id] || focusedField === id ? '10px' : '12px',
//                     fontSize: formData[id] || focusedField === id ? '12px' : '16px',
//                     color: formData[id] || focusedField === id ? '#2563EB' : '#6B7280'
//                 }}
//             >
//                 {label}
//             </motion.label>
//             <input
//                 id={id}
//                 name={id}
//                 type={type}
//                 value={formData[id]}
//                 onChange={handleChange}
//                 onFocus={() => handleFocus(id)}
//                 onBlur={handleBlur}
//                 className="w-full p-3 pt-6 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//         </div>
//     );

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         alert('Form Submitted Successfully!');
//     };

//     return (
//         <div className="flex items-center justify-center min-h-screen bg-gray-100">
//             <motion.div
//                 initial={{ opacity: 0, y: -50 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.5 }}
//                 className="p-8 bg-white shadow-lg rounded-2xl w-full max-w-md"
//             >
//                 <h2 className="text-2xl font-bold mb-6 text-blue-700 text-center">Animated Labels Form</h2>
//                 <form onSubmit={handleSubmit} className="space-y-6">
//                     {inputField('name', 'Name')}
//                     {inputField('email', 'Email', 'email')}
//                     {inputField('password', 'Password', 'password')}

//                     <motion.button
//                         whileHover={{ scale: 1.05 }}
//                         whileTap={{ scale: 0.95 }}
//                         type="submit"
//                         className="w-full p-3 mt-4 bg-blue-500 text-white rounded-lg shadow-lg hover:bg-blue-600"
//                     >
//                         Submit
//                     </motion.button>
//                 </form>
//             </motion.div>
//         </div>
//     );
// };

// export default AnimatedLabelsForm;
//==============================================================

// import React, { useState } from 'react';
// import { motion } from 'framer-motion';
// import { Tooltip } from 'react-tooltip';

// const TooltipsForm = () => {
//     const [formData, setFormData] = useState({ name: '', email: '', password: '' });

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData({ ...formData, [name]: value });
//     };

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         alert('Form Submitted Successfully!');
//     };

//     const inputField = (id, label, type = 'text', tooltip) => (
//         <div className="mb-6 relative">
//             <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
//             <input
//                 id={id}
//                 name={id}
//                 type={type}
//                 value={formData[id]}
//                 onChange={handleChange}
//                 className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 data-tooltip-id={id + '-tooltip'}
//             />
//             <Tooltip id={id + '-tooltip'}>{tooltip}</Tooltip>
//         </div>
//     );

//     return (
//         <div className="flex items-center justify-center min-h-screen bg-gray-100">
//             <motion.div
//                 initial={{ opacity: 0, y: -50 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.5 }}
//                 className="p-8 bg-white shadow-lg rounded-2xl w-full max-w-md"
//             >
//                 <h2 className="text-2xl font-bold mb-6 text-blue-700 text-center">Tooltips Form</h2>
//                 <form onSubmit={handleSubmit} className="space-y-6">
//                     {inputField('name', 'Name', 'text', 'Enter your full name')}
//                     {inputField('email', 'Email', 'email', 'Enter a valid email address')}
//                     {inputField('password', 'Password', 'password', 'Password should be at least 6 characters')}

//                     <motion.button
//                         whileHover={{ scale: 1.05 }}
//                         whileTap={{ scale: 0.95 }}
//                         type="submit"
//                         className="w-full p-3 mt-4 bg-blue-500 text-white rounded-lg shadow-lg hover:bg-blue-600"
//                     >
//                         Submit
//                     </motion.button>
//                 </form>
//             </motion.div>
//         </div>
//     );
// };

// export default TooltipsForm;
//==================================================================
// import React, { useState } from 'react';
// import { motion } from 'framer-motion';

// const FloatingLabelsForm = () => {
//     const [formData, setFormData] = useState({ name: '', email: '', password: '' });

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData({ ...formData, [name]: value });
//     };

//     const inputField = (id, label, type = 'text') => (
//         <div className="relative mb-6">
//             <input
//                 id={id}
//                 name={id}
//                 type={type}
//                 value={formData[id]}
//                 onChange={handleChange}
//                 className="block w-full px-4 py-3 text-gray-800 bg-transparent border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 peer"
//                 placeholder=" "
//             />
//             <label
//                 htmlFor={id}
//                 className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-90 top-2 left-3 peer-placeholder-shown:top-1/2 peer-placeholder-shown:left-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:left-3 peer-focus:text-sm peer-focus:text-blue-600"
//             >
//                 {label}
//             </label>
//         </div>
//     );

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         alert('Form Submitted Successfully!');
//     };

//     return (
//         <div className="flex items-center justify-center min-h-screen bg-gray-100">
//             <motion.div
//                 initial={{ opacity: 0, y: -50 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.5 }}
//                 className="p-8 bg-white shadow-lg rounded-2xl w-full max-w-md"
//             >
//                 <h2 className="text-2xl font-bold mb-6 text-blue-700 text-center">Floating Labels Form</h2>
//                 <form onSubmit={handleSubmit} className="space-y-6">
//                     {inputField('name', 'Name')}
//                     {inputField('email', 'Email', 'email')}
//                     {inputField('password', 'Password', 'password')}

//                     <motion.button
//                         whileHover={{ scale: 1.05 }}
//                         whileTap={{ scale: 0.95 }}
//                         type="submit"
//                         className="w-full p-3 mt-4 bg-blue-500 text-white rounded-lg shadow-lg hover:bg-blue-600"
//                     >
//                         Submit
//                     </motion.button>
//                 </form>
//             </motion.div>
//         </div>
//     );
// };

// export default FloatingLabelsForm;
//================================================================
// import React, { useState } from 'react';
// import { motion } from 'framer-motion';
// // import { Progress } from '@/components/ui/progress';
// // // import { Progress } from '@shadcn/ui';
// // // import { Progress } from '@/components/ui/progress';

// const ProgressIndicatorForm = () => {
//     const [formData, setFormData] = useState({ name: '', email: '', password: '' });

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData({ ...formData, [name]: value });
//     };

//     const calculateProgress = () => {
//         const totalFields = 3;
//         const filledFields = Object.values(formData).filter(Boolean).length;
//         return (filledFields / totalFields) * 100;
//     };

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         alert('Form Submitted Successfully!');
//     };

//     return (
//         <div className="flex items-center justify-center min-h-screen bg-gray-100">
//             <motion.div
//                 initial={{ opacity: 0, y: -50 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.5 }}
//                 className="p-8 bg-white shadow-lg rounded-2xl w-full max-w-md"
//             >
//                 <h2 className="text-2xl font-bold mb-6 text-blue-700 text-center">Progress Indicator Form</h2>
//                 <form onSubmit={handleSubmit} className="space-y-6">
//                     <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
//                         <input
//                             name="name"
//                             type="text"
//                             value={formData.name}
//                             onChange={handleChange}
//                             className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                         />
//                     </div>

//                     <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
//                         <input
//                             name="email"
//                             type="email"
//                             value={formData.email}
//                             onChange={handleChange}
//                             className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                         />
//                     </div>

//                     <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
//                         <input
//                             name="password"
//                             type="password"
//                             value={formData.password}
//                             onChange={handleChange}
//                             className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                         />
//                     </div>

//                     {/* <Progress value={calculateProgress()} className="my-4" /> */}

//                     <motion.button
//                         whileHover={{ scale: 1.05 }}
//                         whileTap={{ scale: 0.95 }}
//                         type="submit"
//                         className="w-full p-3 mt-4 bg-blue-500 text-white rounded-lg shadow-lg hover:bg-blue-600"
//                     >
//                         Submit
//                     </motion.button>
//                 </form>
//             </motion.div>
//         </div>
//     );
// };

// export default ProgressIndicatorForm;
//====================================================================
// import React, { useState } from 'react';
// import { motion } from 'framer-motion';
// // import { Progress } from '@/components/ui/progress';
// // // // import { Progress } from '@shadcn/ui';
// // // // import { Progress } from '@/components/ui/progress';
// import { Tooltip } from 'react-tooltip';
// import { AiOutlineLoading3Quarters } from 'react-icons/ai';

// const EnhancedForm = () => {
//     const [formData, setFormData] = useState({ name: '', email: '', password: '' });
//     const [errors, setErrors] = useState({});
//     const [isSubmitting, setIsSubmitting] = useState(false);

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData({ ...formData, [name]: value });
//         if (value) setErrors((prev) => ({ ...prev, [name]: false }));
//     };

//     const calculateProgress = () => {
//         const totalFields = 3;
//         const filledFields = Object.values(formData).filter(Boolean).length;
//         return (filledFields / totalFields) * 100;
//     };

//     const getProgressColor = () => {
//         const progress = calculateProgress();
//         if (progress < 33) return 'bg-red-500';
//         if (progress < 66) return 'bg-yellow-500';
//         return 'bg-green-500';
//     };

//     const handleSubmit = (e) => {
//         e.preventDefault();

//         const newErrors = {};
//         Object.keys(formData).forEach((key) => {
//             if (!formData[key]) newErrors[key] = true;
//         });

//         setErrors(newErrors);

//         if (Object.keys(newErrors).length === 0) {
//             setIsSubmitting(true);
//             setTimeout(() => {
//                 alert('Form Submitted Successfully!');
//                 setIsSubmitting(false);
//             }, 1500);
//         }
//     };

//     const inputField = (id, label, type = 'text', tooltip) => (
//         <motion.div
//             className="relative mb-6"
//             animate={errors[id] ? { x: [0, -10, 10, -10, 0] } : { x: 0 }}
//             transition={{ duration: 0.3 }}
//         >
//             <input
//                 id={id}
//                 name={id}
//                 type={type}
//                 value={formData[id]}
//                 onChange={handleChange}
//                 className={`block w-full px-4 py-3 text-gray-800 bg-transparent border border-gray-300 rounded-lg focus:outline-none focus:ring-2 peer ${errors[id] ? 'border-red-500' : 'focus:ring-blue-500'} focus:scale-105 transition-transform`}
//                 placeholder=" "
//                 data-tooltip-id={id + '-tooltip'}
//             />
//             <Tooltip id={id + '-tooltip'}>{tooltip}</Tooltip>
//             <label
//                 htmlFor={id}
//                 className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-90 top-2 left-3 peer-placeholder-shown:top-1/2 peer-placeholder-shown:left-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:left-3 peer-focus:text-sm peer-focus:text-blue-600"
//             >
//                 {label}
//             </label>
//         </motion.div>
//     );

//     return (
//         <div className="flex items-center justify-center min-h-screen bg-gray-100">
//             <motion.div
//                 initial={{ opacity: 0, y: -50 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.5 }}
//                 className="p-8 bg-white shadow-lg rounded-2xl w-full max-w-md"
//             >
//                 <h2 className="text-2xl font-bold mb-6 text-blue-700 text-center">Enhanced Form</h2>
//                 <form onSubmit={handleSubmit} className="space-y-6">
//                     {inputField('name', 'Name', 'text', 'Enter your full name')}
//                     {inputField('email', 'Email', 'email', 'Enter a valid email address')}
//                     {inputField('password', 'Password', 'password', 'Password should be at least 6 characters')}

//                     {/* <Progress value={calculateProgress()} className={`my-4 ${getProgressColor()}`} /> */}

//                     <motion.button
//                         whileHover={{ scale: 1.05 }}
//                         whileTap={{ scale: 0.95 }}
//                         type="submit"
//                         disabled={isSubmitting}
//                         className="w-full p-3 mt-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg shadow-lg hover:bg-gradient-to-r hover:from-purple-500 hover:to-blue-500 flex items-center justify-center"
//                     >
//                         {isSubmitting ? <AiOutlineLoading3Quarters className="animate-spin mr-2" /> : 'Submit'}
//                     </motion.button>
//                 </form>
//             </motion.div>
//         </div>
//     );
// };

// export default EnhancedForm;
//========================================================================

