// // src/components/SalesChart.jsx
// import React from "react";
// import {
//     LineChart,
//     Line,
//     CartesianGrid,
//     XAxis,
//     YAxis,
//     Tooltip,
//     ResponsiveContainer,
// } from "recharts";

// const data = [
//     { name: "Jan", sales: 4000 },
//     { name: "Feb", sales: 3000 },
//     { name: "Mar", sales: 5000 },
//     { name: "Apr", sales: 4000 },
//     { name: "May", sales: 6000 },
// ];

// const SalesChart = () => {
//     return (
//         <div className="bg-white p-6 shadow-lg rounded-2xl mt-10">
//             <h3 className="text-lg font-semibold text-gray-700 mb-4">Sales Overview</h3>
//             <ResponsiveContainer width="100%" height={300}>
//                 <LineChart data={data} margin={{ top: 5, right: 30, left: 0, bottom: 0 }}>
//                     <Line type="monotone" dataKey="sales" stroke="#2563EB" strokeWidth={3} />
//                     <CartesianGrid stroke="#e2e8f0" strokeDasharray="3 3" />
//                     <XAxis dataKey="name" stroke="#94a3b8" />
//                     <YAxis stroke="#94a3b8" />
//                     <Tooltip />
//                 </LineChart>
//             </ResponsiveContainer>
//         </div>
//     );
// };

// export default SalesChart;

import React, { useEffect, useState } from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import axios from 'axios';

const SalesChart = () => {
    const [data, setData] = useState([]);

    // useEffect(() => {
    //     axios.get('/api/charts/monthly-sales')
    //         .then(res => setData(res.data))
    //         .catch(err => console.error(err));
    // }, []);
    useEffect(() => {
        axios.get('http://localhost:6080/api/charts/monthly-sales')
            .then(res => {
                console.log('API Data:', res.data); // <-- Check what you're getting
                if (Array.isArray(res.data)) {
                    setData(res.data);
                } else {
                    console.error('Invalid data format:', res.data);
                    setData([]);
                }
            })
            .catch(err => {
                console.error(err);
                setData([]);
            });
    }, []);

    return (
        <div className="bg-white p-6 shadow-lg rounded-2xl mt-10">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">Sales Overview</h3>
            <ResponsiveContainer width="100%" height={300}>
                <LineChart data={data} margin={{ top: 5, right: 30, left: 0, bottom: 0 }}>
                    <Line type="monotone" dataKey="sales" stroke="#2563EB" strokeWidth={3} />
                    <CartesianGrid stroke="#e2e8f0" strokeDasharray="3 3" />
                    <XAxis dataKey="name" stroke="#94a3b8" />
                    <YAxis stroke="#94a3b8" />
                    <Tooltip />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default SalesChart;