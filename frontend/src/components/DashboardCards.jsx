// src/components/DashboardCards.jsx
import React from "react";
import { Card, CardContent } from "./ui/card";
import { DollarSign, ShoppingCart, Users, LineChart } from "lucide-react";

const stats = [
    { icon: <DollarSign size={20} />, label: "Revenue", value: "$45,231.89" },
    { icon: <ShoppingCart size={20} />, label: "Orders", value: "1,203" },
    { icon: <Users size={20} />, label: "Customers", value: "875" },
    { icon: <LineChart size={20} />, label: "Conversion", value: "3.1%" },
];

const DashboardCards = () => {
    return (
        // <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6" style={{ border: '2px solid red' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', width: '100%', height: '100%' }}>
            {stats.map((stat, idx) => (
                <Card
                    key={idx}
                    className=" w-1/2 p-4 bg-white rounded-2xl shadow-lg hover:shadow-xl transition duration-300 flex items-center gap-4"
                // style={{ border: '5px solid blue' }}
                >
                    <div className="p-3 bg-blue-100 text-blue-600 rounded-full">
                        {stat.icon}
                    </div>
                    <CardContent className="p-0">
                        <p className="text-sm text-gray-500">{stat.label}</p>
                        <p className="text-xl font-bold text-gray-800">{stat.value}</p>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
};

export default DashboardCards;