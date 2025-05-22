// components/ui/button.tsx
import React from "react";

export function Button({ children, className = "", ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={`px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
