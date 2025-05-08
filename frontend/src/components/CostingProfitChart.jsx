// // src/components/CostingProfitChart.jsx
// import React from "react";
// import {
//     BarChart,
//     Bar,
//     XAxis,
//     YAxis,
//     Tooltip,
//     CartesianGrid,
//     ResponsiveContainer,
//     Legend,
// } from "recharts";

// const data = [
//     { name: "Mon", cost: 8000, profit: 12000 },
//     { name: "Tue", cost: 10000, profit: 14000 },
//     { name: "Wed", cost: 9500, profit: 11000 },
//     { name: "Thu", cost: 13000, profit: 16000 },
//     { name: "Fri", cost: 14000, profit: 19000 },
//     { name: "Sat", cost: 17000, profit: 21000 },
//     { name: "Sun", cost: 11000, profit: 15000 },
// ];

// const CostingProfitChart = () => {
//     return (
//         <div className="bg-white p-6 rounded-2xl shadow-md mt-6" style={{ border: '2px solid red', padding: '5px' }}>
//             <div className="flex justify-between items-center mb-4">
//                 <h3 className="text-lg font-semibold text-gray-800">Costing & Profit</h3>
//                 {/* <button className="text-gray-500 hover:text-gray-800 text-xl">⋮</button> */}
//             </div>
//             <div className=" mb-4">
//                 {/* flex justify-between items-center */}
//                 <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px' }}>
//                     <div className="text-sm text-gray-500">Profit</div>
//                     <div style={{ display: 'flex' }}>
//                         <p className="text-red-500 font-semibold text-sm" style={{ marginRight: '15px' }}>94% ▲</p>
//                         <p className="text-sm text-gray-700">75k</p>
//                     </div>
//                 </div>
//                 <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px' }}>
//                     <div className="text-sm text-gray-500">Costing</div>
//                     <div style={{ display: 'flex' }}>
//                         <p className="text-red-500 font-semibold text-sm" style={{ marginRight: '15px' }}>96% ▼</p>
//                         <p className="text-sm text-gray-700">54k</p>
//                     </div>
//                 </div>
//                 {/* <div className="flex gap-8">
//                     <div>
//                         <p className="text-sm text-gray-500">Profit</p>
//                         <p className="text-green-600 font-semibold text-sm">94% ▲</p>
//                         <p className="text-sm text-gray-700">75k</p>
//                     </div>
//                     <div>
//                         <p className="text-sm text-gray-500">Costing</p>
//                         <p className="text-red-500 font-semibold text-sm">96% ▼</p>
//                         <p className="text-sm text-gray-700">54k</p>
//                     </div>
//                 </div> */}
//             </div>
//             <ResponsiveContainer width="100%" height={250}>
//                 <BarChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
//                     <CartesianGrid strokeDasharray="3 3" />
//                     <XAxis dataKey="name" stroke="#94a3b8" />
//                     <YAxis stroke="#94a3b8" />
//                     <Tooltip />
//                     <Legend />
//                     <Bar dataKey="cost" fill="#6366f1" name="Cost" />
//                     <Bar dataKey="profit" fill="#3b82f6" name="Profit" />
//                 </BarChart>
//             </ResponsiveContainer>
//         </div>
//     );
// };

// export default CostingProfitChart;
import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, Legend } from 'recharts';
import axios from 'axios';

const CostingProfitChart = () => {
    const [data, setData] = useState([]);

    // useEffect(() => {
    //     axios.get('/api/charts/weekly-cost-profit')
    //         .then(res => setData(res.data))
    //         .catch(err => console.error(err));
    // }, []);
    useEffect(() => {
        axios.get('http://localhost:6080/api/charts/weekly-cost-profit')
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
        <div className="bg-white p-6 rounded-2xl shadow-md mt-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Costing & Profit</h3>
            <ResponsiveContainer width="100%" height={250}>
                <BarChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" stroke="#94a3b8" />
                    <YAxis stroke="#94a3b8" />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="cost" fill="#6366f1" name="Cost" />
                    <Bar dataKey="profit" fill="#3b82f6" name="Profit" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default CostingProfitChart;
