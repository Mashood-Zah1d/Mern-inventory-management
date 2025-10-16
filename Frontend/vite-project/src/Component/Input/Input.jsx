import React, { forwardRef } from "react";

function Input(
  { label = "", type = "text", className = "", ...props },
  ref
) {
  return (
    <div className="flex flex-col space-y-2">
      {label && (
        <label className="my-3 text-left text-gray-700 font-medium text-sm">{label}</label>
      )}

      <input
        type={type}
        ref={ref}
        className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition ${className}`}
        {...props}
      />
    </div>
  );
}

export default forwardRef(Input);
