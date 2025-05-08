// src/components/ui/card.jsx
import React from "react";

export function Card({ children, className }) {
    return (
        <div className={`rounded-xl border bg-white p-4 shadow ${className || ""}`}>
            {children}
        </div>
    );
}

export function CardContent({ children, className }) {
    return (
        <div className={`mt-2 text-sm text-gray-600 ${className || ""}`}>
            {children}
        </div>
    );
}
