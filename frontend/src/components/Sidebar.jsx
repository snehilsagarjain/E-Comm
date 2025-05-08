// src/components/Sidebar.jsx
import React, { useEffect, useRef, useState } from "react";
import { Home, ShoppingBag, Package, Users, BarChart3 } from "lucide-react";
import { Link } from "react-router-dom";

const Sidebar = () => {

    return (
        <aside className="w-81 h-screen shadow-lg p-6">
            {/* bg-gradient-to-b from-blue-600 to-blue-500 text-white */}
            {/* <h1 className="text-2xl font-bold mb-8 tracking-wide">Finx Admin</h1> */}
            {/* <div style={{ width: '200px' }}><img src={'/full-logo.png'} /> </div> */}
            <div style={{ fontSize: '1.8rem', fontWeight: 'bold', letterSpacing: '1px', border: 'white solid 2px', padding: '1rem 2rem', }}> 🛍️ SAGAR MART </div>
            <nav className="space-y-4" style={{ padding: '1rem 2rem' }}>
                <div>
                    <div style={{ padding: '10px 7px', marginBottom: '4px', backgroundColor: '#d8dbdd' }}>
                        <Link href="#" className="flex items-center gap-3 text-white hover:bg-blue-700 p-2 rounded-lg">
                            <Home size={18} /> Dashboard
                        </Link>
                    </div>
                    <div style={{ padding: '10px 7px', marginBottom: '4px', backgroundColor: '#d8dbdd' }}>
                        <Link href="#" className="flex items-center gap-3 text-white hover:bg-blue-700 p-2 rounded-lg">
                            <ShoppingBag size={18} /> Orders
                        </Link>
                    </div>
                    <div style={{ padding: '10px 7px', marginBottom: '4px', backgroundColor: '#d8dbdd' }}>
                        <Link href="#" className="flex items-center gap-3 text-white hover:bg-blue-700 p-2 rounded-lg">
                            <Package size={18} /> Products
                        </Link>
                    </div>
                    <div style={{ padding: '10px 7px', marginBottom: '4px', backgroundColor: '#d8dbdd' }}>
                        <Link href="#" className="flex items-center gap-3 text-white hover:bg-blue-700 p-2 rounded-lg">
                            <Users size={18} /> Customers
                        </Link>
                    </div>
                    <div style={{ padding: '10px 7px', marginBottom: '4px', backgroundColor: '#d8dbdd' }}>
                        <Link href="#" className="flex items-center gap-3 text-white hover:bg-blue-700 p-2 rounded-lg">
                            <BarChart3 size={18} /> Reports
                        </Link>
                    </div>
                </div>
            </nav>
        </aside>
    );
};

export default Sidebar;
