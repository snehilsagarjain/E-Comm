// src/components/Topbar.jsx
import React from "react";
import { Bell, User } from "lucide-react";

const Topbar = () => {
    return (
        <div className="sticky top-0 z-50 bg-white flex justify-between items-center px-6 py-4 shadow-md" style={{ padding: '1.5rem 2rem' }}>

            {/* <header className="bg-white shadow-md px-6 py-4 flex justify-between items-center rounded-xl" style={{ padding: '1.5rem 2rem', position: 'sticky', zIndex: '1000' }}> */}
            {/* <div style={{ display: 'flex', justifyContent: 'spaceBetween', alignItems: 'center', position: 'sticky', top: '0px', border: '1px solid green', padding: '10px 20px' }}> */}
            <h2 className="text-xl font-semibold text-gray-700">Dashboard Overview</h2>
            {/* <input type='text' placeholder='Search...' /> */}
            <div className="flex items-center gap-6" style={{ marginRight: '0px', paddingRight: '0px', border: '1px solid red' }}>
                <Bell className="text-gray-600 hover:text-blue-600 cursor-pointer" />
                <div className="flex items-center gap-2">
                    <User className="text-gray-600" />
                    <span className="text-sm font-medium text-gray-700">Admin</span>
                </div>
            </div>
        </div>
        // {/* </header> */}
    );
};

export default Topbar;