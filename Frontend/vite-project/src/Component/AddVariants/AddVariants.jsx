import React, { useState } from 'react'
import Input from '../Input/Input'

function AddVariants({ variantData }) {
  const [variant, setVariant] = useState({
    color: "",
    size: "",
    stock: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setVariant((prev) => ({ ...prev, [name]: value }));
  };

  const handleAdd = () => {
    if (!variant.color || !variant.size || !variant.stock) {
      alert("Please fill all fields");
      return;
    }

    variantData(variant);   // send variant to parent
    setVariant({ color: "", size: "", stock: "" }); // reset inputs
  };

  return (
    <div className="bg-gray-100 p-4 rounded-lg mt-4 shadow-inner border border-gray-200">
      <h2 className="text-lg font-semibold mb-3">Add Variant</h2>

      <Input
        label="Color"
        type="text"
        name="color"
        value={variant.color}
        onChange={handleChange}
        placeholder="Enter Variant Color"
      />

      <Input
        label="Size"
        type="text"
        name="size"
        value={variant.size}
        onChange={handleChange}
        placeholder="Enter Variant Size"
      />

      <Input
        label="Stock"
        type="text"
        name="stock"
        value={variant.stock}
        onChange={handleChange}
        placeholder="Enter Variant Stock"
      />

      <button
        type="button"
        onClick={handleAdd}
        className="w-full py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold rounded-lg mt-6 shadow-md hover:shadow-lg hover:scale-105 transition-all duration-200"
      >
        Add Variant
      </button>
    </div>
  );
}

export default AddVariants;
